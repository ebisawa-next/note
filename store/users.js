import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
import firebase from 'firebase';

const users = db.collection('users')

export const state = () => ({
    userEmail: null,
    userName: null,
    userPhoto: null,
    userNickname: null,
    isSignedIn: false,
    noAccount: false,
    userTweet: [],
    init: false,
    userTweetId: 0,
})
export const mutations = {
    ...vuexfireMutations,
    storeUser (state, payload) {
        state.userEmail = payload.userEmail
        state.userName = payload.userName
        state.userPhoto = payload.userPhoto
        state.isSignedIn = true
    },
    deleteUser (state) {
        state.userEmail = null
        state.userName = null
        state.userPhoto = null
        state.userNickname = null
        state.isSignedIn = false
        state.noAccount = true
        state.userTweet = null
        state.init = false
        state.userTweetId = 0
    },
    saveNickname (state, payload) {
        state.userNickname = payload.nickname;
    },
    saveTweet (state, payload) {
        state.userTweet.unshift(payload);
        state.userTweetId++
    },
    rebornTweet (state, payload) {
        for (let i = 0, iz = payload.length; i < iz; i++) {
            state.userTweet.unshift(payload[i]);
        }
        state.userTweetId = payload.length;
        state.init = true;
        console.log('reborn:' + state.userTweet)
    }
}
export const actions = {
    initStore: firestoreAction(({ bindFirestoreRef }, payload) => {
        // 渡されたuseridと等しいドキュメントのデータとバインディングしたい
        console.log(payload.userEmail);
        bindFirestoreRef('users', users.where('userEmail', '==', payload.userEmail));
    }),
    googleSignIn ({ dispatch }) {
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        dispatch('googleAuthStateChanged')
    },
    googleSignOut ({ dispatch }) {
        firebase.auth().signOut()
        dispatch('googleAuthStateChanged')
    },
    googleAuthStateChanged ({ dispatch, commit }) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let { email, displayName, photoURL } = user
                commit('storeUser', { userEmail: email, userName: displayName, userPhoto: photoURL })
                dispatch('userCheck')
            } else {
                commit('deleteUser')
            }
        })
    },
    userCheck ({ dispatch, commit, state }) {
        db.collection('users').doc(state.userEmail).get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data())
                commit('saveNickname', doc.data().data)
            } else {
                console.log("No such document!")
                dispatch('createUser')
            }
        }).catch((error) => {
            console.error("Error getting document:", error)
        })
        console.log(state.init)
        if(!state.init) {
            const tweetDB = db.collection('users').doc(state.userEmail).collection('tweet');
            tweetDB.orderBy('id').get().then((query) => {
                const records = query.docs.map(elem => elem.data());
                commit('rebornTweet', records)
                console.log(records)
            }).catch((error) => {
                console.error("Error getting document:", error)
            });
        }
    },
    createUser ({ state, commit }) {
        const data = {
            nickname: 'まだないよ'
        }
        db.collection('users').doc(state.userEmail).set({ data }).then(() => {
            console.log("Document successfully written!");
            commit('saveNickname', data)
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    },
    saveNickname ({ state, commit }, payload) {
        const data = {
            nickname: payload.nickname
        }
        db.collection('users').doc(state.userEmail).set({ data }).then(() => {
            console.log('db saved')
            commit('saveNickname', data);
        }).catch((error) => {
            console.error("Error writing document: ", error);
        })
    },
    saveTweet ({ state, commit }, payload) {
        payload.id = state.userTweetId
        db.collection('users').doc(state.userEmail).collection('tweet').add(payload).then(() => {
            console.log('save tweet')
            commit('saveTweet', payload);
        }).catch((error) => {
            console.error("Error writing document: ", error);
        })
    }
}
export const getters = {
    getSignStatus (state) {
        return state.isSignedIn
    },
    getUserdata(state) {
        const data = {
            email: state.userEmail,
            name: state.userName,
            photo: state.userPhoto,
            nickname: state.userNickname,
            tweet: state.userTweet,
            tweetId: state.userTweetId
        }
        return data;
    }
}
