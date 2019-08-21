<template>
  <v-layout flex-child wrap v-if="movesLoaded">
    <v-flex md12 style="z-index: 0;">
      <Character
      component-type="opponent"
      :pokemon-id="opponentPokemonId"
      :total-hp="opponentTotalHpUpdate"
      :remaining-hp="opponentRemainingHpUpdate"
      />
    </v-flex>
    <v-flex md12 style="z-index: 0;">
      <Character
      component-type="player"
      :pokemon-id="playerPokemonsSelected + 1"
      :total-hp="playerTotalHpUpdate"
      :remaining-hp="playerRemainingHpUpdate"/>
    </v-flex>
    <v-flex md12 class="moves-buttons">
      <v-container pa-0>
        <v-layout>
          <v-flex md12>
            <v-container pa-0>
              <v-layout flex-child wrap>
                <v-flex
                class="battle-btn"
                :class="{ disabled: movesLaunched }"
                v-for="(move, index) in pokemonMoves"
                :key="index"
                md6>
                    <v-btn flat
                    :color="move.color[0]"
                    :class="[move.ppLeft === 0 ? 'disabled' : '', { loading: !(movesLoaded) }]"
                    @click="triggerMove($event, index)">
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
    </v-flex>
  </v-layout>
</template>

<script>
import Character from './Character'

import ElecIcn from '@/assets/types/full/Types-Electric.svg'
import FireIcn from '@/assets/types/full/Types-Fire.svg'
import GrassIcn from '@/assets/types/full/Types-Grass.svg'
import NormalIcn from '@/assets/types/full/Types-Normal.svg'

export default {
  name: 'Navigation',
  components: { Character },
  props: {
    opponentPokemons: Array,
    opponentTotalHp: Number,
    opponentRemainingHp: Number,
    playerPokemons: Array,
    playerTotalHp: Number,
    playerRemainingHp: Number,
    selectedPokemonMovesDatas: Array
  },
  data () {
    return {
      playerPokemonsList: [
        {
          pokemon: {
            id: 1,
            surname: 'Jean-Joslin'
          },
          stats: {
            level: 21,
            hp: 486,
            hpMax: 665,
            xp: 187,
            xpMax: 658,
            status: null
          },
          moveset: [
            {
              id: 1,
              pp: 9
            },
            {
              id: 50,
              pp: 9
            },
            {
              id: 110,
              pp: 9
            },
            {
              id: 22,
              pp: 2
            }
          ]
        },
        {
          pokemon: {
            id: 6,
            surname: 'Jean-Miguel'
          },
          stats: {
            level: 88,
            hp: 4860,
            hpMax: 6653,
            xp: 34765,
            xpMax: 65899,
            status: null
          },
          moveset: [
            {
              id: 5,
              pp: 9
            },
            {
              id: 33,
              pp: 2
            }
          ]
        }
      ],
      playerPokemonsSelected: 0,
      pokemonMoves: [],
      movesLoaded: false,
      movesLaunched: false,
      opponentRemainingHpUpdate: this.opponentRemainingHp,
      opponentTotalHpUpdate: this.opponentTotalHp,
      opponentPokemonId: 100,
      playerRemainingHpUpdate: this.playerRemainingHp,
      playerTotalHpUpdate: this.playerTotalHp,
      playerPokemonId: 3
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
        for (var index in this.playerPokemonsList[this.playerPokemonsSelected].moveset) {
          var moveApiUrl = 'https://pokeapi.co/api/v2/move/' + this.playerPokemonsList[this.playerPokemonsSelected].moveset[index].id /* this.selectedPokemonMovesDatas[index].name */
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
          return (['grey', NormalIcn, type])
        case 'grass':
          return (['green', GrassIcn, type])
        case 'electric':
          return (['yellow darken-2', ElecIcn, type])
        case 'fire':
          return (['red', FireIcn, type])
        case 'water':
          return (['blue'])
        default:
          return (['grey', NormalIcn, type])
      }
    },
    triggerMove (event, index) {
      this.movesLaunched = true
      for (var val in this.pokemonMoves) {
        if (parseInt(val) === index) {
          var ppNewValue = parseInt(this.pokemonMoves[val].ppLeft) - 1
          this.pokemonMoves[val].ppLeft = ppNewValue
          console.log('Pikatchu, attaque ' + this.pokemonMoves[val].name + ' !!!!!!!')
        }
      }
      // TODO: calculer les dégats, appliquer les dégats à l'ennemi

      // Fonction timout pour attendre la fin de l'annimation des dégats (1s)
      setTimeout(function () {
        // TODO: lancer l'attaque de l'ennemi ici
        this.movesLaunched = false // a retirer quand c'est fait, il doit être sur false quand l'attaque ennemi est terminée
      }.bind(this), 1000)
    }
  }
}
</script>

<style>
    .battle-btn {
      opacity: 1;
      transition: 0.5s ease;
    }
    .battle-btn.loading {
      opacity: 0;
      pointer-events: none;
    }
    .battle-btn.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
    .battle-btn > button {
      width: 100%;
      overflow: hidden;
    }
    .battle-btn > button.disabled {
      opacity: 0.3;
      pointer-events: none;
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

    .moves-buttons {
      background-color: rgba(255,255,255,0.9);
      z-index: 1;
      margin-top: 0px;
      box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
      backdrop-filter: blur(5px);
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
