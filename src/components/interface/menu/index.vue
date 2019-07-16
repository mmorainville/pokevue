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
          routeName: 'pokedex'
        },
        {
          title: 'Sac',
          routeName: 'inventory'
        },
        {
          title: 'Profile',
          routeName: 'profile'
        },
        {
          title: 'Save',
          action: 'save'
        },
        {
          title: 'Fermer'
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
      if (item.routeName) {
        this.$router.push(item.routeName)
      } else if (item.action) {
        switch (item.action) {
          case 'save':
            this.$appBus.$emit('game:save')
            break
        }
      } else {
        this.$appBus.$emit('keydown:esc')
      }
    }
  }
}
</script>
