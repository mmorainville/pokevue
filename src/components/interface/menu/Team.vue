<template>
  <MenuWindow title="Équipe" color="red">

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="(pokemon, index) in pokeTeam" :key="index" xs6 md4 lg3 xl2>
          <v-card>
            <v-img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon.index + 1}.png`"
              contain
              aspect-ratio="1"
              max-height="96"
            ></v-img>

            <v-card-title primary-title>
              <div
                class="headline text-xs-center"
                style="text-transform: capitalize; width: 100%"
              >{{ pokemon.pokemon.name }}
              </div>
            </v-card-title>
            <v-divider light></v-divider>
            <v-card-text>
              <div>Niveau : {{ pokemon.stat.level }}</div>
              <v-progress-linear
                background-color="error"
                color="success"
                :value="(pokemon.stat.lp / pokemon.stat.lpMax * 100)"
              ></v-progress-linear>
              <div v-if="pokemon.stat.status">
                {{pokemon.stat.status.effect}}
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </MenuWindow>
</template>

<script>
import MenuWindow from './MenuWindow'

export default {
  name: 'Team',
  components: { MenuWindow },
  data () {
    return {
      pokeTeam: []
    }
  },
  mounted () {
    this.getTeam()
  },
  methods: {
    getTeam () {
      this.pokeTeam = [
        {
          pokemon: {
            index: 5,
            name: 'josé'
          },
          stat: {
            level: 21,
            lp: 50,
            lpMax: 50,
            status: null
          }
        },
        {
          pokemon: {
            index: 12,
            name: 'Mathieu'
          },
          stat: {
            level: 21,
            lp: 25,
            lpMax: 50,
            status: {
              effect: 'brulé',
              icon: ''
            }
          }
        }
      ]
    },
    goTo (index) {
      this.$router.push('pokemon/' + index)
    }
  }
}
</script>
