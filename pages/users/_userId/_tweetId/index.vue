<template>
    <div class="personalTweet">
        <div class="personalTweet-header">
            <figure class="personalTweet-header-icon">
                <img v-if="userdata.photo" :src="userdata.photo">
                <figcaption v-else>no Image</figcaption>
            </figure>
            <p class="personalTweet-header-user">
                <span class="personalTweet-header-user-name">{{ userdata.name }}</span>
                <span class="personalTweet-header-user-id">@{{ userdata.id }}</span>
            </p>
        </div>
        <p class="personalTweet-tweet">{{ usertweetData.tweet }}</p>
        <time class="personalTweet-time">{{ tweetDate }}</time>
        <ul class="personalTweet-actions">
            <li class="personalTweet-actions-action">
                <p class="personalTweet-actions-action-favorite" @click="addFavorite(usertweetData.tweet)">
                    <i class="far fa-heart personalTweet-actions-action-favorite-heart"></i>
                    <span class="personalTweet-actions-action-favorite-count">{{ usertweetData.favorite }}</span>
                </p>
            </li>
            <li class="personalTweet-actions-action">
                <i class="far fa-comment personalTweet-actions-action-comment"></i>
            </li>
            <li class="personalTweet-actions-action" @click="showDeleteTweetModal(usertweetData.tweet)" v-if="myTweet">
                <i class="far fa-trash-alt personalTweet-actions-action-delete"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
import firebase from 'firebase'

export default {
    validate ({ params }) {
        return /^[a-zA-Z0-9]+$/.test(params.userId)
    },
    components: {
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
            usertweetData: 'userid/getUsertweetData'
        }),
        hasTweets () {
            return true
        },
        tweetDate () {
            const timestamp = this.usertweetData.created_at
            return this.$moment(timestamp.seconds*1000).format('YYYY/MM/DD HH:mm:ss')
        },
        myTweet () {
            const userId = this.userdata.id
            const tweetUserId = this.$route.params.userId
            return userId == tweetUserId ? true : false
        }
    },
    mounted () {
        console.log(this.$route.params.tweetId)
        const payload = {
            userId: this.$route.params.userId,
            tweetId: this.$route.params.tweetId
        }
        this.$store.dispatch('userid/accessedUsertweet', payload)
        // this.$store.dispatch('userid/accessedUserpage', this.$route.params.userId)
    },
    created () {
        // this.$store.dispatch('userid/setTweetsRef', this.$route.params.userId)
    },
    methods: {
        addFavorite () {
            this.$store.dispatch('tweet/addFavorite');
        }
    },
}
</script>

<style lang="scss" scoped>
.personalTweet {
    @include mq {
        width: 750px;
        margin: 50px auto;
    }
    @include mq(tbAndSp) {
        margin-top: 20px;
        padding: 0 10px 30px;
    }
    &-header {
        display: flex;
        align-items: center;
        &-icon {
            width: 80px;
            height: 80px;
            margin-right: 30px;
            @include mq(tbAndSp) {
                width: 50px;
                height: 50px;
                margin-right: 20px;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        &-user {
            &-name {
                font-size: 1.8rem;
                font-weight: bold;
            }
            &-id {
                display: block;
            }
        }
    }
    &-tweet {
        margin-top: 10px;
        font-size: 2.4rem;
        font-weight: bold;
        line-height: 1.4;
    }
    &-time {
        display: block;
        margin-top: 20px;
        font-size: 1.4rem;
        color: #515151;
    }
    &-actions {
        margin-top: 20px;
        padding-top: 10px;
        display: flex;
        align-items: center;
        border-top: 1px solid map-get($color-service, border);
        &-action {
            &:not(:first-child) {
                margin-left: 15px;
            }
            &-favorite {
                display: flex;
                align-items: center;
                @include hover-transition() {
                    color: map-get($color-service, accent);
                }
                &-heart {
                    font-size: 1.6rem;
                }
                &-count {
                    margin-left: 5px;
                    font-size: 1.6rem;
                }
            }
            &-comment,
            &-delete {
                font-size: 1.6rem;
                color: #a5a5a5;
                @include hover-transition() {
                    color: map-get($color-service, accent);
                }
            }
        }
    }
}
</style>
