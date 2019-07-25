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
    usertweetData: null,
    following: false,
    follower: false,
})
export const mutations = {
    ...vuexfireMutations,
    showUserdata(state, payload) {
        state.name = payload.name
        state.profile = payload.profile
        state.url = payload.url
        state.id = payload.id
        state.mail = payload.mail
        state.photo = payload.photo
    },

    showUsertweetData(state, payload) {
        state.usertweetData = payload
    },
}
const ref = db.collection('userid')
const follow = db.collection('follow')
export const actions = {
    // tweetsをバインディングする
    setTweetsRef: firestoreAction(({ bindFirestoreRef }, id) => {
        bindFirestoreRef('tweets', ref.doc(id).collection('tweets').orderBy('tweetid', 'desc'))
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
    },
    accessedUsertweet ({ state, commit, dispatch }, payload) {
        ref.doc(payload.userId).collection('tweets').where("id", "==", payload.tweetId).get()
        .then(function (querySnapshot) {
            const data = querySnapshot.docs[0].data()
            commit('showUsertweetData', data)
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    },
}
export const getters = {
    getTweets(state) {
        console.log(state.tweets)
        if(!state.tweets) return;
        return state.tweets
    },
    getUserdata(state) {
        if(!state.id) return;
        console.log(state.id)
        return {
            name: state.name,
            profile: state.profile,
            url: state.url,
            id: state.id,
            mail: state.mail,
            photo: state.photo
        }
    },
    getUsertweetData(state) {
        return state.usertweetData
    },
    getFollowStatus (state) {
        return {
            following: state.following,
            follower: state.follower
        }
    }
}
