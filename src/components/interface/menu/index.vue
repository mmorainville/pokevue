<template>
  <v-container style="position: absolute" fluid grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs2 offset-xs10>
            <v-card>
              <v-list>
                <v-list-tile
                    v-for="(item, index) in menus"
                    :key="index"
                    @click=""
                  >
                  <v-list-tile-title>{{ item }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menus: ['Pokémon', 'Sac', 'Profile', 'Save'],
      dialog: true,
      selected: 0
    }
  },
  mounted () {
    console.log('im here')
  }
}
</script>

<style>
  .selected {
    border-bottom: 1px #2196F3 solid;
  }
</style>
