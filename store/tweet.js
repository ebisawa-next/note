import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
export const state = () => ({
    isTweetModalShow: false,
    isTweetSuccess: false,
    tweets: null,
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
    saveTweet(state, payload) {
        console.log('save usertweet')
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

    saveTweet ({ rootState, state, commit }, payload) {
        payload.id = rootState.users.userTweetId

        db.collection('userid').doc(rootState.users.userId).collection('tweets').add(payload).then(() => {
            console.log('save tweet')
            commit('saveTweet', payload);
        }).catch((error) => {
            console.error("Error writing document: ", error);
        })
    },

    showTweet ({ state, commit }, payload) {
        console.log(payload)
        db.collection('userid').doc(payload).collection('tweets').orderBy('id').get()
        .then(function(query) {
            const records = query.docs.map(elem => elem.data())
            commit('showTweet', records)
        })
        .catch((err) => {
            console.error(err)
        })
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
    }
}
