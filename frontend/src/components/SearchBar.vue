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
      @input.native="search = $event.srcElement.value"
      @keypress="showMenu = true"
      @keyup.enter="submit"
      @keyup.delete="showMenu = true"
      hide-no-data
      :items="items"
      label="Enter any ticker..."
      :menu-props="{ dark: true, value: showMenu, closeOnContentClick: true }"
      outlined
      rounded
      single-line
    ></v-combobox>
  </div>
</template>

<script>
const axios = require("axios").default;
const moment = require("moment");

function changeItemList() {
  var options = {
    method: "GET",
    url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete",
    params: { q: this.search, region: "US" },
    headers: {
      "x-rapidapi-key": "0196190081msh5691f396f7a82afp1fe7c1jsnd873e64d3b6e",
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      let list = [];
      response.data.quotes.forEach((quote) => {
        list.push(`${quote.symbol} - ${quote.shortname}`);
      });
      this.updateItems(list);
    })
    .catch(function(error) {
      console.error(error);
    });
}

/**
 * Retrieves data from yahoo finance about the ticker the user inputted.
 */
function getTickerData() {
  let options = {
    method: "GET",
    url:
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-historical-data",
    params: {
      period1: "000000000000", // gets first day of stock data
      period2: "999999999999", // gets most recent day for stock data
      symbol: this.ticker,
      frequency: "1d", // 1 day interval
      filter: "history",
    },
    headers: {
      "x-rapidapi-key": "0196190081msh5691f396f7a82afp1fe7c1jsnd873e64d3b6e",
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then((response) => {
      console.log(response.data);
      response.data.prices.forEach((day) => {
        let date = moment.unix(day.date).format("YYYY-MM-DD"); // convert seconds to date
        date;
      });
    })
    .catch((error) => {
      console.error(error);
    });
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

function updateItems(list) {
  this.items = list;
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
      search: "",
      showMenu: false,
      ticker: "",
      tickerInfo: "",
      tickerData: [],
    };
  },
  methods: {
    changeItemList,
    getTickerData,
    submit,
    updateItems,
  },
  watch: {
    search: function() {
      this.changeItemList();
    },
    showMenu: function() {
      console.log(this.showMenu);
    }
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
