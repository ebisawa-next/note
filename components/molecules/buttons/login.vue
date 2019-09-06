<template>
    <div v-if="isSignedIn" class="signin">
        ログインずみだね
    </div>
    <div v-else>
        <Shadow :color="color" @fire="googleSignIn">
            <span class="text" :class="caseClass">ログインする</span>
        </Shadow>
    </div>
</template>

<script>
// Store使う場合はmapgettersで呼び出し
// DB使う場合はfirebase
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
import Shadow from '@/components/atoms/buttons/shadow'
export default {
    components: {
        Shadow
    },
    data () {
        return {
        }
    },
    props: {
        color: {
            type: String,
            default: ''
        },
        case: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapGetters({
            isSignedIn: 'users/getSignStatus',
        }),
        caseClass: function () {
            if(this.case == '') return;
            return `is-${this.case}`
        }
    },
    mounted () {
        this.$store.dispatch('users/googleAuthStateChanged');
    },
    methods: {
        googleSignIn () {
            this.$store.dispatch('users/googleSignIn');
        }
    }
}
</script>

<style lang="scss" scoped>
.text {
    &.is-hero {
        font-size: 2.4rem;
    }
}
.signin {
    display: flex;
    &-photo {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        &-wrap {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #dadada;
            overflow: hidden;
            @include hover-transition {
                border-color: map-get($color-service, accent);
            };
        }
    }
}
</style>
