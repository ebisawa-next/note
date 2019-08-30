<template>
    <div>
        <h3 class="user-cards-heading">{{ heading }}</h3>
        <ul class="user-cards">
            <li class="user-cards-card" v-for="(userdata, index) in userdatas" :key="index">
                <Usercard :userdata="userdata" />
            </li>
        </ul>
    </div>
</template>

<script>
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
import { mapGetters } from 'vuex'
// import { db, auth } from '@/plugins/firebase'
import Usercard from '@/components/molecules/blocks/usercard'
export default {
    components: {
        Usercard
    },
    data () {
        return {
        }
    },
    props: {
        heading: {
            type: String,
            default: '',
        }
    },
    computed: {
        ...mapGetters({
            userdatas: 'getUserdatas'
        })
    },
    mounted () {
    },
    created () {
        this.$store.dispatch('storeUserdatas')
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.user-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-card {
        width: calc(100% / 3 - 10px);
        &:nth-child(n+4) {
            margin-top: 10px;
        }
    }
    &::after {
        content: "";
        display: block;
        width: calc(100% / 3 - 10px);
    }

    @include mq(tbAndSp) {
        padding: 10px;
        flex-direction: column;
        &-card {
            width: 100%;
            &:not(:first-child) {
                margin: 10px 0 0 0;
            }
        }
    }

}
</style>
