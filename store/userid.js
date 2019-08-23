import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
export const state = () => ({
    tweets: null,
    name: null,
    profile: null,
    url: null,
    id: null,
    mail: null,
    photo: null,
    header: null,
    usertweetData: null,
    following: false,
    follower: false,
})
export const mutations = {
    ...vuexfireMutations,
    showUserdata(state, payload) {
        state.name = payload.name
        state.profile = payload.profile
        state.url = payload.url
        state.id = payload.id
        state.mail = payload.mail
        state.photo = payload.photo
        state.header = payload.header
    },

    showUsertweetData(state, payload) {
        state.usertweetData = payload
    },
}
const ref = db.collection('userid')
const follow = db.collection('follow')
export const actions = {
    // tweetsをバインディングする
    setTweetsRef: firestoreAction(({ bindFirestoreRef }, id) => {
        bindFirestoreRef('tweets', ref.doc(id).collection('tweets').orderBy('created_at', 'desc'))
    }),
    accessedUserpage ({ dispatch }, payload) {
        dispatch('showUserdata', payload);
    },
    showUserdata ({ commit }, payload) {
        ref.doc(payload).get()
        .then(function (doc) {
            const userdata = doc.data().data
            userdata.id = payload
            commit('showUserdata', userdata)
        })
        .catch((err) => {
            console.error(err)
        })
    },
    async accessedUsertweet ({ state, commit, dispatch }, payload) {
        const docRef = await ref.doc(payload.userId).collection('tweets').doc(payload.tweetId);
        const doc = await docRef.get()
        if(!doc.exists) return
        await commit('showUsertweetData', doc.data())
    },

    async getUserdata ({ state, commit, dispatch }, id) {
        const doc = await ref.doc(id).get()
        if(!doc.exists) return
        const data = await doc.data().data
        return data
    }
}
export const getters = {
    getTweets(state) {
        if(!state.tweets) return;
        return state.tweets
    },
    getUserdata(state) {
        if(!state.id) return;
        return {
            name: state.name,
            profile: state.profile,
            url: state.url,
            id: state.id,
            mail: state.mail,
            photo: state.photo,
            header: state.header
        }
    },
    getUsertweetData(state) {
        return state.usertweetData
    },
    getFollowStatus (state) {
        return {
            following: state.following,
            follower: state.follower
        }
    },
}
