import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
export const state = () => ({
    isTweetModalShow: false
})
export const mutations = {
    ...vuexfireMutations,
    openTweetModal (state) {
        state.isTweetModalShow = true;
        console.log(state.isTweetModalShow);
    },
    closeTweetModal (state) {
        state.isTweetModalShow = false;
    }
}
export const actions = {
    openTweetModal ({ commit }) {
        commit('openTweetModal');
    },
    closeTweetModal ({ commit }) {
        commit('closeTweetModal');
    }
}
export const getters = {
    getIsTweetModalShow(state) {
        return state.isTweetModalShow;
    }
}
