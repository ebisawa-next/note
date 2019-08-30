<template>
    <Tofu>
        <nuxt-link :to="userpage" class="user-card">
            <figure class="user-card-icon">
                <img v-if="userdata.photo" :src="userdata.photo">
                <figcaption v-else class="user-card-icon-no">no image</figcaption>
            </figure>
            <div class="user-card-infos">
                <p class="user-card-name">{{ userdata.name }}</p>
                <p class="user-card-id">@{{ userdata.id }}</p>
                <p class="user-card-profile">{{ userdata.profile }}</p>
            </div>
        </nuxt-link>
    </Tofu>
</template>

<script>
import Tofu from '@/components/atoms/blocks/tofu'
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
// import { mapGetters } from 'vuex'
// import { db, auth } from '@/plugins/firebase'
export default {
    components: {
        Tofu
    },
    data () {
        return {
        }
    },
    props: {
        userdata: {
            type: Object,
            default: null
        },
    },
    computed: {
        userpage () {
            return `/users/${this.userdata.id}`
        }
    },
    mounted () {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.user-card {
    display: flex;
    text-decoration: none;
    color: inherit;
    align-items: center;

    &-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 2px solid #d8d8d8;
        overflow: hidden;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &-no {
            color: #a5a5a5;
        }
    }
    &-infos {
        flex: 1;
        margin-left: 10px;
    }
    &-name {
        font-size: 1.8rem;
        font-weight: bold;
    }
    &-id {
        color: #515151;
        font-size: 1.2rem;
    }
    &-profile {
        margin-top: 5px;
        font-size: 1.6rem;
    }
}
</style>
