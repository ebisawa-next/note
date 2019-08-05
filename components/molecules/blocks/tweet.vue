<template>
    <div class="tweet">
        <div class="tweet-head">
            <p class="tweet-head-name">
                <span>{{ username }}</span>
                <span>@{{ userId }}</span>
            </p>
            <time class="tweet-head-time">{{ tweetDate }}</time>
        </div>
        <p class="tweet-text">{{ tweet.tweet }}</p>
        <ul class="tweet-actions">
            <li class="tweet-actions-action">
                <p class="tweet-actions-action-favorite" @click="addFavorite()">
                    はーと{{ tweet.favorite }}
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
    mounted () {
    },
    created () {
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.tweet {
    width: 100%;
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
