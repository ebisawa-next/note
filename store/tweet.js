import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
const ref = db.collection('userid')
export const state = () => ({
    isTweetModalShow: false,
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
    showTweet(state, payload) {
        state.tweets = payload
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
    saveTweet ({ rootState, dispatch }, payload) {
        db.collection('userid').doc(rootState.users.userId).collection('tweets').add(payload).then(() => {
            console.log('save tweet')
            dispatch('nofitication/success', {text: 'ツイートに成功しました'}, {root: true})
        }).catch((error) => {
            console.error("Error writing document: ", error);
            dispatch('nofitication/error', {text: 'ツイートに失敗しました'}, {root: true})
        })
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
    getTweets(state) {
        return state.tweets
    },
    getIsDeleteTweetModalShow(state) {
        return state.isDeleteTweetModalShow
    },
}
