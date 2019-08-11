<template>
  <div>
      <v-container>
        <v-layout >
            <v-text-field
            solo 
            label="Search by city name, US zip code, Canada postal code, UK postcode, ip, metar, etc." 
            v-model="searchValue" 
            @keyup.enter.native="searchLocation(searchValue)"
            append-icon="search"
            @click:append="searchLocation(searchValue)"
            >
            </v-text-field>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import {store} from '../../store/index'
import service from '../../service'
export default {
  name: 'SearchBar',
  data(){
    return{
      searchValue: null,
    }
  },
  methods:{
    searchLocation(payload){
      this.$emit('searchValue', payload)
      console.log(payload);
      this.$store.dispatch('searchLocation',payload);
    }
  }
}
</script>

<style >
  .searchbar{
    width: 50%;
  }

</style>