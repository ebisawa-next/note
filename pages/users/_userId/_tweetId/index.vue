<template>
    <div>
        <h3>個別ツイートページ</h3>
        <p>{{ usertweetData }}</p>
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
            usertweetData: 'userid/getUsertweetData'
        }),
        hasTweets () {
            return true
        }
    },
    mounted () {
        console.log(this.$route.params.tweetId)
        const payload = {
            userId: this.$route.params.userId,
            tweetId: this.$route.params.tweetId
        }
        this.$store.dispatch('userid/accessedUsertweet', payload)
        // this.$store.dispatch('userid/accessedUserpage', this.$route.params.userId)
    },
    created () {
        // this.$store.dispatch('userid/setTweetsRef', this.$route.params.userId)
    },
    methods: {
        addFavorite () {
            this.$store.dispatch('tweet/addFavorite');
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
