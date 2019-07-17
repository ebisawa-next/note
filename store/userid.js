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
    showTweet(state, payload) {
        state.tweets = payload
    },
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
export const actions = {
    accessedUserpage ({ dispatch }, payload) {
        dispatch('showTweet', payload);
        dispatch('showUserdata', payload);
    },

    showTweet ({ commit }, payload) {
        db.collection('userid').doc(payload).collection('tweets').orderBy('id').get()
        .then(function(query) {
            const records = query.docs.map(elem => elem.data())
            commit('showTweet', records)
        })
        .catch((err) => {
            console.error(err)
        })
    },
    showUserdata ({ commit }, payload) {
        db.collection('userid').doc(payload).get()
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
