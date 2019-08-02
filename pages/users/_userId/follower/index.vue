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
                <div class="follow" v-if="otherUserPage">
                    <Follow />
                </div>
            </aside>
            <article class="timelines">
                <ul>
                    <li v-for="(follower, index) in followers" :key="index">
                        <nuxt-link :to="'/users/'+follower.id">
                            <Userinfo :userdata="follower" />
                        </nuxt-link>
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
import Follow from '@/components/molecules/buttons/follow'
import Userinfo from '@/components/molecules/blocks/userinfo'
export default {
    validate ({ params }) {
        return /^[a-zA-Z0-9]+$/.test(params.userId)
    },
    components: {
        Follow, Userinfo
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'userid/getUserdata',
            followers: 'follow/getFollowers',
        }),
        hasTweets () {
            return true
        },
        otherUserPage () {
            if(!this.isSignedIn) return false;
            if(this.$store.state.users.userId == this.$route.params.userId) return false;
            return true;
        }
    },
    mounted () {
        const userId = this.$route.params.userId
        this.$store.dispatch('userid/accessedUserpage', userId)
        this.$store.dispatch('follow/storeFollow', userId)
    },
    created () {
        this.$store.dispatch('userid/setTweetsRef', this.$route.params.userId)
    },
    methods: {
        addFavorite () {
            this.$store.dispatch('tweet/addFavorite');
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
}
.follow {
    margin-top: 10px;
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
