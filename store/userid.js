import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
export const state = () => ({
    tweets: null,
    name: null,
    profile: null,
    url: null,
    id: null,
    mail: null,
    photo: null,
})
export const mutations = {
    ...vuexfireMutations,
    showUserdata(state, payload) {
        console.log('show', payload)
        state.name = payload.name
        state.profile = payload.profile
        state.url = payload.url
        state.id = payload.id
        state.mail = payload.mail
        state.photo = payload.photo
    }
}
const ref = db.collection('userid')
export const actions = {
    // tweetsをバインディングする
    setTweetsRef: firestoreAction(({ bindFirestoreRef }, id) => {
        console.log(id)
        bindFirestoreRef('tweets', ref.doc(id).collection('tweets').orderBy('id', 'desc'))
    }),
    accessedUserpage ({ dispatch }, payload) {
        dispatch('showUserdata', payload);
    },
    showUserdata ({ commit }, payload) {
        ref.doc(payload).get()
        .then(function (doc) {
            const userdata = doc.data().data
            userdata.id = payload
            commit('showUserdata', userdata)
        })
        .catch((err) => {
            console.error(err)
        })
    }
}
export const getters = {
    getTweets(state) {
        if(!state.tweets) return;
        return state.tweets
    },
    getUserdata(state) {
        if(!state.id) return;
        return {
            name: state.name,
            profile: state.profile,
            url: state.url,
            id: state.id,
            mail: state.mail,
            photo: state.photo
        }
    }
}
