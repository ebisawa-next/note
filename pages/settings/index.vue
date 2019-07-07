<template>
    <section class="settings">
        <h2 class="settings-heading">Settings</h2>
        <ul class="settings-forms">
            <li class="settings-forms-form">
                <p class="form-label">ユーザーID</p>
                <input class="form-input" type="text" v-model="newUid" :placeholder="userdata.uid" />
                <p v-if="errorUid" class="form-error">ユーザーIDを入力してください</p>
            </li>
            <li class="settings-forms-form">
                <p class="form-label">ニックネーム</p>
                <input class="form-input" type="text" v-model="newNickname" :placeholder="userdata.nickname" />
                <p v-if="errorNickname" class="form-error">ニックネームを入力してください</p>
            </li>
            <li class="settings-forms-form">
                <p class="form-label">自己紹介</p>
                <textarea class="form-input" type="text" v-model="newProfile" style="height: 80px" :placeholder="userdata.profile" />
            </li>
        </ul>
        <p class="settings-button" @click="saveUserdata(newNickname, newProfile, newUid)">更新する</p>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '@/plugins/firebase'
import firebase from 'firebase'

export default {
    components: {
    },
    data () {
        return {
            newNickname: '',
            newProfile: '',
            newUid: '',
            errorNickname: false,
            errorUid: false
        }
    },
    computed: {
        ...mapGetters({
            userdata: 'users/getUserdata',
        }),
        userName: function () {
            if(!this.userdata) return '';
            return this.userdata.nickname ? this.userdata.nickname : this.userdata.name;
        },
    },
    mounted () {
        console.log(this.userdata)
    },
    created () {
    },
    methods: {
        saveUserdata (newNickname, newProfile, newUid) {
            if(newNickname.length == 0 || newProfile.length == 0) {
                return this.errorNickname = true;
            }
            const payload = {
                nickname: newNickname,
                profile: newProfile,
                uid: newUid
            }
            this.$store.dispatch('users/saveUserdata', payload);
            this.newNickname = payload.nickname;
            this.newProfile = payload.profile;
            this.newUid = payload.uid
        },
    },
}
</script>

<style lang="scss" scoped>
$oshushi: map-get($color-service, accent);
.settings {
    padding: 30px 10px;
    @include mq {
        width: 80%;
        margin: 0 auto;
        box-sizing: border-box;
    }
    &-heading {
        font-size: 2.4rem;
        font-weight: bold;
    }
    &-forms {
        margin-top: 20px;
        &-form {
            display: flex;
            align-items: center;
            &:not(:first-child) {
                margin-top: 20px;
            }
        }
    }
    &-button {
        margin-top: 20px;
        background: $oshushi;
        color: map-get($color-service, base);
        padding: 10px;
        text-align: center;
        border-radius: 4px;
        font-size: 1.6rem;
        @include hover-transition {
            background: lighten($oshushi, 10%);
        }
    }
}
.form {
    &-label {
        font-weight: bold;
        font-size: 1.4rem;
        flex: 1;
    }
    &-input {
        flex: 3;
        outline: none;
        margin-left: 10px;
        border: transparent;
        border-bottom: 1px solid #d8d8d8;
        padding: 10px;
        display: block;
        font-size: 1.6rem;
        &::placeholder {
            color: #000;
        }
        &:hover,
        &:focus {
            border-color: $oshushi;
        }
    }
}
</style>
