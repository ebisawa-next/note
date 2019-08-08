<template>
    <div>
        <UserHeader />
        <section v-if="userdata" class="container">
            <UserInfo />
            <article class="timelines">
                <ul>
                    <li v-for="(following, index) in followings" :key="index">
                        <nuxt-link :to="'/users/'+following.id" class="timelines-link">
                            <Userlist :userdata="following" />
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
            followings: 'follow/getFollowings',
        }),
        hasTweets () {
            return true
        },
    },
    mounted () {
        const userId = this.$route.params.userId
        this.$store.dispatch('userid/accessedUserpage', userId)
    },
    created () {
        this.$store.dispatch('userid/setTweetsRef', this.$route.params.userId)
    },
    methods: {
        addFavorite () {
            this.$store.dispatch('tweet/addFavorite');
        },
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
.user-header {
    display: block;
    height: 150px;
    background:
        color-gradient(.8),
        url(~assets/images/index/sushi.jpg);
    background-size: cover;
    background-attachment: fixed;
    @include mq {
        height: 300px;
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
