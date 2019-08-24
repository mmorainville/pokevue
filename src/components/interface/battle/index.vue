<template>
  <v-row flex-child wrap>
    <v-col md="12" style="z-index: 0;">
      <Character
      component-type="opponent"
      :pokemon-index="opponentPokemonsSelected"
      :remaining-hp="opponentPokemonHp"
      :total-hp="opponentPokemonHpMax"
      :remaining-xp="opponentPokemonXp"
      :total-xp="opponentPokemonXpMax"
      :pokemon-nb="opponentPokemonNb"
      :pokemon-ko="opponentPokemonKo"
      :pokemon-surname="opponentPokemonSurname"
      :pokemon-level="opponentPokemonLevel"
      />
    </v-col>
    <v-spacer></v-spacer>
    <v-col md="12" style="z-index: 0;">
      <Character
      component-type="player"
      :pokemon-index="playerPokemonsSelected"
      :remaining-hp="playerPokemonHp"
      :total-hp="playerPokemonHpMax"
      :remaining-xp="playerPokemonXp"
      :total-xp="playerPokemonXpMax"
      :pokemon-nb="playerPokemonNb"
      :pokemon-ko="playerPokemonKo"
      :pokemon-surname="playerPokemonSurname"
      :pokemon-level="playerPokemonLevel"
      />
    </v-col>
    <v-col md="12" class="moves-buttons" :class="{ loading: !(movesLoaded) }">
      <v-container pa-0>
        <v-row>
          <v-col md="12">
            <v-container pa-0>
              <v-row class="battle-btn-layout">
                <v-col
                class="battle-btn"
                :class="{ disabled: movesLaunched }"
                v-for="(move, index) in playerPokemonMoves"
                :key="index"
                md="6">
                    <v-btn text
                    :color="move.color[0]"
                    :class="[move.ppLeft === 0 ? 'disabled' : '', { loading: !(movesLoaded) }]"
                    @click="triggerMove($event, index)">
                      {{ move.name }}
                      <span>PP ({{ move.ppLeft }} / {{ move.pp }})</span>
                      <img :src="move.color[1]" :alt="move.color[2]">
                    </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import Character from './Character'

import BugIcn from '@/assets/types/pogo/ico_6_bug.png'
import DarkIcn from '@/assets/types/pogo/ico_16_dark.png'
import DragonIcn from '@/assets/types/pogo/ico_15_dragon.png'
import ElecIcn from '@/assets/types/pogo/ico_12_electric.png'
import FairyIcn from '@/assets/types/pogo/ico_17_fairy.png'
import FightIcn from '@/assets/types/pogo/ico_1_fighting.png'
import FireIcn from '@/assets/types/pogo/ico_9_fire.png'
import FlyIcn from '@/assets/types/pogo/ico_2_flying.png'
import GhostIcn from '@/assets/types/pogo/ico_7_ghost.png'
import GrassIcn from '@/assets/types/pogo/ico_11_grass.png'
import GroundIcn from '@/assets/types/pogo/ico_4_ground.png'
import IceIcn from '@/assets/types/pogo/ico_14_ice.png'
import NormalIcn from '@/assets/types/pogo/ico_0_normal.png'
import PoisonIcn from '@/assets/types/pogo/ico_3_poison.png'
import PsyIcn from '@/assets/types/pogo/ico_13_psychic.png'
import RockIcn from '@/assets/types/pogo/ico_5_rock.png'
import SteelIcn from '@/assets/types/pogo/ico_8_steel.png'
import WaterIcn from '@/assets/types/pogo/ico_10_water.png'

