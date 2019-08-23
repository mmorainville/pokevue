<template>
  <MenuWindow title="Sac" color="indigo">

    <v-container fluid>
      <v-layout wrap d-flex>
        <v-select
          :items="inventory"
          filled
          item-text="name"
          item-value="items"
          v-model="selected"
          label="Type d'objets"
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

          <v-list-item
            v-else
            :key="item.title"
          >
            <v-list-item-avatar>
              <img :src="item.avatar">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.name ? item.name : item.type"></v-list-item-title>
              <v-list-item-subtitle v-html="item.quantity"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-container>

  </MenuWindow>
</template>

<script>
import { mapState } from 'vuex'
import MenuWindow from './MenuWindow'

export default {
  name: 'Inventory',
  components: { MenuWindow },
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
