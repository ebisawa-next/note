import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
import firebase from 'firebase';

const userid = db.collection('userid')
const follow = db.collection('follow')

export const state = () => ({
    timeline: []
})
export const mutations = {
    ...vuexfireMutations,
    storeMypage(state, payload) {

    },
    showTimeline (state, payload) {
        state.timeline.push(payload)
    }
}
export const actions = {
    async accessedMypage({ rootState, state, commit, dispatch}) {
        const mypageUserId = rootState.users.userId
        let timelineIds = await dispatch('getFollowingUserId', mypageUserId)
        timelineIds.push(mypageUserId)

        await dispatch('showTimeline', timelineIds)
    },
    async getFollowingUserId ({ state, commit, dispatch }, mypageUserId) {
        const followings = []
        const followingsRef = await follow.doc(mypageUserId).collection('following').where('following', '==', true).get()
        await followingsRef.forEach((doc) => {
            followings.push(doc.data().userid)
        })
        return followings
    },

    async showTimeline ({ state, commit, dispatch}, ids) {
        if(state.timeline.length > 0) return;
        for(const id of ids) {
            let photo,
                username
            const tweetRef = await userid.doc(id).collection('tweets').get()
            
            const userRef = await userid.doc(id).get()
            photo = await userRef.data().data.photo
            username = await userRef.data().data.name
            await tweetRef.forEach((doc) => {
                const data = doc.data()
                const tweetId = doc.id
                data.userId = id
                data.tweetId = tweetId
                data.photo = photo
                data.username = username
                commit('showTimeline', data)
            })
        }
    }
}
export const getters = {
    getTimeline (state) {
        return state.timeline
    }
}
