<template>
    <div v-if="isSignedIn" class="signin">
        <p class="signin-photo-wrap">
            <img class="signin-photo" :src="userdata.photo">
        </p>
        <ul class="signin-infos">
            <li class="signin-infos-info">
                <p class="signin-infos-username"
                    v-text="userdata.nickname ? userdata.nickname : userdata.name"></p>
                    <!-- <span v-if="userdata.nickname">{{ userdata.nickname }} -->
            </li>
            <li class="signin-infos-info is-link">
                <nuxt-link to="/mypage" class="signin-infos-link">
                    プロフィール
                </nuxt-link>
            </li>
            <li class="signin-infos-info is-link">
                <p class="signin-infos-link" @click="googleSignOut">
                    ログアウトする
                </p>
            </li>
        </ul>
    </div>
    <div v-else>
        <Shadow :color="color" @click="googleSignIn">
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
            userdata: 'users/getUserdata'
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
        },
        googleSignOut () {
            this.$store.dispatch('users/googleSignOut');
        },
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
.signin-infos {
    min-width: 200px;
    border: 1px solid #d8d8d8;
    &-info {
        padding: 10px;
        font-size: 1.5rem;
        &.is-link {
            padding: 0;
        }
        &:not(:first-child) {
            border-top: 1px solid #d8d8d8;
        }
    }
}
.signin-infos-username {
    font-size: 1.6rem;
    font-weight: bold;
}
.signin-infos-link {
    display: block;
    font-size: 1.4rem;
    text-decoration: none;
    padding: 10px;
    color: inherit;
    @include hover-transition(.1s) {
        color: map-get($color-service, accent);
    }
}
</style>
