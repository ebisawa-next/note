<template>
    <section class="hero">
        <slot />
    </section>
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
.hero {
    $oshushi: map-get($color-sushi, oshushi);
    $salmon: map-get($color-sushi, salmon);

    background: 
        color-gradient(.8),
        // linear-gradient(rgba($oshushi, .9), rgba($salmon, .9)),
        url(~assets/images/index/sushi.jpg);
    background-size: cover;
    background-attachment: fixed;
}
</style>
