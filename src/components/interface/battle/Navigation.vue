<template>
    <v-container pa-0>
        <v-layout>
        <v-flex md8>
            <v-container pa-0>
                <v-layout flex-child wrap v-if="movesLoaded">
                    <v-flex
                    class="battle-btn"
                    v-for="(move, index) in pokemonMoves"
                    :key="index"
                    md6>
                        <v-btn flat :color="move.color" :class="{ loading: !(movesLoaded) }" @click="removePp(index)">
                          {{ move.name }}
                          <span>PP ({{ move.ppLeft }} / {{ move.pp }})</span>
                        </v-btn>
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
      return new Promise(resolve => {
        this.$http.get('https://pokeapi.co/api/v2/move?limit=746')
          .then(async res => {
            for (var resultName in res.data.results) {
              if (this.selectedPokemonMovesDatas.some(item => item.name === res.data.results[resultName].name)) {
                var localIndex = this.selectedPokemonMovesDatas.map(function (e) { return e.name }).indexOf(res.data.results[resultName].name)
                var moveDatas = await this.setPokemonMoves(res.data.results[resultName].url, localIndex, 'fr')
                this.pokemonMoves.push(moveDatas)
              }
            }
            this.pokemonMoves.sort(function (a, b) {
              var x = a['localIndex']
              var y = b['localIndex']
              return ((x < y) ? -1 : ((x > y) ? 1 : 0))
            })
            resolve(this.pokemonMoves)
          })
      })
    },
    setPokemonMoves (moveApiUrl, localIndex, lang) {
      let moveDatas
      return new Promise(resolve => {
        this.$http.get(moveApiUrl)
          .then(async res => {
            var name = res.data.names.filter(value => value.language.name.includes(lang))
            var description = res.data.flavor_text_entries.filter(value => value.language.name.includes(lang))
            var color = this.setColorFromType(res.data.type.name)
            var type = await this.externalData(res.data.type.url, 'names', lang, 'name')
            moveDatas = {
              localIndex: localIndex,
              name: name[0].name,
              type: type,
              color: color,
              description: description[0].flavor_text,
              power: res.data.power,
              pp: res.data.pp,
              ppLeft: this.selectedPokemonMovesDatas[localIndex].pp,
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
      if (type === 'normal') {
        return ('grey')
      } else if (type === 'grass') {
        return ('green')
      } else if (type === 'electric') {
        return ('yellow darken-2')
      } else if (type === 'fire') {
        return ('red')
      } else if (type === 'water') {
        return ('blue')
      } else {
        return ('grey')
      }
    },
    removePp (index) {
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
    }
    .battle-btn > button > div {
      position: relative;
      justify-content: flex-start;
    }
    .battle-btn > button > div > span {
      margin-left: auto;
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
