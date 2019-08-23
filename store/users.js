import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../plugins/firebase';
import firebase from 'firebase';

const users = db.collection('users')
const firestorage = firebase.storage()

export const state = () => ({
    userEmail: null,
    userName: null,
    userPhoto: null,
    userUrl: null,
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
        console.log('payload', payload)
        state.userName = payload.name
        state.userId = payload.id
        state.userEmail = payload.mail
        state.userUrl = payload.url
        state.userPhoto = payload.photo
        state.userProfile = payload.profile
        state.isSignedIn = true
    },
    initUserTweetId (state, id) {
        state.userTweetId = id;
        console.log('users init user tweetid', id)
    },
    deleteUser (state) {
        state.userEmail = null
        state.userName = null
        state.userPhoto = null
        state.isSignedIn = false
        state.noAccount = true
        state.userTweet = null
        state.init = false
        state.userTweetId = 0
        state.userProfile = null
        state.userId = null
    },
    saveUserdata (state, payload) {
        state.userName = payload.name;
        state.userProfile = payload.profile;
        state.userId = payload.id;
        state.create = true;
    },
    toCreateUserPage () {
        if (!state.create) return;
        location.href = '/mypage'
        state.create = true;
    }
}
export const actions = {
    initStore: firestoreAction(({ bindFirestoreRef }, payload) => {
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
                console.log('googleAuthStateChanged')
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
                console.log('userCheck', state.userEmail)
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

        db.collection('userid').doc(payload).collection('tweets').get()
        .then(function (query) {
            commit('initUserTweetId', query.size)
        })
    },

    /**
     * クリエイトページで送られた情報を操作するハンドラ
     * @param {*} param0 
     * @param {*} payload 
     */
    createUser ({ dispatch, state, commit }, payload) {
        console.log('create')
        const data = {
            name: payload.name,
            profile: payload.profile,
            mail: state.userEmail,
            id: payload.id,
            photo: state.userPhoto
        }
        const id = payload.id
        console.log('doc', state.userEmail)
        db.collection('users').doc(state.userEmail).set({ id }).then(() => {
            dispatch('saveUserdata', data)
            location.href = `/users/${id}/`
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
        // ユーザーID情報を保存
        db.collection('userid').doc(data.id).set({ data }).then(() => {
            console.log('userid saved')
            dispatch('showUserdata', data.id)
        }).catch((error) => {
            console.error("Error writing document: ", error)
        })

    },

    uploadImage: (context, payload) => {
        
        return new Promise((resolve, reject) => {



            // firestorage にファイルをアップロード
            const uploadTask = firestorage.ref(`${payload.userdata.id}/icons/${payload.name}`).put(payload.file).then(snapshot => {
                // アップロード完了処理。URLを取得し、呼び出し元へ返す。
                snapshot.ref.getDownloadURL().then(url => {
                    resolve(url)
                })
            })
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
            tweet: state.userTweet,
            tweetId: state.userTweetId,
            id: state.userId,
            url: state.userUrl
        }
        return data;
    },
}
