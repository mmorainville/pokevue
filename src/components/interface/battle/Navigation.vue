<template>
    <v-container pa-0>
        <v-layout>
        <v-flex md12>
            <v-container pa-0>
                <v-layout flex-child wrap v-if="movesLoaded">
                    <v-flex
                    class="battle-btn"
                    v-for="(move, index) in pokemonMoves"
                    :key="index"
                    md6>
                        <v-btn flat
                        :color="move.color[0]"
                        :class="{ loading: !(movesLoaded) }" @click="triggerMove(index)">
                          {{ move.name }}
                          <span>PP ({{ move.ppLeft }} / {{ move.pp }})</span>
                          <img :src="move.color[1]" :alt="move.color[2]">
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import FireIcn from '@/assets/types/full/Types-Fire.svg'

export default {
  name: 'Navigation',
  props: {
    opponentPokemon: String,
    playerPokemon: String,
    selectedPokemonMovesDatas: Array
  },
  data () {
    return {
      pokemonMoves: [],
      movesLoaded: false
    }
  },
  mounted () {
    this.getPokemonMoves().then((result) => {
      this.movesLoaded = true
      console.group('Moves')
      console.table(JSON.parse(JSON.stringify(this.pokemonMoves)))
      console.groupEnd()
    })
  },
  methods: {
    getPokemonMoves () {
      this.movesLoaded = false
      return new Promise(async resolve => {
        for (var index in this.selectedPokemonMovesDatas) {
          var moveApiUrl = 'https://pokeapi.co/api/v2/move/' + this.selectedPokemonMovesDatas[index].name
          var moveDatas = await this.setPokemonMoves(index, moveApiUrl, 'fr')
          this.pokemonMoves.push(moveDatas)
        }
        resolve(this.pokemonMoves)
      })
    },
    setPokemonMoves (index, moveApiUrl, lang) {
      let moveDatas
      return new Promise(resolve => {
        this.$http.get(moveApiUrl)
          .then(async res => {
            var name = res.data.names.filter(value => value.language.name.includes(lang))
            var description = res.data.flavor_text_entries.filter(value => value.language.name.includes(lang))
            var color = this.setColorFromType(res.data.type.name)
            var type = await this.externalData(res.data.type.url, 'names', lang, 'name')
            moveDatas = {
              name: name[0].name,
              type: type,
              color: color,
              description: description[0].flavor_text,
              power: res.data.power,
              pp: res.data.pp,
              ppLeft: this.selectedPokemonMovesDatas[index].pp,
              accuracy: res.data.accuracy,
              criticalHitRate: res.data.meta.crit_rate
            }
            resolve(moveDatas)
          })
      })
    },
    externalData (apiUrl, search, lang, langResult) {
      return new Promise(resolve => {
        this.$http.get(apiUrl)
          .then(res => {
            if (lang && langResult) {
              var result = res.data[search].filter(value => value.language.name.includes(lang))
              resolve(result[0][langResult])
            } else {
              resolve(res.data[search])
            }
          })
      })
    },
    setColorFromType (type) {
      switch (type) {
        case 'normal':
          return (['grey'])
        case 'grass':
          return (['green'])
        case 'electric':
          return (['yellow darken-2'])
        case 'fire':
          return (['red', FireIcn, type])
        case 'water':
          return (['blue'])
        default:
          return (['grey'])
      }
    },
    triggerMove (index) {
      for (var val in this.pokemonMoves) {
        if (parseInt(val) === index) {
          var ppNewValue = parseInt(this.pokemonMoves[val].ppLeft) - 1
          if (ppNewValue >= 0) {
            this.pokemonMoves[val].ppLeft = ppNewValue
          }
        }
      }
    }
  }
}
</script>

<style>
    .battle-btn.loading {
      opacity: 0;
    }
    .battle-btn > button {
      width: 100%;
      overflow: hidden;
    }
    .battle-btn > button > div {
      justify-content: flex-start;
      transition: 0.3s ease;
    }
    .battle-btn > button:hover > div {
      padding-left: 45px;
    }
    .battle-btn > button > div > span {
      margin-left: auto;
    }
    .battle-btn > button > div > img {
      position: absolute;
      left: 0px;
      bottom: -20px;
      z-index: 10;
      opacity: 0.0;
      transform: scale(2) translateX(-40px);
      transition: 0.3s ease;
    }
    .battle-btn > button:hover > div > img {
      opacity: 1;
      transform: scale(2) translateX(-12px);
    }

    div > .battle-btn:not(.loading) {
      animation: FadeIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation-fill-mode: both;
    }
    div > .battle-btn:not(.loading):nth-child(1) {
      animation-delay: 0.2s
    }
    div > .battle-btn:not(.loading):nth-child(2) {
      animation-delay: 0.4s
    }
    div > .battle-btn:not(.loading):nth-child(3) {
      animation-delay: 0.6s
    }
    div > .battle-btn:not(.loading):nth-child(4) {
      animation-delay: 0.8s
    }

    @keyframes FadeIn {
      0% {
        opacity: 0;
        transform: translateY(40px);
      }
      85% {
        opacity: 1;
      }
      100% {
        transform: translateY(0px);
      }
    }
</style>
