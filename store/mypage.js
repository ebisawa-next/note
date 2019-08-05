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
    showUserTweet (state, payload) {
        state.timeline.push(payload)
    }
}
export const actions = {
    async accessedMypage({ rootState, state, commit, dispatch}) {
        const mypageUserId = rootState.users.userId
        let timelineIds = await dispatch('getFollowingUserId', mypageUserId)
        timelineIds.push(mypageUserId)

        await dispatch('showUserTweet', timelineIds)
    },
    async getFollowingUserId ({ state, commit, dispatch }, mypageUserId) {
        const followings = []
        const followingsRef = await follow.doc(mypageUserId).collection('following').where('following', '==', true).get()
        await followingsRef.forEach((doc) => {
            followings.push(doc.data().userid)
        })
        return followings
    },
    async showUserTweet ({ state, commit, dispatch}, ids) {
        console.log(ids)
        if(state.timeline.length > 0) return;
        for(const id of ids) {
            const tweetRef = await userid.doc(id).collection('tweets').get()
            await tweetRef.forEach((doc) => {
                commit('showUserTweet', doc.data())
            })
        }
    }
}
export const getters = {
    getTimeline (state) {
        return state.timeline
    }
}
