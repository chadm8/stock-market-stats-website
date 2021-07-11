<template>
  <div>
    <v-combobox
      append-icon="mdi-magnify"
      background-color="white"
      @keypress="showMenu = true"
      class="mt-6 theme-blue-text"
      @click="showMenu = !showMenu"
      @click:append="submit"
      color="rgb(71, 98, 255)"
      @keyup.enter="submit"
      @keyup.delete="showMenu = true"
      hide-details
      @input.native="tickerData=$event.srcElement.value"
      :items="items"
      label="Enter any ticker..."
      :loading="loading"
      :menu-props="{openOnClick: false, value: showMenu}"
      outlined
      rounded
      single-line
    ></v-combobox>
  </div>
</template>

<script>
function submit(ev) {
  this.showMenu = false;
  this.tickerData = ev.target.value; // workaround for v-model since it doesn't work
  this.ticker = this.tickerData.split(' - ')[0]; // get the actual ticker ('AAPL - Apple Inc.' -> 'AAPL')
  console.log(this.ticker);
}

export default {
  beforeCreate() { 
    fetch('ticker-data.json')
    .then((response) => response.json())
    .then((json) => 
      json.forEach(element => {
        this.items.push(element.ticker + ' - ' + element.name);
      })
    )
  },
  data: function() {
    return {
      items: [],
      loading: false,
      showMenu: false,
      ticker: '',
      tickerData: ''
    };
  },
  methods: {
    submit
  },
};
</script>

<style>
.v-select.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: none !important;
}
.v-autocomplete.v-input > .v-input__control > .v-input__slot {
  cursor: pointer !important;
}
</style>
