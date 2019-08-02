<template>
    <div>
        <UserHeader />
        <section v-if="userdata" class="container">
            <UserInfo />
            <article class="timelines">
                <ul class="timelines-items" v-if="hasTweets">
                    <li v-for="(tweet, index) in tweets" :key="index" class="timelines-items-item">
                        <nuxt-link :to="userdata.id+'/'+tweet.tweetid" class="timelines-items-item-link">
                            <Tweet :username="userdata.name" :tweet="tweet" />
                        </nuxt-link>
                    </li>
                </ul>
                <p v-else>まだツイートが投稿されていません</p>
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
        }
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'userid/getUserdata',
            tweets: 'userid/getTweets',
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
        this.$store.dispatch('userid/setTweetsRef', userId)
        this.$store.dispatch('follow/storeFollow', userId)
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
        &-link {
            text-decoration: none;
            color: inherit;
            @include hover-transition {
                color: map-get($color-service, accent);
            }
        }
    }
    &-tweet {
        &-text {
            font-size: 1.8rem;
            padding: 10px 0;
        }
        &-head {
            display: flex;
            justify-content: space-between;
            &-name {
                font-size: 1.4rem;
                font-weight: bold;
            }
            &-time {
                font-size: 1.2rem;
                color: #a5a5a5;
            }
        }
    }
    &-actions {
        display: flex;
        &-action {
            &:not(:first-child) {
                margin-left: 10px;
            }
        }
    }
}


.heading {
    font-size: 2.4rem;
}

</style>
