<template>
    <section class="container">
        <h1>くそマイページ</h1>
        <table class="information">
            <tr>
                <th>user name</th>
                <td>{{ user.displayName }}</td>
            </tr>
            <tr>
                <th>photo</th>
                <td><img :src="user.photoURL"></td>
            </tr>
        </table>
        <nuxt-link to="/">戻るよ</nuxt-link>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters({
            isLoggedIn: 'getLoggedIn',
            user: 'getUser'
        })
    },
    mounted () {
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

