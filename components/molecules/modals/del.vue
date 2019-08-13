<template>
    <div class="modal" v-if="isDeleteTweetModalShow">
        <div class="modal-bg" @click="closeModal">
        </div>
        <div class="modal-container">
            <div class="modal-content">
                <p>ツイ消しする？</p>
                <ul class="modal-content-buttons">
                    <li class="modal-content-buttons-button yes" @click="deleteTweet">はい</li>
                    <li class="modal-content-buttons-button no" @click="closeModal">いいえ</li>
                </ul>
            </div>
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
        }
    },
    props: {
    },
    computed: {
        ...mapGetters({
            isDeleteTweetModalShow: 'tweet/getIsDeleteTweetModalShow'
        }),
    },
    mounted () {
    },
    methods: {
        deleteTweet () {
            this.$store.dispatch('tweet/deleteTweet');
        },
        closeModal () {
            this.$store.dispatch('tweet/closeDeleteTweetModal');
        }
    }
}
</script>

<style lang="scss" scoped>

.modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    &-bg {
        position: fixed;
        background-color: rgba(0, 0, 0, .7);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    &-container {
        position: absolute;
        max-width: 600px;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    &-content {
        width: 100%;
        background-color: map-get($color-service, base);
        border-radius: 4px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, .3);
        padding: 30px;
        box-sizing: border-box;
        p {
            font-size: 1.6rem;
        }
        &-buttons {
            margin-top: 15px;
            display: flex;
            &-button {
                padding: 10px 30px;
                font-size: 1.4rem;
                border-radius: 4px;
                &:not(:first-child) {
                    margin-left: 10px;
                }
                &.yes {
                    background-color: map-get($color-service, accent);
                    color: #fff;
                }
                &.no {
                    background-color: #f0f0f0;
                }
                @include hover-transition () {
                    opacity: .7;
                }
            }
        }
    }
}

</style>
