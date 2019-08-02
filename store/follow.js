import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase'
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';
const ref = db.collection('follow')
const userid = db.collection('userid')
export const state = () => ({
    followings: [],
    followers: [],
    isFollowing: false,
    isFollower: false,
})
export const mutations = {
    ...vuexfireMutations,
    storeUserdatas(state, payload) {
        state.userdatas = payload
    },
    setFollowStatus(state, payload) {
        state.isFollowing = payload.following
        state.isFollower = payload.follower
    },
    setFollowings (state, payload) {
        state.followings.push(payload)
    },
    setFollowers (state, payload) {
        state.followers.push(payload)
    },
    initFollowings (state, payload) {
        state.followings = []
    },
    initFollowers (state) {
        state.followers = []
    }
}
export const actions = {
    async setFollowingRef ({ state, commit }, payload) {
        commit('initFollowings')
        // followingユーザーを抽出
        const re = await ref.doc(payload).collection('following').where('following', '==', true).get()

        // 抽出したユーザーIDで情報を取得しstateにpushしていく
        re.forEach(async (doc) => {
            const userid = await doc.data().userid
            const d = await db.collection('userid').doc(userid).get()
            await commit('setFollowings', d.data().data)
        })
    },
    async setFollowerRef ({ state, commit }, payload) {
        commit('initFollowers')
        // followerユーザーを抽出
        const re = await ref.doc(payload).collection('follower').where('follower', '==', true).get()

        // 抽出したユーザーIDで情報を取得しstateにpushしていく
        re.forEach(async (doc) => {
            const userid = await doc.data().userid
            const d = await db.collection('userid').doc(userid).get()
            await commit('setFollowers', d.data().data)
        })
    },

    async setFollowStatus ({ rootState, commit, dispatch }, payload) {
        if(!rootState.users.userId) return
        const followingStatus = await dispatch('getFollowingStatus', payload);
        const followerStatus = await dispatch('getFollowerStatus', payload)

        const data = {
            following: followingStatus,
            follower: followerStatus
        }

        await commit('setFollowStatus', data)
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

    async getFollowingUserdata ({ commit }, payload) {
        const followingUserdata = await db.collection('userid').doc(payload).get()
        await commit('getFollowingUserdata', followingUserdata.data().data)
    }
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
    },
}
