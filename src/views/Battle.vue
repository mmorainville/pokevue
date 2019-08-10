<template>
  <div class="battle">
    <v-container fluid grid-list-xl v-if="battleStart">
      <v-layout justify-center flex-child wrap>
        <v-flex md8 class="battle-frame">
          <v-container fluid grid-list-xl>
            <v-layout flex-child wrap>
              <v-flex md12>
                top
              </v-flex>

              <v-flex md12>
                mid
              </v-flex>

              <v-flex md12>
                <Navigation
                :selected-pokemon-moves-datas="selectedPokemonMovesDatas"
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Navigation from '@/components/interface/battle/Navigation'

export default {
  name: 'Battle',
  components: { Navigation },
  data () {
    return {
      battleStart: true,
      pokemons: [],
      selectedPokemonMovesDatas: [
        {
          name: 'razor-wind',
          pp: 5
        },
        {
          name: 'mega-drain',
          pp: 9
        },
        {
          name: 'thunder',
          pp: 3
        },
        {
          name: 'flamethrower',
          pp: 12
        }
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
    .battle {
      background-color: transparent !important;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
    }

    .battle-frame {
      background-color: #FFF;
    }
</style>
