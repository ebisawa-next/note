<template>
    <div class="tofu">
        <slot />
    </div>
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
.tofu {
    padding: 10px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
}
</style>
