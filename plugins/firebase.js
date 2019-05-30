import firebase from 'firebase'
import config from '@/config'
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = firebase.firestore()
const auth = firebase.auth
export {
    db, auth
}
