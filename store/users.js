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
    // setUsers(state, users) {
    //     state.users = users
    // },
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

        // user情報をセットする
        users.doc(pickUserdata.uid).get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                // store.commit('setUsers', data);
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
    getUsers: (state) => {
        return state.users
    }
}
