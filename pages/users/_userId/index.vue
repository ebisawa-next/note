<template>
    <div>
        <UserHeader />
        <section v-if="userdata" class="container">
            <UserInfo />
            <article class="timelines">
                <ul class="timelines-tabs">
                    <li>
                        <nuxt-link :to="`/users/${userId}/`" class="timelines-tabs-tab selected">ツイート</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="`/users/${userId}/favorites/`" class="timelines-tabs-tab">いいね</nuxt-link>
                    </li>
                </ul>
                <ul class="timelines-items" v-if="this.tweets.length > 0">
                    <li v-for="(tweet, index) in tweets" :key="index" class="timelines-items-item">
                        <Tweet :username="userdata.name" :tweet="tweet" icon />
                    </li>
                </ul>
                <div v-else class="timelines-notweet">
                    <p class="timelines-notweet-text">まだツイートが投稿されていません</p>
                </div>
            </article>
        </section>
        <section v-else>
            <p>このユーザーは存在しません</p>
        </section>
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
            userId: ''
        }
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'userid/getUserdata',
            tweets: 'userid/getTweets',
        })
    },
    mounted () {
    },
    created () {
        this.userId = this.$route.params.userId
        this.$store.dispatch('userid/accessedUserpage', this.userId)
        this.$store.dispatch('userid/setTweetsRef', this.userId)
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
    &-tabs {
        display: flex;
        li {
            width: 100%;
        }
        &-tab {
            text-decoration: none;
            color: inherit;
            border-bottom: 2px solid map-get($color-service, border);
            padding: 10px 0;
            text-align: center;
            color: #515151;
            font-weight: bold;
            font-size: 1.4rem;
            display: block;
            @include hover-transition {
                color: map-get($color-service, accent);
                border-color: map-get($color-service, accent);
            }
            &.selected {
                color: map-get($color-service, accent);
                border-color: map-get($color-service, accent);
            }
        }
    }
    &-notweet {
        padding: 15px;
        &-text {
            font-size: 1.6rem;
        }
    }
}
</style>
