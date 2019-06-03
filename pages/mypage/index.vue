<template>
    <section class="container">
        <h1>くそマイページ</h1>

        <div v-if="isLoggedIn">
            <p v-if="isLoggedIn" class="login" @click="googleLogout">ログアウトする</p>
            <div class="forms">
                <input type="text" v-model="newNickname" class="form" placeholder="ほげほげほげ" />
                <p class="sendButton" @click="saveNickname(newNickname)">ニックネームを更新する</p>
            </div>

            <table class="information">
                <tr>
                    <th>ニックネーム</th>
                    <td>
                        <p v-for="(user, index) in users" :key="index">{{ user.nickname }}</p>
                        <!-- <p>{{ users.nickname }}</p> -->
                    </td>
                </tr>
                <tr>
                    <th>user name</th>
                    <td>{{ user.displayName }}</td>
                </tr>
                <tr>
                    <th>photo</th>
                    <td><img :src="user.photoURL"></td>
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
import firebase from 'firebase'
export default {
    data () {
        return {
            newNickname: '',
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'users/getLoggedIn',
            user: 'users/getUser',
            users: 'users/getUsers',
        }),
    },
    mounted () {
        auth().onAuthStateChanged( (user) => {
            if (user) {
                this.$store.dispatch('users/successedLogin', user);
                this.$store.dispatch('users/initStore', {
                    userId: this.user.uid
                })
            } else {
                this.$store.dispatch('users/failedLogin', user);
            }
        })
    },
    created () {
    },
    methods: {
        saveNickname (newNickname) {
            if(newNickname.length == 0) {
                return;
            }
            db.collection('users').doc(this.user.uid).set({
                uid: this.user.uid,
                nickname: newNickname
            }).then(() => {
                this.newNickname = '';
                console.log('saved');
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

