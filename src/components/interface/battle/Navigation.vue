<template>
    <v-container pa-0>
        <v-layout>
        <v-flex md8>
            <v-container pa-0>
                <v-layout flex-child wrap>
                    <v-flex md6>
                        <v-btn flat color="red" class="battle-btn">Lance flamme</v-btn>
                    </v-flex>
                        <v-flex md6>
                    <v-btn flat color="green" class="battle-btn">Vampigraine</v-btn>
                        </v-flex>
                    <v-flex md6>
                        <v-btn flat color="blue" class="battle-btn">Surf</v-btn>
                    </v-flex>
                    <v-flex md6>
                        <v-btn flat color="yellow" class="battle-btn">Fatal foudre</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        <v-divider vertical></v-divider>
        <v-flex md4>
            <v-container pa-0>
                <v-layout flex-child wrap>
                    <v-flex md12>
                        TEST
                    </v-flex>
                    <v-flex md12>
                        TEST
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
    return {
      selectedPokemonMoves: ['razor-wind', 'mega-drain'],
      pokemonMoves: {}
    }
  },
  mounted () {
    this.getPokemonMoves()
  },
  methods: {
    getPokemonMoves () {
      this.$http.get('https://pokeapi.co/api/v2/move?limit=746')
        .then(res => {
          for (var item in res.data.results) {
            if (this.selectedPokemonMoves.includes(res.data.results[item].name)) {
              this.setPokemonMoves(res.data.results[item].url)
            }
          }
        })
    },
    setPokemonMoves (url) {
      this.$http.get(url)
        .then(res => {
          console.log(res.data)
          for (var moveName in res.data.names) {
            if (res.data.names[moveName].language.name === 'fr') {
              var name = res.data.names[moveName].name
              console.log(name)
            }
          }
          for (var moveDescription in res.data.flavor_text_entries) {
            if (res.data.flavor_text_entries[moveDescription].language.name === 'fr') {
              var description = res.data.flavor_text_entries[moveDescription].flavor_text
              console.log(description)
              break
            }
          }
        })
    }
  }
}
</script>

<style>
    .battle-btn {
      width: 100%;
    }
    .battle-btn > div {
      justify-content: flex-start;
    }
</style>
