<template>
  <div class="c-overlay-actions">
    <v-app>
      <v-container>
        <v-layout>
          <v-flex xs12 sm6>

            <v-card>
              <v-card-title>
                <div>
                  <!--<h3 class="headline mb-0">Kangaroo Valley Safari</h3>-->
                  <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                </div>
              </v-card-title>
              <!--<v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
              </v-card-actions>-->
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'OverlayActions'
  }
</script>

<style>
  .c-overlay-actions {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  /* Vuetify */
  .application.theme--light {
    background: transparent;
  }
</style>