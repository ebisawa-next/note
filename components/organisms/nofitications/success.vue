<template>
    <div class="success" :class="{'is-animate': isShowSuccess}">
        <div class="success-contents">
            <p class="success-text"><i class="fas fa-check-circle icon"></i>{{ successText }}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    components: {

    },
    data () {
        return {
        }
    },
    props: {},
    computed: {
        ...mapGetters({
            isShowSuccess: 'nofitication/getSuccessState',
            successText: 'nofitication/getSuccessText'
        })
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.success {
    position: fixed;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    background-color: map-get($color-service, accent);
    z-index: 2000;
    visibility: hidden;
    opacity: 0;
    transition: .2s;
    @include mq {
        right: 20px;
        bottom: 20px;
        &-contents {
            padding: 10px 20px;
        }
    }
    @include mq(tbAndSp) {
        left: 10px;
        right: 10px;
        bottom: 10px;
        &-contents {
            padding: 10px;
        }
    }
    &.is-animate {
        visibility: visible;
        opacity: 1;
    }

    &-text {
        color: map-get($color-service, base);
        font-size: 1.6rem;
        .icon {
            margin-right: 5px;
        }
    }
}
</style>
