<template>
    <Hero>
        <section class="hero-container">
            <h2 class="hero-message">寿司活を、はじめよう</h2>
            <p class="hero-login-lead">gmailでかんたんログイン</p>
            <p class="hero-login-button">
                <Login color="white" case="hero" />
            </p>
        </section>
    </Hero>
</template>

<script>
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
// import { mapGetters } from 'vuex'
// import { db, auth } from '@/plugins/firebase'
import Hero from '@/components/atoms/blocks/hero'
import Login from '@/components/molecules/buttons/login'
export default {
    components: {
        Hero, Login
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
.hero-container {
    padding: 10px;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: map-get($color-service, base);
    @include mq {
        min-height: 500px;
        padding: 20px 0;
    }
}
.hero-message {
    font-size: 2.8rem;
}
.hero-login-lead {
    margin-top: 20px;
    font-size: 1.6rem;
}
.hero-login-button {
    margin-top: 15px;
}
</style>
