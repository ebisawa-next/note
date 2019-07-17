<template>
  <div>
    <Hero />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '../plugins/firebase'

// components
import Hero from '@/components/molecules/blocks/Hero'
export default {
  data () {
    return {
      newNote: '',
    }
  },
  components: {
    Hero
  },
  computed: {
    ...mapGetters({
    }),
  },
  mounted () {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
</style>

