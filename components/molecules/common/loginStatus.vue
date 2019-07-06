<template>
    <div v-if="isSignedIn" class="signin">
        <p class="signin-photo-wrap" @click="changeInfos">
            <img class="signin-photo" :src="userdata.photo">
        </p>
        <ul class="signin-infos" v-if="isInfosShow" @click="onLinkClicked">
            <li class="signin-infos-info">
                <p class="signin-infos-username"
                    v-text="userdata.nickname ? userdata.nickname : userdata.name"></p>
            </li>
            <li class="signin-infos-info is-link">
                <nuxt-link to="/mypage" class="signin-infos-link">
                    マイページ
                </nuxt-link>
            </li>
            <li class="signin-infos-info is-link">
                <nuxt-link to="/settings" class="signin-infos-link">
                    <span class="signin-infos-link-icon"><Function :size="14" color="sushi" /></span>
                    <span>設定変更</span>
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
import Function from '@/components/atoms/icons/function'
export default {
    components: {
        Shadow, Function
    },
    data () {
        return {
            isInfosShow: false
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
        changeInfos () {
            this.isInfosShow = !this.isInfosShow;
        },
        onLinkClicked () {
            console.log('clicklink')
            this.isInfosShow = !this.isInfosShow;
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
.signin {
    position: relative;
    &-infos {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
    }
}
.signin-infos {
    min-width: 200px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    background-color: map-get($color-service, base);
    box-shadow: 0 1px 5px rgba(0, 0, 0, .3);
    $white: map-get($color-service, base);
    $smoke: map-get($color-service, border);
    &::before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 10px 9.3px 10px;
        right: 10px;
        border-color: transparent transparent $smoke transparent;
        top: -10px;
    }
    &::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 10px 9.3px 10px;
        right: 10px;
        border-color: transparent transparent $white transparent;
        top: -8px;
    }
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
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    text-decoration: none;
    padding: 10px;
    color: inherit;
    @include hover-transition(.1s) {
        color: map-get($color-service, accent);
    }
    &-icon {
        margin-right: 5px;
    }
}
</style>
