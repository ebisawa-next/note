import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
import { initializeApp } from 'firebase';
const ref = db.collection('userid')
export const state = () => ({
    isTweetModalShow: false,
    isTweetSuccess: false,
    tweets: [],
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
    showTweet(state, payload) {
        state.tweets = payload
    },
    init(state) {
        state.isTweetSuccess = false
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
    saveTweet ({ rootState, state, commit }, payload) {
        db.collection('userid').doc(rootState.users.userId).collection('tweets').add(payload).then(() => {
            console.log('save tweet')
            commit('successTweet')
        }).catch((error) => {
            console.error("Error writing document: ", error);
        })
    },
    init ({commit}) {
        commit('init')
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
