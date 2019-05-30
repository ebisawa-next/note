import firebase from 'firebase'
import config from '@/config'
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = firebase.firestore()
export {
    db
}
