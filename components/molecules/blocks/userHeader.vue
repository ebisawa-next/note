<template>
    <section class="user-header"></section>
</template>

<script>
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
// import { mapGetters } from 'vuex'
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
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
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
</style>
