<template>
  <header class="header">
    <Logo color="white" />
    <ul class="header-links">
      <li class="header-links-link" v-for="(link, index) in links" :key="index">
        <a :href="link.url" class="header-links-text">{{ link.text }}</a>
      </li>
    </ul>
    <Function size="20" />
  </header>
</template>
x
<script>
import Logo from '@/components/atoms/icons/common/logo'
import Function from '@/components/atoms/icons/function'
export default {
  components: {
    Logo, Function
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
  padding: 15px 10px;
  background-color: map-get($color-service, accent);
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
