<template>
    <div class="forms">
        <textarea type="text" v-model="newTweet" class="textarea" placeholder="ほげほげほげ" />
        <p class="sendButton" @click="saveTweet(newTweet)">つぶやく</p>
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
        }
    },
    props: {
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'users/getUserdata',
        }),
    },
    mounted () {
    },
    created () {
    },
    methods: {
        saveTweet (newTweet) {
            if(newTweet.length == 0) return;
            const payload = {
                tweet: newTweet,
                created_at: firebase.firestore.Timestamp.fromDate(new Date()),
                favorite: 0
            }
            console.log(payload.created_at)
            this.$store.dispatch('tweet/closeTweetModal');
            this.$store.dispatch('tweet/saveTweet', payload);
            this.newTweet = '';
        },
    }
}
</script>

<style lang="scss" scoped>
.forms {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    .textarea {
        width: 100%;
        height: 80px;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        padding: 10px;
        flex: 3;
    }
    .sendButton {
        $oshushi: map-get($color-service, accent);
        background-color: $oshushi;
        color: #fff;
        padding: 10px;
        border-radius: 20px;
        margin-top: 10px;
        text-align: center;
        flex: 1;
        font-size: 1.4rem;
        @include hover-transition {
            background-color: lighten($oshushi, 10%);
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
}
</style>
