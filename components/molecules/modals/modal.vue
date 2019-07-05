<template>
    <div class="modal" v-if="isShowModal">
        <div class="modal-bg" @click="closeModal">
        </div>
        <div class="modal-container">
            <div class="modal-content">
                <slot />
            </div>
        </div>
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
            isShowModal: true
        }
    },
    props: {
    },
    computed: {
    },
    mounted () {
    },
    methods: {
        closeModal () {
            this.isShowModal = false
        }
    }
}
</script>

<style lang="scss" scoped>

.modal {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    &-bg {
        position: fixed;
        background-color: rgba(0, 0, 0, .7);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    &-container {
        position: absolute;
        max-width: 600px;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &-content {
        width: 100%;
        background-color: map-get($color-service, base);
        border-radius: 4px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
        padding: 30px;
        box-sizing: border-box;
    }
}

</style>
