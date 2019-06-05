<template>
  <section class="container">
    <h1 class="heading">変数テスト</h1>
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
</template>

<script>
import { mapGetters } from 'vuex'
import { db, auth } from '../plugins/firebase'
export default {
  data () {
    return {
      newNote: '',
    }
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
.heading {
  color: $orange;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 10px;
}
.container {
    width: 1000px;
    margin: 0 auto;
    padding: 100px 0;
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

