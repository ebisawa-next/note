<template>
    <div>
        <UserHeader />
        <section v-if="userdata" class="container">
            <UserInfo />
            <article class="timelines">
                <ul>
                    <li v-for="(follower, index) in followers" :key="index">
                        <nuxt-link :to="'/users/'+follower.id" class="timelines-link">
                            <Userlist :userdata="follower" />
                        </nuxt-link>
                    </li>
                </ul>
            </article>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
import firebase from 'firebase'
import UserHeader from '@/components/molecules/blocks/userHeader'
import Userlist from '@/components/molecules/blocks/userlist'
import UserInfo from '@/components/organisms/users/userInfo'
export default {
    validate ({ params }) {
        return /^[a-zA-Z0-9]+$/.test(params.userId)
    },
    components: {
        UserInfo, Userlist, UserHeader
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'userid/getUserdata',
            followers: 'follow/getFollowers',
        }),
    },
    mounted () {
        const userId = this.$route.params.userId
        this.$store.dispatch('userid/accessedUserpage', userId)
    },
    created () {
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    @include mq {
        width: 80%;
        margin: 0 auto;
        flex-direction: row;
    }
}
.timelines {
    position: relative;
    flex: 1;
    &-link {
        text-decoration: none;
        color: inherit;
        @include hover-transition {
            color: map-get($color-service, accent);
        }
    }
}
</style>
