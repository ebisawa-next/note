import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
import firebase from 'firebase';

const users = db.collection('users')

export const state = () => ({
    userEmail: null,
    userName: null,
    userPhoto: null,
    userNickname: null,
    userProfile: null,
    isSignedIn: false,
    noAccount: false,
    userTweet: [],
    init: false,
    userTweetId: 0,
    userId: null,
    create: false
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
        state.userProfile = null
        state.userId = null
    },
    saveUserdata (state, payload) {
        console.log('mutation saveUserdata' + payload);
        state.userNickname = payload.nickname;
        state.userProfile = payload.profile;
        state.userId = payload.uid;
        state.create = true;
    },
    saveTweet (state, payload) {
        state.userTweet.unshift(payload);
        state.userTweetId++
        console.log('save usertweet')
    },
    rebornTweet (state, payload) {
        for (let i = 0, iz = payload.length; i < iz; i++) {
            state.userTweet.unshift(payload[i]);
        }
        state.userTweetId = payload.length;
        state.init = true;
        console.log('reborn:' + state.userTweet)
    },
    toCreateUserPage () {
        if (!state.create) return;
        location.href = '/mypage'
        state.create = true;
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
                const userData = doc.data().data
                commit('saveUserdata', doc.data().data)

                const tweetData = {
                    userTweetId: state.userTweetId,
                    userId: doc.data.userId
                }
            } else {
                console.log("No such document!")
                commit('toCreateUserPage')
                // location.href = '/create'
                // dispatch('createUser')
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
    createUser ({ state, commit }, payload) {
        const data = payload
        db.collection('users').doc(state.userEmail).set({ data }).then(() => {
            commit('saveUserdata', data)
            location.href = '/mypage'
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    },
    /**
     * ユーザーデータを登録する
     * @param {Object} param0 
     * @param {Object} payload nickname, profile
     */
    saveUserdata ({ state, commit }, payload) {
        const data = payload
        db.collection('users').doc(state.userEmail).set({ data }).then(() => {
            console.log('db saved')
            commit('saveUserdata', data);
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
    },

    accessedUserpage ({ state, commit }, payload) {
        // childだけでとれないか修正する
        db.collection('users').get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log(doc.data().data.uid)

            })
            // console.log(querySnapshot)
        })
        .catch((err) => {
            console.error(err)
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
            profile: state.userProfile,
            photo: state.userPhoto,
            nickname: state.userNickname,
            tweet: state.userTweet,
            tweetId: state.userTweetId,
            uid: state.userId
        }
        return data;
    },
}
