<template>
  <section class="container">
    <h1>くそフォーム</h1>
    <div class="forms">
      <input type="text" v-model="newNote" class="form" @keyup.enter="saveNote" placeholder="ほげほげほげ" />
      <p class="sendButton" @click="saveNote">送る</p>
    </div>
    <h1>くそにっき</h1>
    <ul>
      <li v-for="(note, index) in notes" :key="index">
        {{ note.content }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '../plugins/firebase'

export default {
  data () {
    return {
      newNote: '',
    }
  },
  computed: {
    ...mapGetters({ notes: 'getNotes' })
  },
  mounted () {
    this.$store.dispatch('setNotesRef', db.collection('notes'))
  },
  methods: {
    saveNote () {
      if (!this.newNote.length) {
        return
      }
      const newNote = { content: this.newNote }
      this.newNote = ''
      db.collection('notes').add(newNote);
      console.log('collected')
    },
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

</style>

