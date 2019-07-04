<template>
    <footer class="footer">
        <p>(c)ebi</p>
    </footer>
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
.footer {
    background-color: #f5f5f5;
    padding: 50px 10px;
    text-align: center;
    p {
        color: #a5a5a5;
        font-size: 1.2rem;
    }
}
</style>
