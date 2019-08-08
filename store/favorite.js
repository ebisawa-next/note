import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase'
import { O_DIRECT } from 'constants';
const userid = db.collection('userid')
export const state = () => ({
    favorites: [],
})
export const mutations = {
    ...vuexfireMutations,
    setFavorites (state, payload) {
        state.favorites.push(payload)
    }
}
export const actions = {
    // インスタントにfavoriteを得る方法
    storeFavorites: firestoreAction(async ({ bindFirestoreRef }, id) => {
        // const favorites = await userid.doc(id).collection('favorites').where('favorite', '==', true)
        // bindFirestoreRef('favorites', favorites)
    }),

    // ちゃんと整形するやつ
    async setFavorites ({ state, commit, dispatch }, id) {
        const favorites = await userid.doc(id).collection('favorites').get()
        if(state.favorites.length >= favorites.size) return
        await favorites.forEach(async (doc) => {
            const payload = doc.data()
            const tweet = await dispatch('getKimeuchiTweet', payload)
            await commit('setFavorites', tweet)
        })
    },
    async getKimeuchiTweet({}, payload) {
        let res
        const tweet = await userid.doc(payload.userId).collection('tweets').doc(payload.tweetId).get()
        res = tweet.data()
        res.userId = payload.userId
        res.tweetId = payload.tweetId

        const userData = await userid.doc(payload.userId).get()
        res.photo = userData.data().data.photo
        res.username = userData.data().data.name

        return res
    },

    async getFavorited ({}, tweet) {
        const querySnapshot = await userid.doc(tweet.userId).collection('tweets').doc(tweet.tweetId).collection('favorited').get()
        const count = await querySnapshot.size
        return count
    },

    async changeFavoriteStatus ({ rootState, dispatch }, tweet) {
        const user = rootState.users.userId

        // // ふぁぼしたユーザーのドキュメント処理
        const b = userid.doc(user).collection('favorites')
        const bQuerySnapshot = await b.where('tweetId', '==', tweet.tweetId).get()
        console.log(bQuerySnapshot.empty)
        if(bQuerySnapshot.empty) {
            await b.add({
                tweetId: tweet.id,
                userId: tweet.userId
            })
        } else {
            const docId = bQuerySnapshot.docs[0].id
            await b.doc(docId).delete()
        }

        // ふぁぼられユーザーのドキュメント処理
        const a = userid.doc(tweet.userId).collection('tweets').doc(tweet.tweetId).collection('favorited')

        const aQuerySnapshot = await a.where('userId', '==', user).get()
        const count = aQuerySnapshot.size
        if(aQuerySnapshot.empty) {
            await a.add({ userId: rootState.users.userId })
            return count + 1
        } else {
            const docId = aQuerySnapshot.docs[0].id
            await a.doc(docId).delete()
            return count - 1
        }
    },

    async getFavoritedBool ({ rootState }, tweet) {
        const isFav = await userid.doc(rootState.users.userId).collection('favorites').where('tweetId', '==', tweet.tweetId).get()
        if (isFav.empty) return false
        return isFav.docs[0].data().favorite
    },
}
export const getters = {
    getFavorites (state) {
        if(!state.favorites) return
        return state.favorites
    }
}
