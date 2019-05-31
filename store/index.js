import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';


        export const state = () => ({
            notes: [],
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
        }
        export const actions = {
            setNotesRef: firestoreAction(({ bindFirestoreRef }, ref) => {
                bindFirestoreRef('notes', ref)
            }),
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
        }
        export const getters = {
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
        }
// export default store