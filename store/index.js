import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';

const store = () => {
    return new Vuex.Store({
        state: () => ({
            notes: [],
            isLoggedIn: false,
            user: null,
            userData: null,
        }),
        mutations: {
            ...vuexfireMutations,
        },
        actions: {
            setNotesRef: firestoreAction(({ bindFirestoreRef }, ref) => {
                bindFirestoreRef('notes', ref)
            }),
            setUserdataRef: firestoreAction(({ bindFirestoreRef }, ref) => {
                bindFirestoreRef('users', ref)
            }),
            successedLogin (store, user) {
                store.state.isLoggedIn = true;
                store.state.user = user;
                db.collection('users').doc(store.state.user.uid).get().then((doc) => {
                    if (doc.exists) {
                        console.log('ドキュメントあったお', doc.data());
                        store.state.userData = doc.data();
                    } else {
                        console.log('なかったお');
                        store.state.userData = null;
                    }
                }).catch((err) => {
                    console.log(err);
                })
            },
            failedLogin (store) {
                store.state.isLoggedIn = false;
                store.state.user = null;
            },
            userCheck ({ dispatch, commit, state}) {
                db.collection('users').doc(state.userEmail).get().then((doc) => {
                    // ユーザー情報があったら
                    if (doc.exists) {
                        console.log("Document data:", doc.data())
                        // counter の値を mutations に commit する
                        commit('saveUser', {
                        number: doc.data().counter
                        })

                        // ユーザー情報がなかったら
                    } else {
                        console.log("No such document!")
                        // ユーザー情報を Firestore に登録する処理
                        dispatch('createUser')
                    }
                // エラーになったら
                }).catch((error) => {
                    console.error("Error getting document:", error)
                })
            },

            createUser ({ state }) {
                db.collection('users').doc(state.userEmail).set({
                    ickname: '',
                }).then(() => {
                    console.log('初回ログインどうもね');
                }).catch((error) => {
                    console.log('エラーだぞ', error);
                })
            }
        },
        getters: {
            getNotes: (state) => {
                return state.notes
            },
            getLoggedIn: (state) => {
                return state.isLoggedIn
            },
            getUser: (state) => {
                return state.user;
            },
            getUserData: (state) => {
                return state.userData;
            }
        },
    })
}

export default store