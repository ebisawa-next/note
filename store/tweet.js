import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
export const state = () => ({
    isTweetModalShow: false,
    isTweetSuccess: false
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
        setTimeout(function () {
            state.isTweetSuccess = false;
        }, 2500);
        console.log('successTweet')
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
    }
}
export const getters = {
    getIsTweetModalShow(state) {
        return state.isTweetModalShow;
    },
    getIsTweetSuccess(state) {
        return state.isTweetSuccess;
    }
}
