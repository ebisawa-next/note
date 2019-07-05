<template>
    <Modal>
        <Tweet />
    </Modal>
</template>

<script>
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
import { mapGetters } from 'vuex'
// import { db, auth } from '@/plugins/firebase'

import Modal from '@/components/molecules/modals/modal'
import Tweet from '@/components/molecules/forms/tweet'

export default {
    components: {
        Modal, Tweet
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

</style>
