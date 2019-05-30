<template>
  <section class="container">
    <div v-if="isLoggedIn">
        <p>ようこそ{{ user.displayName }}</p>
    </div>
    <p v-else class="login" @click="googleLogin">ログイン</p>
    <h1>くそフォーム</h1>
    <div class="forms">
      <input type="text" v-model="newNote" class="form" @keyup.enter="saveNote" placeholder="ほげほげほげ" />
      <p class="sendButton" @click="saveNote">送る</p>
    </div>
      <h1>くそにっき</h1>
      <p v-if="isLoggedIn">{{ user.displayName }}のくそにっき</p>
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
      user: null,
    }
  },
  computed: {
    ...mapGetters({ notes: 'getNotes', isLoggedIn: 'getLoggedIn' })
  },
  mounted () {
    this.$store.dispatch('setNotesRef', db.collection('notes'))
    auth().onAuthStateChanged( (user) => {
      if (user) {
        this.$store.dispatch('successedLogin');
        this.user = user
      } else {
        this.$store.dispatch('failedLogin');
        this.user = null
      }
    })
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
      this.newNote = ''
      db.collection('notes').add(newNote)
    },
    googleLogin () {
      auth().signInWithRedirect(new auth.GoogleAuthProvider())
    },
    googleLogout () {
      auth().signOut().then( () => {
        this.isLoggedIn = false
        this.user = null
      }).catch( (error) => {
        console.log(error)
      })
    },
    changeLoginState () {
      this.$store.dispatch('changeState');
    }
  },
}
</script>

<style>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 100px 0;
}
.forms {
  display: flex;
  margin: 10px 0 30px;
}
.forms .form {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
}
.forms .sendButton {
  background-color: #ed6103;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-left: 10px;
}

.login {
  padding: 10px;
  background-color: #ffab00;
  border-radius: 4px;
  display: inline-flex;
}

</style>

