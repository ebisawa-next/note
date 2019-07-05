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
    methods: {
        getDate () {
            function initNum(num) {
                if(num >= 10) return num;
                return `0${num}`
            }

            const hiduke = new Date();
            //年・月・日・曜日を取得する
            var year = hiduke.getFullYear();
            var month = hiduke.getMonth()+1;
            var week = hiduke.getDay();
            var day = hiduke.getDate();
            var yobi= new Array("日","月","火","水","木","金","土");

            var hour = hiduke.getHours();
            var minute = hiduke.getMinutes();
            var second = hiduke.getSeconds();

            month = initNum(month)
            day = initNum(day)

            hour = initNum(hour)
            minute = initNum(minute)
            second = initNum(second)


            const sort = `${year}${month}${day}${hour}${minute}${second}`

            return {
                date: `${year}/${month}/${day}(${yobi[week]})  ${hour}:${minute}:${second}`,
            }
        },
        saveTweet (newTweet) {
            console.log(this.userdata.tweetId)
            if(newTweet.length == 0) return;
            const date = this.getDate()
            const payload = {
                tweet: newTweet,
                date: date.date,
            }
            this.$store.dispatch('users/saveTweet', payload);
            this.newTweet = '';
        },
    }
}
</script>

<style lang="scss" scoped>
.forms {
    display: flex;
    flex-direction: column;
    .textarea {
        width: 100%;
        height: 100px;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        padding: 10px;
    }
    .sendButton {
        background-color: #ed6103;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-top: 10px;
        text-align: center;
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
