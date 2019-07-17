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
    create: false,
})
export const mutations = {
    ...vuexfireMutations,
    storeUser (state, payload) {
        state.userPhoto = payload.userPhoto
        state.userEmail = payload.userEmail
    },
    showUserdata (state, payload) {
        state.userName = payload.name
        state.userId = payload.id
        state.userEmail = payload.mail
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
        state.userNickname = payload.name;
        state.userProfile = payload.profile;
        state.userId = payload.id;
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
                console.log(user)
                commit('storeUser', { userEmail: email, userName: displayName, userPhoto: photoURL })
                dispatch('userCheck', email)
            } else {
                commit('deleteUser')
            }
        })
    },
    /**
     * ユーザーが存在するかチェックする
     * @param {*} param0 
     */
    userCheck ({ dispatch, commit, state }, email) {
        db.collection('users').doc(email).get().then((doc) => {
            if (doc.exists) {
                console.log(doc)
                const id = doc.data().id
                dispatch('showUserdata', id)
                // commit('saveUserdata', doc.data().data)
            } else {
                console.log("No such document!")
                commit('toCreateUserPage')
                // location.href = '/create'
                // dispatch('createUser')
            }
        }).catch((error) => {
            console.error("Error getting document:", error)
        })
    },

    showUserdata({ commit }, payload) {
        db.collection('userid').doc(payload).get()
        .then(function (doc) {
            const userdata = doc.data()
            userdata.id = payload
            console.log(userdata)
            commit('showUserdata', userdata)
        })
        .catch((err) => {
            console.error(err)
        })
    },

    /**
     * クリエイトページで送られた情報を操作するハンドラ
     * @param {*} param0 
     * @param {*} payload 
     */
    createUser ({ dispatch, state, commit }, payload) {
        console.log('create')
        console.log(payload)
        const data = payload
        const id = payload.id
        console.log(state)
        db.collection('users').doc(state.userEmail).set({ id }).then(() => {
            dispatch('saveUserdata', data)
            console.log('ほげほげ')
            // location.href = '/mypage'
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    },
    /**
     * 新規ユーザーデータを登録する
     * @param {Object} param0 
     * @param {Object} payload
     */
    saveUserdata ({ dispatch, state, commit }, payload) {
        const data = payload
        const name = {
            name: payload.name
        }
        const profile = {
            profile: payload.profile
        }
        // ユーザーID情報を保存
        db.collection('userid').doc(payload.id).set({ data }).then(() => {
            console.log('userid saved');
            dispatch('showUserdata', payload.id);
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
