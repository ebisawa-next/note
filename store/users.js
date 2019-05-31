import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';

export const state = () => ({
    isLoggedIn: false,
    user: null,
    userData: null,
})
export const mutations = {
    ...vuexfireMutations,
    setLogin(state, user) {
        state.isLoggedIn = true
        state.user = user;
    },
    setUserData(state, userData) {
        state.userData = userData
    },
    setLogout(state) {
        state.isLoggedIn = false
        state.user = null
    }
}
export const actions = {
    setUserdataRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('users', ref)
    }),
    successedLogin (store, user) {
        const pickUserdata = {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName
        }
        store.commit('setLogin', pickUserdata);
        db.collection('users').doc(pickUserdata.uid).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data().data;
                store.commit('setUserData', data);
            } else {
                console.log('なかったお');
            }
        }).catch((err) => {
            console.log(err);
        })
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
    getUserData: (state) => {
        return state.userData;
    }
}
