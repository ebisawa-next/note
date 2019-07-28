import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase'
const ref = db.collection('follow')
export const state = () => ({
    followings: [],
    followers: [],
    isFollowing: false,
    isFollower: false
})
export const mutations = {
    ...vuexfireMutations,
    storeUserdatas(state, payload) {
        state.userdatas = payload
        console.log(state.userdatas)
    },
    setFollowStatus(state, payload) {
        state.isFollowing = payload.following
        state.isFollower = payload.follower
        console.log(state.isFollowing, state.isFollower)
    },
}
export const actions = {
    setFollowRef: firestoreAction(({ bindFirestoreRef }, id) => {
        bindFirestoreRef('followings', ref.doc(id).collection('following').where('following', '==', true))
        bindFirestoreRef('followers', ref.doc(id).collection('follower'))
    }),
    async setFollowStatus ({ rootState, commit, dispatch }, payload) {
        if(!rootState.users.userId) return
        const followingStatus = await dispatch('getFollowingStatus', payload);
        const followerStatus = await dispatch('getFollowerStatus', payload)

        const data = {
            following: followingStatus,
            follower: followerStatus
        }

        commit('setFollowStatus', data)
    },
    async changeFollowState ({ rootState, state, commit, dispatch }, payload) {
        const followingStatus = await dispatch('getFollowingStatus', payload);
        const followingData = {
            following: !followingStatus,
            userid: payload
        }
        const d = await ref.doc(rootState.users.userId).collection('following').where('userid', '==', payload).get()
        if(d.empty) {
            ref.doc(rootState.users.userId).collection('following').add(followingData)
        } else {
            d.forEach((doc) => {
                doc.ref.set(followingData)
            })
        }

        const followerStatus = await dispatch('getFollowerStatus', payload);
        const followerData = {
            follower: !followerStatus,
            userid: payload
        }
        const e = await ref.doc(payload).collection('follower').where('userid', '==', rootState.users.userId).get()
        if(e.empty) {
            ref.doc(payload).collection('follower').add(followerData)
        } else {
            e.forEach((doc) => {
                doc.ref.set(followerData)
            })
        }

        const data = {
            following: !followingStatus,
            follower: !followerStatus
        }
        commit('setFollowStatus', data)
    },
    async getFollowingStatus ({ rootState, commit }, payload) {
        const followingDoc = ref.doc(rootState.users.userId).collection('following').where('userid', '==', payload)
        const followingData = await followingDoc.get();
        const followingStatus = !followingData.empty ? followingData.docs[0].data().following : false
        return followingStatus
    },
    async getFollowerStatus ({ rootState, commit }, payload) {
        const followerDoc = await ref.doc(payload).collection('follower').where('userid', '==', payload)
        const followerData = await followerDoc.get();
        const followerStatus = !followerData.empty ? followerData.docs[0].data().follower : false
        return followerStatus
    },
}
export const getters = {
    getFollowings (state) {
        if(!state.followings) return
        return state.followings
    },
    getFollowers (state) {
        if(!state.followers) return
        return state.followers
    },
    getFollowStatus(state) {
        return {
            isFollowing: state.isFollowing,
            isFollower: state.isFollower
        }
    }
}
