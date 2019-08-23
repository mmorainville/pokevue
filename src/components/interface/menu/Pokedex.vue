<template>
  <MenuWindow title="Pokédex" color="red">

    <v-container fluid grid-list-md>
      <v-layout wrap>
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

  </MenuWindow>
</template>

<script>
import MenuWindow from './MenuWindow'
export default {
  name: 'Pokedex',
  components: { MenuWindow },
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
      this.$router.push('pokemon/' + index)
    }
  }
}
</script>
