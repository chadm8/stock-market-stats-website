<template>
    <v-container fluid fill-height class="page-background-color align-start justify-center">
      <div>
        <h1 class="display-3 font-weight-bold theme-blue-text my-6">Stock Market Stats</h1>
        <search-bar></search-bar>
      </div>
    </v-container>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'

export default {
  components: {
    SearchBar
  }
};
</script>

<style>
  .page-background-color {
    background-color: rgb(44, 44, 44);
  }

  .theme-blue-text {
    color: rgb(71, 98, 255);
  }
</style>