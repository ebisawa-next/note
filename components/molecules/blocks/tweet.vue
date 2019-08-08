<template>
    <div class="tweet">
        <nuxt-link :to="`/users/${userId}/${tweet.tweetId}`" class="tweet-link">
            <div class="tweet-head">
                <p class="tweet-head-name">
                    <span>{{ username }}</span>
                    <span class="tweet-head-id">@{{ userId }}</span>
                </p>
                <time class="tweet-head-time">{{ tweetDate }}</time>
            </div>
            <p class="tweet-text">{{ tweet.tweet }}</p>
        </nuxt-link>
        <ul class="tweet-actions">
            <li class="tweet-actions-action">
                <p class="tweet-actions-action-favorite" @click="addFavorite(tweet)">
                    はーと{{ favorite }}
                </p>
            </li>
            <li class="tweet-actions-action">
                こめんと
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
            favorite: 0
        }
    },
    computed: {
        ...mapGetters({
        }),
        tweetDate () {
            const timestamp = this.tweet.created_at
            return this.$moment(timestamp.seconds*1000).format('YYYY/MM/DD HH:mm:ss')
        },
        userId () {
            const userId = this.tweet.userId
            return userId ? userId : this.$route.params.userId
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
        }
    },
    async mounted () {

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
            console.log(tweet)
            const newCount = await this.$store.dispatch('favorite/changeFavoriteStatus', tweet)
            this.favorite = newCount
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
        @include hover-transition {
            color: map-get($color-service, accent);
        }
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
        &-action {
            &:not(:first-child) {
                margin-left: 10px;
            }
        }
    }
}
</style>
