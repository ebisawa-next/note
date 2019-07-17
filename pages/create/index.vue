<template>
    <section class="settings">
        <h2 class="settings-heading">Create User</h2>
        <ul class="settings-forms">
            <li class="settings-forms-form">
                <p class="form-label">メールアドレス</p>
                <p>{{ userdata.userEmail }}</p>
            </li>
            <li class="settings-forms-form">
                <p class="form-label">ユーザーID</p>
                <input class="form-input" type="text" v-model="newId" placeholder="ex: sushi" />
                <p v-if="errorId" class="form-error">ユーザーIDを入力してください</p>
            </li>
            <li class="settings-forms-form">
                <p class="form-label">ニックネーム</p>
                <input class="form-input" type="text" v-model="newName" placeholder="ex: 寿司" />
                <p v-if="errorName" class="form-error">ニックネームを入力してください</p>
            </li>
            <li class="settings-forms-form">
                <p class="form-label">自己紹介</p>
                <textarea class="form-input" type="text" v-model="newProfile" style="height: 80px" placeholder="ex: 好きな寿司はえんがわです" />
            </li>
        </ul>
        <p class="settings-button" @click="createUser(newName, newProfile, newId)">ユーザー情報を登録する</p>
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
            newName: '',
            newProfile: '',
            newId: '',
            errorName: false,
            errorId: false
        }
    },
    computed: {
        ...mapGetters({
            userdata: 'users/getUserdata',
        }),
    },
    mounted () {
        this.$store.dispatch('users/googleAuthStateChanged');
    },
    created () {
    },
    methods: {
        createUser (newName, newProfile, newId) {
            if(newName.length == 0 || newProfile.length == 0) {
                return this.errorName = true;
            }
            const payload = {
                name: newName,
                profile: newProfile,
                id: newId
            }
            this.$store.dispatch('users/createUser', payload);
            this.newName = payload.name;
            this.newProfile = payload.profile;
            this.newId = payload.id;
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
            color: #a5a5a5;
        }
        &:hover,
        &:focus {
            border-color: $oshushi;
        }
    }
}
</style>
