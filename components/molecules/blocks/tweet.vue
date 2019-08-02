<template>
    <div class="tweet">
        <div class="tweet-head">
            <p class="tweet-head-name">{{ username }}</p>
            <time class="tweet-head-time" v-if="tweet.date">{{ tweet.date }}</time>
        </div>
        <p class="tweet-text">{{ tweet.tweet }}</p>
        <ul class="actions">
            <li class="actions-action">
                <p class="actions-action-favorite" @click="addFavorite()">
                    はーと{{ tweet.favorite }}
                </p>
            </li>
            <li class="actions-action">
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
