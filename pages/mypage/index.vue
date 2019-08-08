<template>
    <div class="mypage">
        <ul class="timeline">
            <li v-for="(tweet, index) in timeline" :key="index" class="timeline-item">
                <figure class="timeline-item-icon">
                    <img v-if="tweet.photo" :src="tweet.photo">
                </figure>
                <Timeline :tweet="tweet" :username="tweet.username" />
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
import firebase from 'firebase'
import Timeline from '@/components/molecules/blocks/tweet'
export default {
    validate ({ params }) {
        return /^[a-zA-Z0-9]+$/.test(params.userId)
    },
    components: {
        Timeline
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
            userdata: 'userid/getUserdata',
            timeline: 'mypage/getTimeline',
        }),
        hasTweets () {
            return true
        },
    },
    mounted () {
        // this.$store.dispatch('userid/accessedUserpage', userId)
    },
    created () {
        // const userId = this.$route.params.userId
        // this.$store.dispatch('userid/setTweetsRef', userId)
        // this.$store.dispatch('follow/storeFollow', userId)
        this.$store.dispatch('mypage/accessedMypage')

    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.mypage {
    @include mq {
        width: 80%;
        margin: 0 auto;
        flex-direction: row;
    }
}
.timeline {
    position: relative;
    flex: 1;
    &-item {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        &:not(:first-child) {
            border-top: 1px solid map-get($color-service, border);
        }
        &-link {
            text-decoration: none;
            color: inherit;
            display: flex;
            @include hover-transition {
                color: map-get($color-service, accent);
            }
        }
        &-icon {
            width: 50px;
            height: 50px;
            margin-right: 20px;
            background-color: #f5f5f5;
            color: #a5a5a5;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}


.heading {
    font-size: 2.4rem;
}

</style>
