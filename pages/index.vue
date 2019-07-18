<template>
  <div>
    <Hero />
    <Userlist />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '../plugins/firebase'

// components
import Hero from '@/components/molecules/blocks/Hero'
import Userlist from '@/components/organisms/index/userlist'
export default {
  data () {
    return {
      newNote: '',
    }
  },
  components: {
    Hero, Userlist
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
</style>

