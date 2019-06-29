<template>
  <v-container fluid grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs2 offset-xs10>
        <v-card>
          <v-list>
            <v-list-tile v-for="(pokemon, index) in pokemons" :key="index">
              <v-list-tile-title>{{ pokemon.name }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Pokedex',
  data () {
    return {
      pokemons: []
    }
  },
  mounted () {
    this.pokemons = this.getPokedex()
  },
  methods: {
    getPokedex: () => {
      return [
        {
          name: 'Rhinoféros',
          type: 'sol - roche'
        }
      ]
    }
  }
}
</script>
