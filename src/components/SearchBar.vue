<template>
  <div>
    <v-combobox
      append-icon="mdi-magnify"
      background-color="white"
      @blur="showMenu = false"
      class="mt-6 theme-blue-text"
      @click="showMenu = !showMenu"
      @click:append="submit"
      color="rgb(71, 98, 255)"
      @keypress="showMenu = true"
      @keyup.enter="submit"
      @keyup.delete="showMenu = true"
      hide-details
      :items="items"
      label="Enter any ticker..."
      :menu-props="{ openOnClick: false, value: showMenu }"
      outlined
      rounded
      single-line
    ></v-combobox>
  </div>
</template>

<script>
import axios from "axios";

/**
 * Retrieves data from yahoo finance about the ticker the user inputted.
 */
function getTickerData() {
  let domain = document.URL.includes("localhost")
    ? "http://localhost:8080/"
    : "https://query1.finance.yahoo.com/"
    //: "https://chadm8.github.io/stock-market-stats-website/";
  let url =
    domain +
    "v7/finance/download/" +
    this.ticker +
    "?period1=0000000000&period2=9999999999&interval=1d&events=history&includeAdjustedClose=true";
  axios.get(url).then((response) => {
    let data = response.data.split("\n");
    data.forEach((row) => {
      let line = row.split(",");
      this.tickerData.push({ date: line[0], open: line[1], close: line[4] });
    });
  });
  console.log(this.tickerData);
}

/**
 * Parses the ticker and retrieves all necessary data.
 * @param ev - The event
 */
function submit(ev) {
  this.loading = true;
  this.showMenu = false;
  this.tickerInfo = ev.target.value; // workaround for v-model since it doesn't work
  // make sure to deal with case where use clicks the search bar (ev will be different)
  this.ticker = this.tickerInfo.split(" - ")[0]; // get the actual ticker ('AAPL - Apple Inc.' -> 'AAPL')
  this.getTickerData();
}

export default {
  /**
   * Lifecycle hook to retrieve all tickers from local file that are relevent to Yahoo Finance.
   */
  beforeCreate() {
    fetch("ticker-data.json")
      .then((response) => response.json())
      .then((json) =>
        json.forEach((element) => {
          this.items.push(element.ticker + " - " + element.name);
        })
      );
  },
  data: function() {
    return {
      items: [],
      loading: false,
      showMenu: false,
      ticker: "",
      tickerInfo: "",
      tickerData: [],
    };
  },
  methods: {
    getTickerData,
    submit,
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
