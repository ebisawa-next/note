<template>
    <p class="follow" @click="changeFollowState">
        <span class="follow-button" :class="followStatus.followingStatus ? 'following' : 'unfollowing'" @click="changeFollowState">
            {{ followingText }}
        </span>
    </p>
</template>

<script>
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
import { mapGetters } from 'vuex'
// import { db, auth } from '@/plugins/firebase'
export default {
    components: {

    },
    data () {
        return {
        }
    },
    props: {
    },
    computed: {
        ...mapGetters({
            followStatus: 'follow/getFollowStatus'
        }),
        followingText () {
            const text = this.followStatus.followingStatus ? 'フォロー中' : 'フォローする'
            return text
        }
    },
    mounted () {
        const userId = this.$route.params.userId
        this.$store.dispatch('follow/setFollowStatus', userId)
    },
    methods: {
        changeFollowState () {
            this.$store.dispatch('follow/changeFollowState', this.$route.params.userId)
        }
    }
}
</script>

<style lang="scss" scoped>
.follow {
    $oshushi: map-get($color-service, accent);
    &-button {
        display: block;
        padding: 10px;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        border-radius: 20px;
        &.following {
            border-color: $oshushi;
            background-color: $oshushi;
            color: #fff;
            @include hover-transition() {
                background-color: lighten($oshushi, 10%)
            }
        }
        &.unfollowing {
            border: 2px solid $oshushi;
            background-color: #fff;
            color: $oshushi;
            @include hover-transition() {
                background-color: $oshushi;
                color: #fff;
            }
        }

    }
}
</style>
