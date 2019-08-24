<template>
  <div class="battle">
    <v-container fluid grid-list-xl v-if="battleStart">
      <v-layout justify-center flex-child wrap>
        <v-flex md8 class="battle-frame">
          <div class="battle-frame-bg" :style="{ backgroundImage: 'url(' + background + ')' }"></div>
          <v-container fluid grid-list-xl>
            <Navigation/>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import GrassBg from '@/assets/battlebg/grass-line.jpg'

import Navigation from '@/components/interface/battle'

export default {
  name: 'Battle',
  components: { Navigation },
  data () {
    return {
      battleStart: true,
      background: GrassBg
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
    }

    .battle-frame-bg {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      background-size: contain;
      background-position: center;
      background-repeat: repeat;
      image-rendering: optimizeSpeed;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: pixelated;
      image-rendering: optimize-contrast;
      -ms-interpolation-mode: nearest-neighbor;
    }
</style>
