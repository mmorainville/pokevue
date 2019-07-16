<template>
  <v-container fluid grid-list-xl text-xs-center>
    <v-layout align-center row fill-height>
      <v-flex xs0 md6 offset-xs0 offset-md3>
        <v-card style>
          <v-layout align-center justify-center row fill-height>
            <v-container fluid id="scroll-target" style="max-height: 500px"
                         class="scroll-y">
              <v-layout row wrap style="height: 100%">
                <v-select
                  :items="inventory"
                  box
                  item-text="name"
                  item-value="items"
                  v-model="selected"
                ></v-select>
              </v-layout>
              <v-list two-line>
                <template v-for="(item, index) in selected">
                  <v-subheader
                    v-if="item.header"
                    :key="item.header"
                  >
                    {{ item.header }}
                  </v-subheader>

                  <v-divider
                    v-else-if="item.divider"
                    :key="index"
                    :inset="item.inset"
                  ></v-divider>

                  <v-list-tile
                    v-else
                    :key="item.title"
                    avatar
                  >
                    <v-list-tile-avatar>
                      <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.name ? item.name : item.type"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="item.quantity"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-container>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Inventory',
  data () {
    return {
      inventory: [],
      selected: {}
    }
  },
  mounted () {
    this.inventory = this.getInventory()
    this.selected = this.inventory[0].items
  },
  computed: mapState({
    pokeballs: state => state.player.pokeballs
  }),
  methods: {
    getInventory () {
      return [
        {
          name: 'Objects',
          items: [
            {
              name: 'Limonade',
              avatar: 'https://www.pokepedia.fr/images/5/55/Limonade-RV.png',
              quantity: 5,
              use: this.use('limonade')
            },
            {
              name: 'Super potion',
              quantity: 15,
              use: this.use('Super potion')
            }
          ]
        },
        {
          name: 'Pokeballs',
          items: this.pokeballs
        },
        {
          name: 'CT & CS',
          items: [
            {
              name: 'CT01',
              quantity: 1,
              use: this.use('USE CT JE SAIS PAS')
            }
          ]
        }
      ]
    },
    use (items) {
      console.log('i use smthing', items)
    },
    delete () {
      console.log('i delete smthg')
    }
  }
}
</script>
