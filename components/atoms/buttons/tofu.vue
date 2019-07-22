<template>
    <button class="button" :class="[{'is-night': night}, buttonColor]">
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
            default: '',
        },
        night: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        if(this.night) {
            background-color: #fff;
            return;
        }
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
.button {
    color: 
}
</style>
