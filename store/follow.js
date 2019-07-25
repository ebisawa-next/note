import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase'
const ref = db.collection('follow')
export const state = () => ({
    following: [],
    follower: [],
    followingStatus: false,
    followerStatus: false
})
export const mutations = {
    ...vuexfireMutations,
    storeUserdatas(state, payload) {
        state.userdatas = payload
        console.log(state.userdatas)
    },
    setFollowStatus(state, payload) {
        state.followingStatus = payload.following
        state.followerStatus = payload.follower
        console.log(state.following, state.follower)
    },
    changeFollowingState(state, payload) {
        state.followingStatus = payload
    },
    changeFollowerState(state, payload) {
        state.followerStatus = payload
    },
}
export const actions = {
    setFollowRef: firestoreAction(({ bindFirestoreRef }, id) => {
        bindFirestoreRef('following', ref.doc(id).collection('following'))
        bindFirestoreRef('follower', ref.doc(id).collection('follower'))
    }),
    // setFollowerRef: firestoreAction(({ bindFirestoreRef }, id) => {
    //     bindFirestoreRef('', ref.doc(id).collection('tweets').orderBy('tweetid', 'desc'))
    // }),
    async setFollowStatus ({ rootState, commit }, payload) {
        if(!rootState.users.userId) return 
        const followingDoc = await ref.doc(rootState.users.userId).collection('following').doc(payload)
        const followingData = await followingDoc.get();
        const followingStatus = followingData.data() ? followingData.data().following : false

        const followerDoc = await ref.doc(payload).collection('follower').doc(rootState.users.userId)
        const followerData = await followerDoc.get();
        const followerStatus = followerData.data() ? followerData.data().follower : false

        const data = {
            following: followingStatus,
            follower: followerStatus
        }
        console.log(data)

        commit('setFollowStatus', data)
    },

    async changeFollowState ({ rootState, state, commit, dispatch }, payload) {
        await dispatch('changeFollowingState', payload)
        await dispatch('changeFollowerState', payload)
    },
    async changeFollowingState ({ rootState, state, commit, dispatch }, payload) {
        // 押した人
        const followingDoc = await ref.doc(rootState.users.userId).collection('following').doc(payload)
        const followingData = await followingDoc.get();
        const status = followingData.data() ? followingData.data().following : false
        await followingDoc.set({ following: !status })

        commit('changeFollowingState', !status)
    },
    async changeFollowerState ({ rootState, state, commit, dispatch }, payload) {
        // 押した人
        const followerDoc = await ref.doc(payload).collection('follower').doc(rootState.users.userId)
        const followerData = await followerDoc.get();
        const status = followerData.data() ? followerData.data().follower : false
        await followerDoc.set({ follower: !status })

        commit('changeFollowerState', !status)
    },
}
export const getters = {
    getFollowings (state) {
        if(!state.following) return
        return state.following
    },
    getFollowers (state) {
        if(!state.followers) return
        return state.follower
    },
    getFollowStatus(state) {
        return {
            followingStatus: state.followingStatus,
            followerStatus: state.followerStatus
        }
    }
}
