<template>
  <div>
    <template v-if="showQuotes">
      <quote-header
        :quoteCount="quotes.length"
        :maxQuotes="maxQuotes"
      ></quote-header>
      <app-new-quote @quoteAdded="newQuote"></app-new-quote>
      <app-quote-grid
        :quotes="quotes"
        @quoteDeleted="deleteQuote"
      ></app-quote-grid>
      <div class="row">
        <div class="col-sm-12 text-center">
          <div class="alert alert-info">Info: Click on a Quote to delete it!</div>
        </div>
      </div>
    </template>
    <b-button @click="home">Back to Home</b-button>
  </div>
</template>

<script>
import QuoteGrid from "./QuoteGrid";
import NewQuote from "./NewQuote";
import QuotesHeader from "./QuotesHeader";
export default {
  data() {
    return {
      showQuotes: true,
      quotes: ["A sample quote"],
      maxQuotes: 10
    };
  },
  methods: {
    newQuote(quote) {
      console.log(quote);
      if (quote !== null || quote !== undefined) {
        if (this.quotes.length >= this.maxQuotes) {
          return alert("Please delete Quotes first!");
        }
        this.quotes.push(quote);
        let quoteIndex = this.quotes.findIndex(q => q.name === quote);
        console.log(this.quotes);
        console.log(this.quoteIndex);
      } else {
        this.$toaster.error("creation failed");
      }
    },
    deleteQuote(index) {
      this.quotes.splice(index, 1);
    },
    showQuoteComponent() {
      this.showQuotes = !this.showQuotes;
      this.selectedComponent = "appQuoteGrid";
    },
    home() {
      this.$router.push("/");
    }
  },
  components: {
    appQuoteGrid: QuoteGrid,
    appNewQuote: NewQuote,
    quoteHeader: QuotesHeader
  }
};
</script>
