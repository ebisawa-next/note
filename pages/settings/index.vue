<template>
    <section class="settings">
        <h2 class="settings-heading">Settings</h2>
        <ul class="settings-forms">
            <li class="settings-forms-form">
                <p class="form-label">名前</p>
                <input class="form-input" type="text" v-model="userdata.name" :placeholder="userdata.name" />
            </li>
            <li class="settings-forms-form">
                <p class="form-label">プロフィール</p>
                <textarea class="form-input" type="text" v-model="userdata.profile" style="height: 80px" :placeholder="userdata.profile" />
            </li>
            <li class="settings-forms-form">
                <p class="form-label">URL</p>
                <input class="form-input" type="text" v-model="userdata.url" :placeholder="userdata.url" />
            </li>
        </ul>
        <p class="settings-button" @click="saveUserdata(userdata.name,userdata.profile, userdata.url)">更新する</p>
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
        }
    },
    computed: {
        ...mapGetters({
            userdata: 'users/getUserdata',
        }),
    },
    mounted () {
    },
    created () {
    },
    methods: {
        saveUserdata (newName, newProfile, newUrl) {
            if(newName.length == 0) return;
            const data = {
                name: newName,
                profile: newProfile,
                url: newUrl,
                id: this.userdata.id
            }
            this.$store.dispatch('users/saveUserdata', data);
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
