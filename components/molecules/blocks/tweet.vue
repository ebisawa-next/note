<template>
    <div class="tweet">
        <nuxt-link :to="`/users/${userId}/${tweet.tweetId}`" class="tweet-link">
            <figure v-if="icon" class="tweet-icon">
                <img v-if="userdata.photo" :src="userdata.photo">
            </figure>
            <div class="tweet-wrapper">
                <div class="tweet-head">
                    <p class="tweet-head-name">
                        <span>{{ username }}</span>
                        <span class="tweet-head-id">@{{ userId }}</span>
                    </p>
                    <time class="tweet-head-time">{{ tweetDate }}</time>
                </div>
                <p class="tweet-text">{{ tweet.tweet }}</p>
            </div>
        </nuxt-link>
        <ul class="tweet-actions">
            <li class="tweet-actions-action">
                <p class="tweet-actions-action-favorite" @click="addFavorite(tweet)">
                    <i class="far fa-heart tweet-actions-action-favorite-heart"></i>
                    <span class="tweet-actions-action-favorite-count">{{ favorite }}</span>
                </p>
            </li>
            <li class="tweet-actions-action">
                <i class="far fa-comment tweet-actions-action-comment"></i>
            </li>
            <li class="tweet-actions-action" @click="showDeleteTweetModal(tweet)" v-if="myTweet">
                <i class="far fa-trash-alt tweet-actions-action-delete"></i>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
import firebase from 'firebase'
export default {
    components: {
    },
    data () {
        return {
            favorite: 0,
            userdata: {}
        }
    },
    computed: {
        ...mapGetters({
            us: 'users/getUserdata'
        }),
        tweetDate () {
            const timestamp = this.tweet.created_at
            return this.$moment(timestamp.seconds*1000).format('YYYY/MM/DD HH:mm:ss')
        },
        userId () {
            const userId = this.tweet.userId
            return userId ? userId : this.$route.params.userId
        },
        myTweet () {
            const userId = this.us.id
            const tweetUserId = this.$route.params.userId
            return userId == tweetUserId ? true : false
        }
    },
    props: {
        username: {
            type: String,
            default: ''
        },
        tweet: {
            type: Object,
            default: null
        },
        icon: {
            type: Boolean,
            default: false
        }
    },
    async mounted () {
        this.userdata = await this.$store.dispatch('userid/getUserdata', this.userId)
    },
    async created () {
        const tw = this.tweet
        tw.userId = this.userId

        if(!tw.tweetId) {
            tw.tweetId = tw.id
        }
        const favorited = await this.$store.dispatch('favorite/getFavorited', tw)
        this.favorite = favorited

    },
    methods: {
        async addFavorite(tweet) {
            tweet.userId = this.userId
            const newCount = await this.$store.dispatch('favorite/changeFavoriteStatus', tweet)
            this.favorite = newCount
        },
        showDeleteTweetModal(tweet) {
            this.$store.dispatch('tweet/showDeleteTweetModal', tweet)
        }
    },
}
</script>

<style lang="scss" scoped>
.tweet {
    width: 100%;
    &-link {
        text-decoration: none;
        color: inherit;
        display: flex;
        @include hover-transition {
            color: map-get($color-service, accent);
        }
    }
    &-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
        background-color: #f5f5f5;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &-wrapper {
        flex: 1;
    }
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
        &-id {
            font-weight: normal;
            font-size: 1.2rem;
            color: #515151;
        }
    }
    &-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
