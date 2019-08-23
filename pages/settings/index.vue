<template>
    <section class="settings">
        <h2 class="settings-heading">Settings</h2>
        <ul class="settings-forms">
            <li class="settings-forms-form">
                <p class="form-label">名前</p>
                <input class="form-input" type="text" v-model="userdata.name" placeholder="例）おしゅし" />
            </li>
            <li class="settings-forms-form">
                <p class="form-label">プロフィール</p>
                <textarea class="form-input" type="text" v-model="userdata.profile" style="height: 80px" placeholder="例）寿司が好きです" />
            </li>
            <li class="settings-forms-form">
                <p class="form-label">URL</p>
                <input class="form-input" type="text" v-model="userdata.url" placeholder="https://oshushi.com" />
            </li>
            <li class="settings-forms-form">
                <p class="form-label">アイコン</p>
                <div class="a">
                    <input id="prg-icon-uploader" class="form-icon-input" type="file" @change="uploadIcon($event)" />
                    <label for="prg-icon-uploader" class="form-icon-wrapper">
                        <img :src="photoUrl" class="form-icon">
                    </label>
                </div>
            </li>
            <li class="settings-forms-form">
                <p class="form-label">ヘッダー画像</p>
                <div class="a">
                    <input id="prg-header-uploader" class="form-header-input" type="file" @change="uploadHeader($event)" />
                    <label for="prg-header-uploader" class="form-header-wrapper">
                        <img :src="headerUrl" class="form-header">
                    </label>
                </div>
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
            modifyPhoto: null,
            modifyHeader: null,
        }
    },
    computed: {
        ...mapGetters({
            userdata: 'users/getUserdata',
        }),
        photoUrl () {
            return this.modifyPhoto ? this.modifyPhoto : this.userdata.photo
        },
        headerUrl() {
            const header = this.userdata.header ? this.userdata.header : '#'
            return this.modifyHeader ? this.modifyHeader : header
        }
    },
    mounted () {
    },
    created () {
    },
    methods: {
        uploadIcon(e) {
            // アップロード対象は1件のみとする
            const file = (e.target.files || e.dataTransfer.files)[0]
            if (file) {
                this.$store.dispatch('users/uploadImage', {
                    path: 'icons',
                    name: file.name,
                    file: file,
                    userdata: this.userdata
                }).then(url => {
                    this.modifyPhoto = url
                })
            }
        },

        uploadHeader(e) {
            // アップロード対象は1件のみとする
            const file = (e.target.files || e.dataTransfer.files)[0]
            if (file) {
                this.$store.dispatch('users/uploadImage', {
                    path: 'headers',
                    name: file.name,
                    file: file,
                    userdata: this.userdata
                }).then(url => {
                    this.modifyHeader = url
                })
            }
        },

        saveUserdata (newName, newProfile, newUrl) {
            if(newName.length == 0) return;
            const data = {
                name: newName,
                profile: newProfile,
                url: newUrl,
                id: this.userdata.id,
                photo: this.photoUrl,
                header: this.headerUrl
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
            color: #a5a5a5
        }
        &:hover,
        &:focus {
            border-color: $oshushi;
        }
    }
    &-icon {
        width: 100%;
        height: 100%;
        object-fit: cover;
        &-wrapper {
            position: relative;
            display: block;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            &::before {
                position: absolute;
                content: "画像を選ぶ";
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                opacity: 0;
                background-color: rgba($oshushi, .9);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: bold;
                transition: .2s;
                cursor: pointer;
            }
            &:hover::before {
                opacity: 1;
            }
        }
        &-input {
            display: none;
        }
    }
    &-header {
        &-input {
            display: none;
        }
        &-wrapper {
            position: relative;
            display: block;
            height: 100px;
            overflow: hidden;
            &::before {
                position: absolute;
                content: "画像を選ぶ";
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                opacity: 0;
                background-color: rgba($oshushi, .9);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: bold;
                transition: .2s;
                cursor: pointer;
            }
            &:hover::before {
                opacity: 1;
            }
        }
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.a {
    flex: 3;
}
</style>
