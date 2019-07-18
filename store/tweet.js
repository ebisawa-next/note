import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
const ref = db.collection('userid')
export const state = () => ({
    isTweetModalShow: false,
    isTweetSuccess: false,
    tweets: [],
    tweetId: 0,
})
export const mutations = {
    ...vuexfireMutations,
    openTweetModal (state) {
        state.isTweetModalShow = true;
        console.log(state.isTweetModalShow);
    },
    closeTweetModal (state) {
        state.isTweetModalShow = false;
        console.log(state.isTweetModalShow);
    },
    successTweet (state) {
        state.isTweetSuccess = true;
        console.log('successTweet')
    },
    initTweetId(state, id) {
        state.tweetId = id
        console.log(state.tweetId)
    },
    saveTweet(state, payload) {
        state.tweetId++
    },
    showTweet(state, payload) {
        state.tweets = payload
    }
}
export const actions = {
    openTweetModal ({ commit }) {
        commit('openTweetModal');
    },
    closeTweetModal ({ commit }) {
        commit('closeTweetModal');
    },
    successTweet ({ commit }) {
        commit('successTweet');
    },

    saveTweet ({ rootState, commit }, payload) {
        payload.id = rootState.users.userTweetId
        db.collection('userid').doc(rootState.users.userId).collection('tweets').add(payload).then(() => {
            console.log('save tweet')
            commit('saveTweet', payload);
        }).catch((error) => {
            console.error("Error writing document: ", error);
        })
    },
}
export const getters = {
    getIsTweetModalShow(state) {
        return state.isTweetModalShow;
    },
    getIsTweetSuccess(state) {
        return state.isTweetSuccess;
    },
    getTweets(state) {
        return state.tweets
    }
}
