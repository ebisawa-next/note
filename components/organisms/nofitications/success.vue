<template>
    <div class="success" :class="{'is-animate': show}">
        <div class="success-contents">
            <p class="success-text">
                <slot />
            </p>
        </div>
    </div>
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
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
    },
    mounted () {
        console.log(show);
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.success {
    position: fixed;
    left: 0;
    right: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    background-color: #fff;
    z-index: 50;
    transform: translateY(-80px);
    visibility: hidden;
    &.is-animate {
        animation-name: move;
        animation-duration: 2s;
        animation-fill-mode: forwards;
    }
    @keyframes move {
        0% {
            visibility: visible;
            transform: translateY(-80px);
        }
        20% {
            transform: translateY(0);
        }
        80% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-80px);
        }
    }
    &-contents {
        padding: 20px;
    }
    &-text {
        position: relative;
        padding-left: 24px;
        font-size: 1.6rem;
        &::before {
            content: "";
            position: absolute;
            display: inline-block;
            width: 12px;
            height: 15px;
            border-radius: 2px;
            border-bottom: 4px solid #257a53;
            border-right: 4px solid #257a53;
            transform: rotate(45deg);
            left: 0;
            top: 2px;
        }
    }
}
</style>
