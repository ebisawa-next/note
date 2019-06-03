import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';

const users = db.collection('users')

export const state = () => ({
    isLoggedIn: false,
    user: [],
    users: [],
})
export const mutations = {
    ...vuexfireMutations,
    setLogin(state, user) {
        state.isLoggedIn = true
        state.user = user;
    },
    setLogout(state) {
        state.isLoggedIn = false
        state.user = null
    }
}
export const actions = {
    initStore: firestoreAction(({ bindFirestoreRef }, payload) => {
        // 渡されたuseridと等しいドキュメントのデータとバインディングしたい
        console.log(payload.userId);
        bindFirestoreRef('users', users.where('uid', '==', payload.userId))
    }),
    successedLogin (store, user) {
        const pickUserdata = {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName
        }
        store.commit('setLogin', pickUserdata);
    },
    failedLogin (store) {
        store.state.isLoggedIn = false;
        store.state.user = null;
    },
}
export const getters = {
    getLoggedIn: (state) => {
        return state.isLoggedIn
    },
    getUser: (state) => {
        return state.user;
    },
    getUsers: (state) => {
        return state.users;
    }
}
