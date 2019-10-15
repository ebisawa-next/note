<template>
    <div class="error" :class="{'is-animate': isShowError}">
        <div class="error-contents">
            <p class="error-text"><i class="fas fa-exclamation-triangle icon"></i>{{ errorText }}</p>
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
            isShowError: 'nofitication/getErrorState',
            errorText: 'nofitication/getErrorText'
        })
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.error {
    position: fixed;
    left: 10px;
    right: 10px;
    top: 10px;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    background-color: #999;
    z-index: 2000;
    visibility: hidden;
    opacity: 0;
    transition: .5s;
    &.is-animate {
        visibility: visible;
        opacity: 1;
    }
    &-contents {
        padding: 10px;
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
