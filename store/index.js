import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const store = () => {
    return new Vuex.Store({
        state: () => ({
            notes: [],
            isLoggedIn: false,
            user: null,
        }),
        mutations: {
            ...vuexfireMutations,
        },
        actions: {
            setNotesRef: firestoreAction(({ bindFirestoreRef }, ref) => {
                bindFirestoreRef('notes', ref)
            }),
            saveNote({ commit, state }, note) {
                let notes = state.notes
                notes.push({ content: note })
                commit('setNotes', notes)
            },
            successedLogin (store, user) {
                store.state.isLoggedIn = true;
                store.state.user = user;
            },
            failedLogin (store) {
                store.state.isLoggedIn = false;
                store.state.user = null;
            },
            // setUser (store, user) {
            //     store.state.user = user;
            // }
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
            }
        },
    })
}

export default store