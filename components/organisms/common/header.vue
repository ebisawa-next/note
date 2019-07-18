<template>
  <div>
  <header class="header">
    <nuxt-link to="/" class="header-logo-link">
      <Logo />
    </nuxt-link>
    <!-- 多分このリンクもパーツ化すべき -->
    <!-- <ul class="header-links">
      <li class="header-links-link" v-for="(link, index) in links" :key="index">
        <a :href="link.url" class="header-links-text">{{ link.text }}</a>
      </li>
    </ul> -->
    <div class="header-functions">
      <p class="header-functions-button" @click="openModal">つぶやく</p>
      <p class="header-functions-icon">
        <LoginStatus />
      </p>
    </div>
    <TweetModal />
  </header>
  <Success :show="isTweetSuccess">ツイートが投稿されました</Success>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import Logo from '@/components/atoms/icons/common/logo'
import LoginStatus from '@/components/molecules/common/loginStatus'
import Tweet from '@/components/molecules/forms/tweet'
import TweetModal from '@/components/organisms/modals/tweetModal'
import Success from '@/components/organisms/nofitications/success'
export default {
  components: {
    Logo, LoginStatus, Tweet, TweetModal, Success
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
        isTweetSuccess: 'tweet/getIsTweetSuccess'
    })
  },
  mounted () {
  },
  created () {
    this.$store.dispatch('tweet/initTweetId');
  },
  methods: {
    openModal () {
      this.$store.dispatch('tweet/openTweetModal');
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: map-get($color-service, base);
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  z-index: 100;
  &-logo-link {
    text-decoration: none;
    @include hover-transition {
      opacity: .8;
    }
  }
}
.header-links {
  display: flex;
  &-link {
    color: map-get($color-service, base);
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
  &-text {
    text-decoration: none;
    color: map-get($color-service, base);
    &:hover {
      text-decoration: underline;
    }
  }
}
.header-functions {
  display: flex;
  $oshushi: map-get($color-service, accent);
  &-button {
    padding: 10px 30px;
    border-radius: 4px;
    background-color: $oshushi;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    @include hover-transition(.3s) {
      background-color: lighten($oshushi, 10%);
    }
  }
  &-icon {
    margin-left: 20px;
  }
}
</style>
