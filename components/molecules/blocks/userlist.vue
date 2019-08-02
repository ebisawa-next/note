<template>
    <div class="user-list">
        <figure class="user-list-icon">
            <img :src="userdata.photo" v-if="userdata.photo">
            <figcaption v-else>no image</figcaption>
        </figure>
        <div class="user-list-content">
            <p class="user-list-name">{{ userdata.name }}</p>
            <p class="user-list-id">@{{ userdata.id }}</p>
            <p class="user-list-profile">{{ userdata.profile }}</p>
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
            hoge: null
        }
    },
    props: {
        userdata: {
            type: Object,
            default: null
        }
    },
    computed: {
    },
    mounted () {
    },
    created () {

    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.user-list {
    padding: 15px 10px;
    display: flex;
    &-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        figcaption {
            color: #a5a5a5
        }
    }
    &-content {
        margin-left: 10px;
    }
    &-name {
        font-size: 1.8rem;
        font-weight: bold;
    }
    &-id {
        color: #a5a5a5;
        font-size: 1.2rem;
    }
    &-profile {
        margin-top: 5px;
        font-size: 1.4rem;
    }
}
</style>
