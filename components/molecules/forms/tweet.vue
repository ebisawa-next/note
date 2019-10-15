<template>
    <div class="forms">
        <div class="forms-wrapper">
            <div style="width: 100%">
                <textarea type="text" v-model="newTweet" class="textarea" placeholder="ほげほげほげ" />
                <p class="forms-tweetLength">
                    <span class="current" :class="{'is-over': isOver}">{{ newTweet.length }}</span><span class="max">{{ maxTweetLength }}</span>
                </p>
                <p v-if="isOver" class="errorMessage"><i class="fas fa-exclamation-triangle icon"></i>ツイートは140字以内にしてください</p>
            </div>
            <p class="sendButton" :class="{'is-active': isActive}" @click="saveTweet(newTweet)">つぶやく</p>
        </div>
    </div>
</template>

<script>
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
import firebase from 'firebase'
export default {
    components: {

    },
    data () {
        return {
            newTweet: '',
            maxTweetLength: 140
        }
    },
    props: {
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
        }),
        isOver() {
            if(this.newTweet.length > this.maxTweetLength) {
                return true
            }
            return false
        },
        isActive() {
            if(this.newTweet.length > 0 && !this.isOver) {
                return true
            }
            return false
        }
    },
    mounted () {
    },
    created () {
    },
    methods: {
        saveTweet (newTweet) {
            if(newTweet.length == 0) return
            if(newTweet.length > this.maxTweetLength) return
            const payload = {
                tweet: newTweet,
                created_at: firebase.firestore.Timestamp.fromDate(new Date()),
                favorite: 0
            }
            this.$store.dispatch('tweet/closeTweetModal')
            this.$store.dispatch('tweet/saveTweet', payload)
            this.newTweet = ''
        },
    }
}
</script>

<style lang="scss" scoped>
.forms {
    $oshushi: map-get($color-service, accent);
    &-wrapper {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
    }
    .textarea {
        width: 100%;
        height: 80px;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        padding: 10px;
        flex: 3;
    }
    .sendButton {
        color: #fff;
        padding: 10px;
        border-radius: 20px;
        margin-top: 10px;
        text-align: center;
        flex: 1;
        font-size: 1.4rem;
        pointer-events: none;
        background-color: #dadada;
        &.is-active {
            background-color: $oshushi;
            pointer-events: auto;
            @include hover-transition {
                background-color: lighten($oshushi, 10%);
            }
        }
    }
    @include mq {
        flex-direction: row;
        .textArea {
            width: 600px;
        }
        .sendButton {
            margin-left: 10px;
        }
    }
    &-tweetLength {
        margin-top: 5px;
        .max {
            &::before {
                content: "/";
                margin: 0 5px;
            }
        }
        .current {
            &.is-over {
                color: $oshushi;
            }
        }
    }
    .errorMessage {
        margin-top: 10px;
        .icon {
            margin-right: 5px;
        }
        font-weight: bold;
        color: $oshushi;
    }
}
</style>
