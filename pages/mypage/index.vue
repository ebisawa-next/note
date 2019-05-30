<template>
    <section class="container">
        <h1>くそマイページ</h1>

        <div v-if="isLoggedIn">
            <p v-if="isLoggedIn" class="login" @click="googleLogout">ログアウトする</p>
            <div class="forms">
                <input type="text" v-model="newData" class="form" placeholder="ほげほげほげ" />
                <p class="sendButton" @click="saveData(newData)">dataを送る</p>
            </div>

            <table class="information">
                <tr>
                    <th>user name</th>
                    <td>{{ user.displayName }}</td>
                </tr>
                <tr>
                    <th>photo</th>
                    <td><img :src="user.photoURL"></td>
                </tr>
                <tr v-if="userData">
                    <th>data</th>
                    <td><p>{{userData}}</p></td>
                </tr>
            </table>
        </div>
        <p v-else class="login" @click="googleLogin">ログインする</p>

        <nuxt-link to="/">戻るよ</nuxt-link>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
export default {
    data () {
        return {
            newData: '',
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoggedIn',
            user: 'getUser',
            userData: 'getUserData',
            notes: 'getNotes'
        })
    },
    mounted () {
        this.$store.dispatch('setUserdataRef', db.collection('users'))
        console.log(this.userData)
        console.log(this.notes)
        this.$store.dispatch('setNotesRef', db.collection('notes'))
        auth().onAuthStateChanged( (user) => {
            if (user) {
                this.$store.dispatch('successedLogin', user);
            } else {
                this.$store.dispatch('failedLogin', user);
            }
        })
    },
    methods: {
        saveData (newData) {
            if(newData.length == 0) {
                return;
            }
            db.collection('users').doc(this.user.uid).set({
                data: newData
            }).then(() => {
                this.newData = '';
                console.log('success');
            }).catch((err) => {
                console.log('error', err)
            })
        },

        googleLogin () {
            auth().signInWithRedirect(new auth.GoogleAuthProvider())
        },
        googleLogout () {
            auth().signOut().then( () => {
                this.isLoggedIn = false
                this.user = null
            }).catch( (error) => {
                console.log(error)
            })
        },
    },
}
</script>

<style>
.information {
    margin-top: 20px;
}
.information tr:not(:first-child) {
    border-top: 1px solid #d8d8d8;
}
.information th,
.information td {
    padding: 15px 10px;
}
.information th {
    background-color: #f5f5f5;
}
</style>

