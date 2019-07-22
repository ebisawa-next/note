<template>
    <Tofu>
        <nuxt-link :to="userpage">
            <p>{{ userdata.id }}</p>
            <p>{{ userdata.name }}</p>
            <p><img :src="userdata.photo"></p>
            <p>{{ userdata.profile }}</p>
            <p>{{ userdata.url }}</p>
        </nuxt-link>
    </Tofu>
</template>

<script>
import Tofu from '@/components/atoms/blocks/tofu'
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
// import { mapGetters } from 'vuex'
// import { db, auth } from '@/plugins/firebase'
export default {
    components: {
        Tofu
    },
    data () {
        return {
        }
    },
    props: {
        userdata: {
            type: Object,
            default: null
        },
    },
    computed: {
        userpage () {
            return `/users/${this.userdata.id}`
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
</style>
