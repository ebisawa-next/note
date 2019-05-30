import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const store = () => {
    return new Vuex.Store({
        state: () => ({
            notes: [],
        }),
        mutations: {
            ...vuexfireMutations
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
        },
        getters: {
            getNotes: (state) => {
                return state.notes
            },
        },
    })
}

export default store