export default {
  name: 'Navigation',
  components: { Character },
  data () {
    return {
      movesLoaded: false,
      movesLaunched: false,
      playerPokemonsList: [
        {
          pokemon: {
            id: 1,
            surname: 'Jean-Joslin'
          },
          stats: {
            level: 21,
            hp: 586,
            hpMax: 665,
            xp: 187,
            xpMax: 658,
            status: null
          },
          moveset: [
            {
              id: 56,
              pp: 2
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
            surname: ''
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
        },
        {
          pokemon: {
            id: 6,
            surname: 'Jean-Ko'
          },
          stats: {
            level: 10,
            hp: 0,
            hpMax: 113,
            xp: 335,
            xpMax: 449,
            status: null
          },
          moveset: [
            {
              id: 88,
              pp: 9
            },
            {
              id: 99,
              pp: 2
            }
          ]
        }
      ],
      playerPokemonMoves: [],
      playerPokemonsSelected: 0,
      playerPokemonHp: null,
      playerPokemonHpMax: null,
      playerPokemonXp: null,
      playerPokemonXpMax: null,
      playerPokemonNb: null,
      playerPokemonKo: null,
      playerPokemonSurname: null,
      playerPokemonLevel: null,
      opponentPokemonsList: [
        {
          pokemon: {
            id: 45,
            surname: 'Ronald'
          },
          stats: {
            level: 65,
            hp: 1286,
            hpMax: 1665,
            xp: 1187,
            xpMax: 1658,
            status: null
          },
          moveset: [
            {
              id: 70,
              pp: 5
            },
            {
              id: 45,
              pp: 5
            },
            {
              id: 33,
              pp: 4
            },
            {
              id: 48,
              pp: 5
            }
          ]
        },
        {
          pokemon: {
            id: 77,
            surname: 'Roger'
          },
          stats: {
            level: 11,
            hp: 460,
            hpMax: 653,
            xp: 365,
            xpMax: 699,
            status: null
          },
          moveset: [
            {
              id: 77,
              pp: 2
            },
            {
              id: 88,
              pp: 5
            }
          ]
        }
      ],
      opponentPokemonMoves: [],
      opponentPokemonsSelected: 0,
      opponentPokemonHp: null,
      opponentPokemonHpMax: null,
      opponentPokemonXp: null,
      opponentPokemonXpMax: null,
      opponentPokemonNb: null,
      opponentPokemonKo: null,
      opponentPokemonSurname: null,
      opponentPokemonLevel: null,
      localPlayerPokemonsList: null,
      localOpponentPokemonsList: null
    }
  },
  created () {
    // Setup pokemon list
    if (!(localStorage.playerPokemonsList)) {
      localStorage.playerPokemonsList = (JSON.stringify(this.playerPokemonsList))
    }
    localStorage.opponentPokemonsList = (JSON.stringify(this.opponentPokemonsList))

    this.localPlayerPokemonsList = (JSON.parse(localStorage.playerPokemonsList))
    this.localOpponentPokemonsList = (JSON.parse(localStorage.opponentPokemonsList))

    // Setup Number of pokemons
    this.playerPokemonNb = this.localPlayerPokemonsList.length
    this.playerPokemonKo = this.localPlayerPokemonsList.filter(value => value.stats.hp <= 0).length
    this.opponentPokemonNb = this.localOpponentPokemonsList.length
    this.opponentPokemonKo = this.localOpponentPokemonsList.filter(value => value.stats.hp <= 0).length

    // Setup selected pokemons surnames
    this.playerPokemonSurname = this.localPlayerPokemonsList[this.playerPokemonsSelected].pokemon.surname
    this.opponentPokemonSurname = this.localOpponentPokemonsList[this.opponentPokemonsSelected].pokemon.surname

    // Setup selected pokemons level
    this.playerPokemonLevel = this.localPlayerPokemonsList[this.playerPokemonsSelected].stats.level
    this.opponentPokemonLevel = this.localOpponentPokemonsList[this.opponentPokemonsSelected].stats.level

    // Setup selected pokemons Hp
    this.playerPokemonHpMax = this.localPlayerPokemonsList[this.playerPokemonsSelected].stats.hpMax
    this.playerPokemonHp = this.localPlayerPokemonsList[this.playerPokemonsSelected].stats.hp
    this.opponentPokemonHpMax = this.localOpponentPokemonsList[this.opponentPokemonsSelected].stats.hpMax
    this.opponentPokemonHp = this.localOpponentPokemonsList[this.opponentPokemonsSelected].stats.hp

    // Setup selected pokemons Xp
    this.playerPokemonXpMax = this.localPlayerPokemonsList[this.playerPokemonsSelected].stats.xpMax
    this.playerPokemonXp = this.localPlayerPokemonsList[this.playerPokemonsSelected].stats.xp
    this.opponentPokemonXpMax = this.localOpponentPokemonsList[this.opponentPokemonsSelected].stats.xpMax
    this.opponentPokemonXp = this.localOpponentPokemonsList[this.opponentPokemonsSelected].stats.xp
  },
  mounted () {
    this.getPokemonMoves(this.localPlayerPokemonsList, this.playerPokemonsSelected).then((moves) => {
      this.movesLoaded = true
      this.playerPokemonMoves = moves
      console.group('Player moves')
      console.table(JSON.parse(JSON.stringify(moves)))
      console.groupEnd()
    })
    this.getPokemonMoves(this.localOpponentPokemonsList, this.opponentPokemonsSelected).then((moves) => {
      this.opponentPokemonMoves = moves
      console.group('Opponent moves')
      console.table(JSON.parse(JSON.stringify(moves)))
      console.groupEnd()
    })
  },
  watch: {
    playerPokemonsSelected (pkmnSelected) {
      this.movesLoaded = false
      this.playerPokemonMoves = []
      const json = this.localPlayerPokemonsList
      this.getPokemonMoves(json, pkmnSelected).then((moves) => {
        this.movesLoaded = true
        this.playerPokemonMoves = moves
        console.group('Player moves')
        console.table(JSON.parse(JSON.stringify(moves)))
        console.groupEnd()
      })
      this.playerPokemonHpMax = json[pkmnSelected].stats.hpMax
      this.playerPokemonHp = json[pkmnSelected].stats.hp
      this.playerPokemonXpMax = json[pkmnSelected].stats.xpMax
      this.playerPokemonXp = json[pkmnSelected].stats.xp
      this.playerPokemonSurname = json[pkmnSelected].pokemon.surname
      this.playerPokemonLevel = json[pkmnSelected].stats.level
    },
    opponentPokemonsSelected (pkmnSelected) {
      const json = this.localOpponentPokemonsList
      this.getPokemonMoves(json, pkmnSelected).then((moves) => {
        this.opponentPokemonMoves = moves
        console.group('Opponent moves')
        console.table(JSON.parse(JSON.stringify(moves)))
        console.groupEnd()
      })
      this.opponentPokemonHpMax = json[pkmnSelected].stats.hpMax
      this.opponentPokemonHp = json[pkmnSelected].stats.hp
      this.opponentPokemonXpMax = json[pkmnSelected].stats.xpMax
      this.opponentPokemonXp = json[pkmnSelected].stats.xp
      this.opponentPokemonSurname = json[pkmnSelected].pokemon.surname
      this.opponentPokemonLevel = json[pkmnSelected].stats.level
    }
  },
  methods: {
    getPokemonMoves (pkmnList, pkmnSelected) {
      return new Promise(async resolve => {
        var movesTemp = []
        for (var index in pkmnList[pkmnSelected].moveset) {
          var moveApiUrl = 'https://pokeapi.co/api/v2/move/' + pkmnList[pkmnSelected].moveset[index].id
          var moveDatas = await this.setPokemonMoves(index, moveApiUrl, pkmnList, pkmnSelected, 'fr')
          movesTemp.push(moveDatas)
        }
        resolve(movesTemp)
      })
    },
    setPokemonMoves (index, moveApiUrl, pkmnList, pkmnSelected, lang) {
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
              ppLeft: pkmnList[pkmnSelected].moveset[index].pp,
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
        case 'bug':
          return (['lime accent-4', BugIcn, type])
        case 'dragon':
          return (['light-blue darken-3', DragonIcn, type])
        case 'dark':
          return (['blue-grey darken-4', DarkIcn, type])
        case 'electric':
          return (['yellow darken-2', ElecIcn, type])
        case 'fairy':
          return (['purple accent-1', FairyIcn, type])
        case 'fighting':
          return (['red', FightIcn, type])
        case 'fire':
          return (['orange lighten-1', FireIcn, type])
        case 'flying':
          return (['light-blue lighten-4', FlyIcn, type])
        case 'ghost':
          return (['indigo lighten-1', GhostIcn, type])
        case 'grass':
          return (['green', GrassIcn, type])
        case 'ground':
          return (['deep-orange darken-4', GroundIcn, type])
        case 'ice':
          return (['cyan lighten-4', IceIcn, type])
        case 'normal':
          return (['grey', NormalIcn, type])
        case 'poison':
          return (['purple darken-1', PoisonIcn, type])
        case 'psychic':
          return (['red lighten-1', PsyIcn, type])
        case 'rock':
          return (['amber accent-1', RockIcn, type])
        case 'steel':
          return (['teal lighten-1', SteelIcn, type])
        case 'water':
          return (['light-blue darken-1', WaterIcn, type])
        default:
          return (['grey', NormalIcn, type])
      }
    },
    triggerMove (event, index) {
      this.movesLaunched = true
      for (var val in this.playerPokemonMoves) {
        if (parseInt(val) === index) {
          var ppNewValue = parseInt(this.playerPokemonMoves[val].ppLeft) - 1
          var pkmnList = this.localPlayerPokemonsList
          this.playerPokemonMoves[val].ppLeft = ppNewValue
          pkmnList[this.playerPokemonsSelected].moveset[index].pp = ppNewValue
          localStorage.playerPokemonsList = (JSON.stringify(pkmnList))
          console.log('Pikatchu, attaque ' + this.playerPokemonMoves[val].name + ' !!!!!!!')
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
    .battle-btn-layout {
      min-height: 144px;
    }
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
    .battle-btn > button > span {
      justify-content: flex-start;
      transition: 0.3s ease;
    }
    .battle-btn > button:hover > span {
      padding-left: 45px;
    }
    .battle-btn > button > span > span {
      margin-left: auto;
    }
    .battle-btn > button > span > img {
      position: absolute;
      left: 0px;
      z-index: 10;
      opacity: 0.0;
      transform: scale(0.9) translateX(-80px);
      transition: 0.3s ease;
    }
    .battle-btn > button:hover > span > img {
      opacity: 1;
      transform: scale(0.9) translateX(-30px);
    }

    .battle-btn-layout > .battle-btn:not(.loading) {
      animation: FadeIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      animation-fill-mode: both;
    }
    .battle-btn-layout > .battle-btn:not(.loading):nth-child(1) {
      animation-delay: 0.2s
    }
    .battle-btn-layout > .battle-btn:not(.loading):nth-child(2) {
      animation-delay: 0.4s
    }
    .battle-btn-layout > .battle-btn:not(.loading):nth-child(3) {
      animation-delay: 0.6s
    }
    .battle-btn-layout > .battle-btn:not(.loading):nth-child(4) {
      animation-delay: 0.8s
    }

    .moves-buttons {
      background-color: rgba(255,255,255,0.95);
      z-index: 1;
      margin-top: 0px;
      box-shadow: 0px 0px 20px rgba(0,0,0,0.1);
      backdrop-filter: blur(5px);
      opacity: 1;
      transition: 0.2s ease;
    }
    .moves-buttons.loading {
      opacity: 1;
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
