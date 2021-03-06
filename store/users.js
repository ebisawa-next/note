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
    deleteUser (state) {
        state.userEmail = null
        state.userName = null
        state.userPhoto = null
        state.isSignedIn = false
        state.noAccount = true
        state.userTweet = null
        state.init = false
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
    },
    ramen (state, payload) {
        console.log(payload)
    }
}
export const actions = {
    initStore: firestoreAction(({ bindFirestoreRef }, payload) => {
        bindFirestoreRef('users', users.where('userEmail', '==', payload.userEmail));
    }),
    async googleSignIn ({ dispatch }) {
        await firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        await dispatch('googleAuthStateChanged')
    },
    async googleSignOut ({ dispatch }) {
        await firebase.auth().signOut()
        await dispatch('googleAuthStateChanged')
    },
    async googleAuthStateChanged ({ dispatch, commit }) {
        await firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                let { email, displayName, photoURL } = user
                console.log('googleAuthStateChanged')
                commit('storeUser', { userEmail: email, userName: displayName, userPhoto: photoURL })
                dispatch('userCheck', email)
            } else {
                await commit('deleteUser')
                await dispatch('nofitication/success', {text: 'ログアウトしました'}, {root: true})
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
                // dispatch('nofitication/success', {text: 'ユーザー情報を登録してください'}, {root: true})
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
            dispatch('nofitication/error', {text: 'ユーザー情報の作成に失敗しました'}, {root: true})
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
            dispatch('nofitication/success', {
                text: 'ユーザー情報を更新しました'
            }, { root: true })
        }).catch((error) => {
            console.error("Error writing document: ", error)
            dispatch('nofitication/success', {
                text: 'ユーザー情報の更新に失敗しました'
            }, { root: true })
        })

    },

    uploadImage: ({ dispatch }, payload) => {
        return new Promise((resolve, reject) => {
            // firestorage にファイルをアップロード
            const uploadTask = firestorage.ref(`${payload.userdata.id}/icons/${payload.name}`).put(payload.file).then(snapshot => {
                // アップロード完了処理。URLを取得し、呼び出し元へ返す。
                snapshot.ref.getDownloadURL().then(url => {
                    resolve(url)
                    dispatch('nofitication/success', {text: '画像のアップロードに成功しました'}, { root: true })
                }).catch((err) => {
                    dispatch('nofitication/error',  {text: '画像のアップロードに失敗しました'}, { root: true })
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
            id: state.userId,
            url: state.userUrl
        }
        return data;
    },
}
