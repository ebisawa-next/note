<template>
    <h2 class="icon-heading">
        <i class="fas icon-heading-icon" :class="icon"></i>
        <span class="icon-heading-label">{{ heading }}</span>
    </h2>
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
        heading: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        }
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
.icon-heading {
    font-size: 2.4rem;
    margin-bottom: 15px;
    &-icon {
        color: map-get($color-service, accent);
    }
}
</style>
