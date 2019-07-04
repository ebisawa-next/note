<template>
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
    <LoginStatus />
  </header>
</template>
x
<script>
import Logo from '@/components/atoms/icons/common/logo'
import LoginStatus from '@/components/molecules/common/loginStatus'
export default {
  components: {
    Logo, LoginStatus
  },
  data () {
    return {
      links: [
        {
          url: '#',
          text: 'ほげ'
        },
        {
          url: '#',
          text: 'ふが'
        },
        {
          url: '#',
          text: 'ぴよ'
        },
      ]
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
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
</style>
