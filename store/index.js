import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
export const state = () => ({
    notes: [],
})
export const mutations = {
    ...vuexfireMutations
}
export const actions = {
    setNotesRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('notes', ref)
    }),
}
export const getters = {
    getNotes: (state) => {
        return state.notes
    },
}
