<template>
    <section class="container">
        <h1>くそマイページ</h1>
        {{ isSignedIn }}
        <div v-if="isSignedIn">
            <p v-if="isSignedIn" class="login" @click="googleSignOut">ログアウトする</p>
            <div class="forms">
                <input type="text" v-model="newNickname" class="form" placeholder="ほげほげほげ" />
                <p class="sendButton" @click="saveNickname(newNickname)">ニックネームを更新する</p>
            </div>

            <table class="information">
                <tr>
                    <th>ニックネーム</th>
                    <td>{{ userdata.nickname }}</td>
                </tr>
                <tr>
                    <th>なまえ</th>
                    <td>{{ userdata.name }}</td>
                </tr>
                <tr>
                    <th>user name</th>
                    <td>{{ userdata.email}}</td>
                </tr>
                <tr>
                    <th>photo</th>
                    <td><img :src="userdata.photo"></td>
                </tr>
            </table>
        </div>
        <p v-else class="login" @click="googleSignIn">ログインする</p>

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
            isSignedIn: 'users/getSignStatus',
            userdata: 'users/getUserdata'
        }),
    },
    mounted () {
        this.$store.dispatch('users/googleAuthStateChanged');
    },
    created () {
    },
    methods: {
        googleSignIn () {
            this.$store.dispatch('users/googleSignIn');
        },
        googleSignOut () {
            this.$store.dispatch('users/googleSignOut');
        },
        saveNickname (newNickname) {
            if(newNickname.length == 0) {
                return;
            }
            const payload = {
                nickname: newNickname
            }
            this.$store.dispatch('users/saveNickname', payload);
            this.newNickname = '';
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    width: 1000px;
    margin: 0 auto;
    padding: 100px 0;
}

.forms {
    display: flex;
    margin: 10px 0 30px;

    .form {
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #d8d8d8;
    }

    .sendButton {
        background-color: #ed6103;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-left: 10px;
    }
}

.login {
    padding: 10px;
    background-color: #ffab00;
    border-radius: 4px;
    display: inline-flex;
}

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

