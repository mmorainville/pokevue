<template>
  <v-container fluid grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs2 offset-xs10>
        <v-card>
          <v-list>
            <v-list-tile
                v-for="(item, index) in menuItems"
                :key="index"
                @click="open(item)"
            >
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      menuItems: [
        {
          title: 'Pokémon',
          route: '/pokedex'
        },
        {
          title: 'Sac',
          route: '/sac'
        },
        {
          title: 'Profile',
          route: '/profile'
        },
        {
          title: 'Save',
          route: '/save'
        }
      ]
    }
  },
  mounted () {
    console.log('Menu')
  },
  methods: {
    open (item) {
      console.log(item)
      this.$router.push(item.route)
    }
  }
}
</script>

<style>
  .selected {
    border-bottom: 1px #2196F3 solid;
  }
</style>
