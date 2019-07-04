<template>
  <div>
    <Header />
    <Hero />
    <section class="container">  
      <div v-if="isSignedIn">
          <p>ようこそ{{ userdata.name }}</p>
          <nuxt-link to="/mypage">マイページに行こう</nuxt-link>
      </div>
      <p v-else class="login" @click="googleSignIn">ログイン</p>
      <h1>くそフォーム</h1>
      <div class="forms">
        <input type="text" v-model="newNote" class="form" @keyup.enter="saveNote" placeholder="ほげほげほげ" />
        <p class="sendButton" @click="saveNote">送る</p>
      </div>
        <h1>くそにっき</h1>
        <p v-if="isSignedIn">{{ userdata.name }}のくそにっき</p>
        <p v-else>名無し</p>
        <ul>
          <li v-for="(note, index) in notes" :key="index">
            {{ note.content }}
          </li>
        </ul>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '../plugins/firebase'

import Header from '@/components/organisms/common/header'
import Hero from '@/components/molecules/blocks/Hero'
export default {
  data () {
    return {
      newNote: '',
    }
  },
  components: {
    Header, Hero
  },
  computed: {
    ...mapGetters({
      notes: 'getNotes',
      isSignedIn: 'users/getSignStatus',
      userdata: 'users/getUserdata'
    }),
  },
  mounted () {
    this.$store.dispatch('setNotesRef', db.collection('notes'))
    this.$store.dispatch('users/googleAuthStateChanged');
  },
  methods: {
    saveNote () {
      if (!this.newNote.length) {
        return
      }
      const newNote = {
        content: this.newNote,
        name: this.user ? this.user.displayName : 'Anonymous'
      }
      this.$store.dispatch('saveNote', newNote);
      this.newNote = ''
    },
    googleSignIn () {
      this.$store.dispatch('users/googleSignIn');
    },
    googleSignOut () {
      this.$store.dispatch('users/googleSignOut');
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
    width: 80%;
    margin: 0 auto;
    padding: 50px 0;
}

.forms {
    display: flex;
    margin: 10px 0 30px;

    .form {
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #d8d8d8;
    }

    .sendButton {
        background-color: #ed6103;
        color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-left: 10px;
    }
}

.login {
    padding: 10px;
    background-color: #ffab00;
    border-radius: 4px;
    display: inline-flex;
}


</style>

