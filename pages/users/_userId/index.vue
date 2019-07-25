<template>
    <div>
        <section class="user-header"></section>
        <section v-if="userdata" class="container">
            <aside class="users">
                <figure class="users-photo">
                    <img v-if="userdata.photo" :src="userdata.photo" class="users-photo-image">
                    <p v-else class="users-photo-image noimage">no image</p>
                    <p class="users-photo-name">{{ userdata.name }}</p>
                    <p>@{{ userdata.id }}</p>
                    <a :href="userdata.url" target="_blank">{{ userdata.url }}</a>
                </figure>
                <p v-if="userdata.profile" class="users-photo-caption">{{ userdata.profile }}</p>
                <p class="users-follow" :class="{ 'followed': followStatus.followingStatus }" @click="changeFollowState">{{ followingText }}</p>
            </aside>
            <article class="timelines">
                <ul class="timelines-items" v-if="hasTweets">
                    <li v-for="(tweet, index) in tweets" :key="index" class="timelines-items-item">
                        <nuxt-link :to="userdata.id+'/'+tweet.tweetid" class="timelines-items-item-link">
                            <div class="timelines-tweet-head">
                                <p class="timelines-tweet-head-name">{{ userdata.name}}</p>
                                <time class="timelines-tweet-head-time">{{ tweet.date }}</time>
                            </div>
                            <p class="timelines-tweet-text">{{ tweet.tweet }}</p>
                            <ul class="timelines-actions">
                                <li class="timelines-actions-action">
                                    <p class="timelines-actions-action-favorite" @click="addFavorite()">
                                        はーと{{ tweet.favorite }}
                                    </p>
                                </li>
                                <li class="timelines-actions-action">
                                    こめんと
                                </li>
                            </ul>
                        </nuxt-link>
                    </li>
                </ul>
                <p v-else>まだツイートが投稿されていません</p>
            </article>
        </section>
        <section v-else>
            <p>このユーザーは存在しません</p>
        </section>
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
            followStatus: 'follow/getFollowStatus'
        }),
        hasTweets () {
            return true
        },
        followingText () {
            const text = this.followStatus.followingStatus ? 'フォロー中' : 'フォローする'
            return text
        }
    },
    mounted () {
        console.log(this.$route.params.userId)
        const userId = this.$route.params.userId
        this.$store.dispatch('userid/accessedUserpage', userId)
        this.$store.dispatch('follow/setFollowStatus', userId)
    },
    created () {
        this.$store.dispatch('userid/setTweetsRef', this.$route.params.userId)
    },
    methods: {
        addFavorite () {
            this.$store.dispatch('tweet/addFavorite');
        },
        changeFollowState () {
            this.$store.dispatch('follow/changeFollowState', this.$route.params.userId)
        }
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
        &-link {
            text-decoration: none;
            color: inherit;
            @include hover-transition {
                color: map-get($color-service, accent);
            }
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
                width: 150px;
                height: 150px;
            }
            &.noimage {
                background: #f5f5f5;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #a5a5a5;
                pointer-events: none;
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
    &-follow {
        margin-top: 10px;
        border: 2px solid map-get($color-service, accent);
        color: map-get($color-service, accent);
        padding: 10px;
        text-align: center;
        background-color: #fff;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 20px;
        &.followed {
            border-color: map-get($color-service, accent);
            background-color: map-get($color-service, accent);
            color: #fff;
        }
        @include hover-transition() {
            opacity: .8;
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
