<template>
  <v-card class="d-inline-block elevation-12">
    <v-navigation-drawer
      permanent
      stateless
      value="true"
    >
      <v-list dense>
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="open(item)"
        >
          <!--<v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>-->

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
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
          title: 'Profil',
          routeName: 'profile'
        },
        {
          title: 'Équipe',
          routeName: 'team'
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
