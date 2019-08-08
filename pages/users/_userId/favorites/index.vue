<template>
    <div>
        <UserHeader />
        <section v-if="userdata" class="container">
            <UserInfo />
        </section>
        <article class="timelines">
            <ul class="timelines-items">
                <li v-for="(favorite, index) in favorites" :key="index" class="timelines-items-item">
                    <Tweet :username="favorite.username" :tweet="favorite" />
                </li>
            </ul>
        </article>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
import firebase from 'firebase'
import UserHeader from '@/components/molecules/blocks/userHeader'
import UserInfo from '@/components/organisms/users/userInfo'
import Tweet from '@/components/molecules/blocks/tweet'
export default {
    validate ({ params }) {
        return /^[a-zA-Z0-9]+$/.test(params.userId)
    },
    components: {
        UserInfo, UserHeader, Tweet
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'userid/getUserdata',
            favorites: 'favorite/getFavorites',
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
        const userId = this.$route.params.userId
        this.$store.dispatch('favorite/setFavorites', userId)
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
    &-items-item {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        &:not(:first-child) {
            border-top: 1px solid map-get($color-service, border);
        }
    }
}
</style>
