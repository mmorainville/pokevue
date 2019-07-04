<template>
  <v-container fluid grid-list-xl text-xs-center>
    <v-layout align-center justify-center row fill-height>
      <v-flex >
        <v-card style="" >
          <v-layout align-center justify-center row fill-height>

            <v-navigation-drawer disable-resize-watcher="true">
              <v-toolbar flat>
                <v-list>
                  <v-list-tile class="red">
                    <v-list-tile-title class="title">
                      Pokedex
                    </v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-toolbar>
              <v-divider></v-divider>
              <v-list dense class="pt-0">
                <v-list-tile
                  v-for="(pokemon, index) in pokemons" :key="index"
                >
                  <v-list-tile-title @click="selectedPokemon = pokemon">{{ pokemon.name }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-navigation-drawer>

            <v-flex md10>
              <v-layout>
                <v-flex xs5>
                  <v-img
                    :src="selectedPokemon.image"
                    height="125px"
                    contain
                  ></v-img>
                </v-flex>
                <v-flex xs7>
                  <div primary-title>
                    <div>
                      <div class="headline">{{ selectedPokemon.name }}</div>
                      <div>{{ selectedPokemon.type }}</div>
                      <div>n° {{ selectedPokemon.index }}</div>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <div class="pa-3">
                {{ selectedPokemon.description }}
              </div>
            </v-flex>
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
    this.pokemons = this.getPokedex()
    this.selectedPokemon = this.pokemons[0]
  },
  methods: {
    getPokedex: () => {
      return [
        {
          index: 112,
          name: 'Rhinoféros',
          type: 'sol - roche',
          image: 'https://www.pokepedia.fr/images/8/80/Rhinof%C3%A9ros-RFVF.png',
          description: 'La corne de Rhinoféros peut même casser du diamant brut. Et avec un simple coup de queue, il peut détruire un bâtiment. La peau de ce Pokémon est incroyablement dure. Un boulet de canon ne lui ferait même pas une égratignure.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        },
        {
          index: 1,
          name: 'Bulbizarre',
          type: 'plante - poison',
          image: 'https://www.pokepedia.fr/images/e/ef/Bulbizarre-RFVF.png',
          description: 'Bulbizarre passe son temps à faire la sieste sous le soleil. Il y a une graine sur son dos. Il absorbe les rayons du soleil pour faire doucement pousser la graine.'
        }
      ]
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
