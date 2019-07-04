<template>
    <button class="button" :class="[buttonColor]" @click="clickEvent">
        <slot />
    </button>
</template>

<script>
export default {
    data () {
        return {}
    },
    props: {
        color: {
            type: String,
            default: 'default',
        },
        click: {
            type: Function,
            default: function () {},
        }
    },
    computed: {
        buttonColor: function() {
            if(this.color == '') return;
            return `is-${this.color}`
        },
    },
    mounted () {
    },
    methods: {
        clickEvent: function () {
            this.click();
        }
    },
}
</script>

<style lang="scss" scoped>
.button {
    padding: 10px;
    border: 1px solid map-get($color-service, accent);
    color: map-get($color-service, accent);
    background: transparent;
    border-radius: 4px;
    transition: .1s;
    outline: none;
    font-size: 1.4rem;
    &:hover {
        background-color: map-get($color-service, accent);
        color: map-get($color-service, base);
    }
    &.is-white {
        border-color: map-get($color-service, base);
        color: map-get($color-service, base);
        &:hover {
            background-color: map-get($color-service, base);
            color: map-get($color-service, accent);
            cursor: pointer;
        }
    }
}
</style>
