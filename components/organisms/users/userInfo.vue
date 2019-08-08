<template>
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
        <ul class="follows">
            <li class="follows-follow">
                <nuxt-link :to="`/users/${userdata.id}/following`" class="follows-follow-link">
                    <span class="follows-follow-num">{{ followings.length }}</span>
                    フォロー中
                </nuxt-link>
            </li>
            <li class="follows-follow">
                <nuxt-link :to="`/users/${userdata.id}/follower`" class="follows-follow-link">
                    <span class="follows-follow-num">{{ followers.length }}</span>
                    フォロワー
                </nuxt-link>
            </li>
        </ul>
    </aside>
</template>

<script>
import Follow from '@/components/molecules/buttons/follow'

// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
import { mapGetters } from 'vuex'
// import { db, auth } from '@/plugins/firebase'
export default {
    components: {
        Follow
    },
    data () {
        return {
        }
    },
    props: {
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'userid/getUserdata',
            followings: 'follow/getFollowings',
            followers: 'follow/getFollowers'
        }),
        otherUserPage () {
            if(!this.isSignedIn) return false;
            if(this.$store.state.users.userId == this.$route.params.userId) return false;
            return true;
        }
    },
    mounted () {
    },
    created () {
        const userId = this.$route.params.userId
        this.$store.dispatch('follow/storeFollow', userId)
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
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
.follows {
    margin-top: 15px;
    &-follow {
        display: inline-flex;
        &:not(:first-child) {
            margin-left: 10px;
        }
        &-link {
            font-size: 1.2rem;
            color: inherit;
            text-decoration: none;
            @include hover-transition {
                color: map-get($color-service, accent);
            }
        }
        &-num {
            font-weight: bold;
            font-size: 1.4rem;
        }
    }
}

</style>
