<template>
  <v-container fluid grid-list-xl text-xs-center>
    <v-layout align-center row fill-height>
      <v-flex xs0 md6 offset-xs0 offset-md3>
        <v-card style>
          <v-layout align-center justify-center row fill-height>
            <v-container v-bind="{ [`grid-list-10`]: true }" fluid id="scroll-target" style="max-height: 500px"
                         class="scroll-y">
              <v-layout row wrap style="height: 100%">
                <v-flex v-for="(pokemon, index) in pokemons" :key="index" xs4>
                  <v-card flat tile>
                    <v-img
                      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`"
                      height="150px"
                      contain
                    ></v-img>
                    <div>{{pokemon.name}}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>
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
      pokemons: [],
      selectedPokemon: {}
    }
  },
  mounted () {
    this.getPokedex()
  },
  methods: {
    getPokedex () {
      this.$http.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(res => {
          this.pokemons = res.data.results
        })
    },
    goTo (index) {
      this.$router.push('pokemondetail/' + index)
    }
  }
}
</script>

<style>
  .list-pokemon {
    height: 300px;
    overflow-y: auto;
  }
</style>
