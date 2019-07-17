<template>
  <v-container fluid ma-0 pa-0>
    <v-layout flex-child wrap>
      <v-flex grow>
        <v-toolbar color="red" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Pokédex</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card style="max-height: 400px" class="scroll-y">
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex
                v-for="(pokemon, index) in pokemons"
                :key="index"
                xs6 md4 lg3 xl2
              >
                <v-card>
                  <v-img
                    :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`"
                    contain
                    aspect-ratio="1"
                    max-height="96"
                  ></v-img>

                  <v-card-title primary-title>
                    <div class="headline text-xs-center" style="text-transform: capitalize; width: 100%">{{ pokemon.name }}</div>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
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
