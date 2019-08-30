<template>
  <div class="index">
    <Hero />
    <section class="index-contents">
      <Heading heading="Users" icon="fa-user-alt" />
      <Userlist />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '../plugins/firebase'

// components
import Hero from '@/components/molecules/blocks/Hero'
import Userlist from '@/components/organisms/index/userlist'
import Heading from '@/components/atoms/headings/iconHeading'
export default {
  data () {
    return {
      newNote: '',
    }
  },
  components: {
    Hero, Userlist, Heading
  },
  computed: {
    ...mapGetters({
    }),
  },
  mounted () {
    this.$store.dispatch('storeUserdatas')
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.index {
  &-contents {
    width: 85%;
    margin: 0 auto;
    padding: 50px 0;
    @include mq(tbAndSp) {
      width: 100%;
      padding: 15px 10px;
      box-sizing: border-box;
    }
  }
}
</style>

