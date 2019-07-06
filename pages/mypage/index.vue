<template>
    <div>
        <section class="user-header"></section>
        <section class="container" v-if="isSignedIn">
            <aside class="users">
                <figure class="users-photo">
                    <img :src="userdata.photo" class="users-photo-image">
                    <p class="users-photo-name">{{ userName }}</p>
                    <p class="users-photo-email">{{ userdata.email }}</p>
                </figure>
                <p class="users-photo-caption">最近あったことをつらつらと書き連ねるスペースです。今日も1日頑張るぞい</p>
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
            timeline: 'users/getTimeline',
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
    },
    created () {
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
.user-header {
    display: block;
    height: 150px;
    background:
        color-gradient(.8),
        url(~assets/images/index/sushi.jpg);
    background-size: cover;
    background-attachment: fixed;
    @include mq {
        height: 300px;
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
    box-sizing: border-box;
    padding: 0 10px 20px;
    background-color: #f5f5f5;
    position: relative;
    @include mq(tbAndSp) {
        width: 100%;
    }
    @include mq {
        width: 250px;
    }
    &-photo {
        margin-top: -50px;
        &-image {
            border-radius: 50%;
            border: 6px solid #fff;
            width: 100px;
            height: 100px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
            @include mq {
                width: 50%;
                height: auto;
            }
        }
        &-name {
            font-size: 2.4rem;
            font-weight: bold;
            margin-top: 10px;
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
