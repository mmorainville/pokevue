<template>
  <v-bottom-sheet
    v-model="isVisible"
    :hide-overlay="true"
    :inset="true"
    :persistent="true"
  >
    <!--<v-list>
      <v-subheader>Prof. Chen</v-subheader>
    </v-list>-->
    <v-list>
      <v-subheader>Prof. Chen</v-subheader>
      <v-list-tile avatar>
        <v-list-tile-content>
            Hello, there! Glad to meet you! Welcome to the world of Pokémon!
            My name is Oak. People affectionately refer to me as the Pokémon Professor. This world…
            …is inhabited far and wide by creatures called Pokémon!
            For some people, Pokémon are pets. Other use them for battling. As for myself…
            I study Pokémon as a profession. But first, tell me a little about yourself.
            Now tell me. Are you a boy? Or are you a girl?
            Let's begin with your name. What is it? Right…
            So your name is Red.
            This is my grandson.
            He's been your rival since you both were babies.
            …Erm, what was his name now? …Er, was it Blue?
            That's right! I remember now! His name is Blue!
            Red! Your own very Pokémon legend is about to unfold!
            A world of dreams and adventures with Pokémon awaits!
            Let's go!
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon color="grey lighten-1">play_arrow</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'DialogBox',
  data () {
    return {
      isVisible: false
    }
  },
  created () {
    this.$appBus.$on('dialog:open', () => {
      // console.log('Open dialog', this.isVisible)
      this.isVisible = true
    })

    this.$appBus.$on('dialog:close', () => {
      // console.log('Close dialog')
      this.isVisible = false
    })
  }
}
</script>

<style scoped>

</style>
