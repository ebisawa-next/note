import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const store = () => {
    return new Vuex.Store({
        state: () => ({
            notes: [],
            isLoggedIn: false,
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
            successedLogin (store) {
                store.state.isLoggedIn = true;
            },
            failedLogin (store) {
                store.state.isLoggedIn = false;
            },
        },
        getters: {
            getNotes: (state) => {
                return state.notes
            },
            getLoggedIn: (state) => {
                return state.isLoggedIn
            }
        },
    })
}

export default store