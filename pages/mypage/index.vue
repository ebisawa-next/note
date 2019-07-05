<template>
    <div>
        <div class="forms">
            <input type="text" v-model="newNickname" class="form" placeholder="ほげほげほげ" />
            <p class="sendButton" @click="saveNickname(newNickname)">ニックネームを更新する</p>
        </div>
        <section class="user-header"></section>
        <section class="container" v-if="isSignedIn">
            <aside class="users">
                <figure class="users-photo">
                    <img :src="userdata.photo" class="users-photo-image">
                    <figcaption >
                        <p class="users-photo-name">{{ userName }}</p>
                        <p class="users-photo-email">{{ userdata.email }}</p>
                        <p class="users-photo-caption">最近あったことをつらつらと書き連ねるスペースです。今日も1日頑張るぞい</p>
                    </figcaption>
                </figure>
            </aside>
            <article class="timelines">
                <ul class="timelines-items">
                    <li v-for="(tweet, index) in userdata.tweet" :key="index" class="timelines-items-item">
                        <div class="timelines-tweet-head">
                            <p class="timelines-tweet-head-name">{{ userName }}</p>
                            <time class="timelines-tweet-head-time">{{ tweet.date }}</time>
                        </div>
                        <p class="timelines-tweet-text">{{ tweet.tweet }}</p>
                        <ul class="timelines-actions">
                            <li class="timelines-actions-action">
                                はーと
                            </li>
                            <li class="timelines-actions-action">
                                こめんと
                            </li>
                        </ul>
                    </li>
                </ul>
            </article>
        </section>
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
            newNickname: '',
        }
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'users/getUserdata',
            timeline: 'users/getTimeline'
        }),
        userName: function () {
            if(!this.userdata) return '';
            return this.userdata.nickname ? this.userdata.nickname : this.userdata.name;
        },
        hasTweet: function () {
            if(this.userdata.tweet !== []) {
                return false;
            }
            return true;
        }
    },
    mounted () {
        console.log(this.userdata)
    },
    created () {
    },
    methods: {
        googleSignIn () {
            this.$store.dispatch('users/googleSignIn');
        },
        googleSignOut () {
            this.$store.dispatch('users/googleSignOut');
        },
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
        saveNickname (newNickname) {
            if(newNickname.length == 0) {
                return;
            }
            const payload = {
                nickname: newNickname
            }
            this.$store.dispatch('users/saveNickname', payload);
            this.newNickname = '';
        },
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
.user-header {
    display: block;
    height: 300px;
    background:
        color-gradient(.9),
        url(~assets/images/index/sushi.jpg);
    background-size: cover;
    background-attachment: fixed;
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
.users {
    width: 250px;
    box-sizing: border-box;
    padding: 0 10px;
    background-color: #f5f5f5;
    position: relative;
    &-photo {
        position: absolute;
        top: -90px;
        left: calc(50% - 90px);
        width: 180px;
        height: 180px;
        &-image {
            border-radius: 50%;
            border: 4px solid #fff;
            width: 100%;
            height: 100%;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
        }
        &-name {
            font-size: 2rem;
            font-weight: bold;
        }
        &-caption {
            font-size: 1.4rem;
            margin-top: 15px;
        }

    }
}

.heading {
    font-size: 2.4rem;
}


.forms {
    display: flex;
    margin: 10px 0 30px;

    .textarea {
        width: 600px;
        border: 1px solid #d8d8d8;
        border-radius: 4px;
        padding: 10px;
    }

    .form {
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #d8d8d8;
    }

    .sendButton {
        background-color: #ed6103;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-left: 10px;
    }
}

.login {
    padding: 10px;
    background-color: #ffab00;
    border-radius: 4px;
    display: inline-flex;
}

.information {
    margin-top: 20px;
}
.information tr:not(:first-child) {
    border-top: 1px solid #d8d8d8;
}
.information th,
.information td {
    padding: 15px 10px;
}
.information th {
    background-color: #f5f5f5;
}
</style>

