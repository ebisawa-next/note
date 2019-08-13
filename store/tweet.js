import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
import { initializeApp } from 'firebase';
const ref = db.collection('userid')
export const state = () => ({
    isTweetModalShow: false,
    isTweetSuccess: false,
    tweets: [],
    deleteTweet: null,
    isDeleteTweetModalShow: false
})
export const mutations = {
    ...vuexfireMutations,
    openTweetModal (state) {
        state.isTweetModalShow = true;
    },
    closeTweetModal (state) {
        state.isTweetModalShow = false;
    },
    successTweet (state) {
        state.isTweetSuccess = true;
    },
    showTweet(state, payload) {
        state.tweets = payload
    },
    init(state) {
        state.isTweetSuccess = false
    },

    showDeleteTweetModal(state, payload) {
        state.deleteTweet = payload
        state.isDeleteTweetModalShow = true
        console.log(state)

    },
    closeDeleteTweetModal(state) {
        state.deleteTweet = null
        state.isDeleteTweetModalShow = false
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

    showDeleteTweetModal({ commit }, tweet) {
        commit('showDeleteTweetModal', tweet)
    },

    async deleteTweet({ state, dispatch }) {
        const tweet = state.deleteTweet
        await ref.doc(tweet.userId).collection('tweets').doc(tweet.tweetId).delete()
        dispatch('closeDeleteTweetModal')
    },
    closeDeleteTweetModal({ commit }) {
        commit('closeDeleteTweetModal')
    }
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
    },

    getIsDeleteTweetModalShow(state) {
        return state.isDeleteTweetModalShow
    },
}
