<template>
  <v-container fluid ma-0 pa-0>
    <v-layout flex-child wrap>
      <v-flex grow>
        <v-toolbar color="red" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Profil</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card style="max-height: 400px" class="scroll-y">

          <v-container fluid>
            <v-layout>
              <v-flex xs5>
                <v-img
                  :src="profile.profilePicture"
                  height="54px"
                  contain
                ></v-img>
              </v-flex>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div>Nom: {{ profile.name }} Sexe: {{ profile.sexe }}</div>
                    <div>Argents: {{ profile.money }}</div>
                    <div>Pokémons : {{ profile.pokemons }}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-container fluid grid-list-sm>
                <v-layout row wrap>
                  <v-flex v-for="(badge, index) of profile.badges" :key="index" xs3>
                    <v-card flat tile>
                      <v-img
                        :src="badge.url"
                        height="50px"
                        contain
                      ></v-img>
                      <div>{{badge.name}}</div>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-actions>
          </v-container>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      profile: {}
    }
  },
  mounted () {
    this.getProfile()
    console.log('profile')
  },
  methods: {
    getProfile () {
      this.profile = {
        name: 'Red',
        profilePicture: 'https://www.pokepedia.fr/images/archive/f/fe/20101114200508%21Sprite_1_r_Red.png',
        money: 65000,
        sexe: '??',
        pokemons: 25,
        badges: [
          {
            name: 'Badge Roche',
            url: 'https://www.pokepedia.fr/images/6/65/Badge_Roche_Kanto.png',
            owned: true
          },
          {
            name: 'Badge Cascade',
            url: 'https://www.pokepedia.fr/images/5/50/Badge_Cascade_Kanto.png',
            owned: true
          },
          {
            name: 'Badge Foudre',
            url: 'https://www.pokepedia.fr/images/5/5c/Badge_Foudre_Kanto.png',
            owned: true
          },
          {
            name: 'Badge Prisme',
            url: 'https://www.pokepedia.fr/images/a/ac/Badge_Prisme_Kanto.png',
            owned: true
          },
          {
            name: 'Badge Âme',
            url: 'https://www.pokepedia.fr/images/1/14/Badge_%C3%82me_Kanto.png',
            owned: true
          },
          {
            name: 'Badge Marais',
            url: 'https://www.pokepedia.fr/images/8/83/Badge_Marais_Kanto.png',
            owned: true
          },
          {
            name: 'Badge Volcan',
            url: 'https://www.pokepedia.fr/images/c/c3/Badge_Volcan_Kanto.png',
            owned: true
          },
          {
            name: 'Badge Terre',
            url: 'https://www.pokepedia.fr/images/6/68/Badge_Terre_Kanto.png',
            owned: true
          }
        ]
      }
    }
  }
}
</script>
