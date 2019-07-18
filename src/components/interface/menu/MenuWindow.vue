<template>
  <v-container fluid ma-0 pa-0>
    <v-layout flex-child wrap>
      <v-flex grow>
        <v-toolbar :color="color" dark>
          <v-btn icon @click="() => { $router.push('/') }">
            <v-icon>close</v-icon>
          </v-btn>

          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <!--<v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>-->
        </v-toolbar>

        <v-card style="max-height: 400px" class="scroll-y">

          <slot></slot>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MenuWindow',
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'red'
    }
  }
}
</script>
