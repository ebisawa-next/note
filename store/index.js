import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase'
const ref = db.collection('userid')

export const state = () => ({
    userdatas: []
})
export const mutations = {
    ...vuexfireMutations,
    storeUserdatas(state, payload) {
        state.userdatas = payload
        console.log(state.userdatas)
    }
}
export const actions = {
    storeUserdatas ({ state, commit}) {
        const userdatas = []
        ref.get().then(function (querySnapshot) {
            querySnapshot.docs.forEach((doc) => {
                userdatas.push(doc.data().data)
            })
            commit('storeUserdatas', userdatas)
        })
    }
}
export const getters = {
    getUserdatas: (state) => {
        return state.userdatas
    },
}
