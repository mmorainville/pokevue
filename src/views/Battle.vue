<template>
  <div class="battle">
    <v-container fluid grid-list-xl v-if="battleStart">
      <v-layout justify-center flex-child wrap>
        <v-flex md8 class="battle-frame">
          <div class="battle-frame-bg-backdrop" :style="{ backgroundImage: 'url(' + background + ')' }"></div>
          <div class="battle-frame-bg" :style="{ backgroundImage: 'url(' + background + ')' }"></div>
          <v-container fluid grid-list-xl>
            <Navigation
            :selected-pokemon-moves-datas="selectedPokemonMovesDatas"
            :opponent-total-hp="opponentTotalHp"
            :opponent-remaining-hp="opponentRemainingHp"
            :player-total-hp="playerTotalHp"
            :player-remaining-hp="playerRemainingHp"
            />
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import GrassBg from '@/assets/battlebg/grass.jpg'

import Navigation from '@/components/interface/battle'

export default {
  name: 'Battle',
  components: { Navigation },
  data () {
    return {
      opponentTotalHp: 668,
      opponentRemainingHp: 300,
      playerTotalHp: 884,
      playerRemainingHp: 572,
      battleStart: true,
      background: GrassBg,
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
      background-color: #d2ffc4;
      position: relative;
      overflow: hidden;
      min-height: 558px;
      /*background-image: url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffa643' fill-opacity='0.23'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      background-repeat: repeat;*/
    }

    .battle-frame-bg {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 168px;
      background-size: contain;
      background-position: center;
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: pixelated;
      image-rendering: optimize-contrast;
      -ms-interpolation-mode: nearest-neighbor;
    }
    .battle-frame-bg-backdrop {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      background-size: cover;
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: pixelated;
      image-rendering: optimize-contrast;
      -ms-interpolation-mode: nearest-neighbor;
      filter: blur(10px);
      margin: -20px;
    }
</style>
