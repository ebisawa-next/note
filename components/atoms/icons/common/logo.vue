<template>
    <span class="logo" :class="logoColor">さーびすろごだよ</span>
</template>

<script>
export default {
    data () {
        return {}
    },
    props: {
        color: {
            type: String,
            default: '',
        },
    },
    computed: {
        logoColor: function() {
            let color = this.color;
            if(color == 'white') {
                return `is-white`
            }
            return '';
        }
    },
    mounted () {
    },
    methods: {
    },
}
</script>

<style lang="scss" scoped>
.logo {
    color: map-get($color-service, main);
    font-size: 1.2rem;
    font-weight: bold;
    &.is-white {
        color: map-get($color-service, base);
    }
}
</style>
