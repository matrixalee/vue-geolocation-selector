<template>
  <section>
    <p class="content"><b>Selected:</b> {{ selected && selected.title }}{{ selected && selected.geoLocation }}</p>
    <b-field label="Find a location">
      <b-autocomplete
        v-model="name"
        :data="data"
        placeholder="e.g. Taipei"
        field="title"
        :loading="isFetching"
        @input="getAsyncData"
        @select="setSelected">

        <template scope="props">
          <div class="media">
            <div class="media-content">
              {{ props.option.title }}
            </div>
          </div>
        </template>
      </b-autocomplete>
    </b-field>
  </section>
</template>

<script>
  import googleMapApi from './googleMapApi'
  import debounce from 'lodash/debounce'
  let AutocompleteServicex, PlacesServicex
  googleMapApi.then(({AutocompleteService, PlacesService})=>{
    AutocompleteServicex = AutocompleteService
    PlacesServicex = PlacesService
  })

  export default {
    data() {
      return {
        data: [],
        name: '',
        selected: null,
        isFetching: false
      }
    },
    methods: {
      setSelected: function(place){
        place && PlacesServicex.getDetails({placeId: place.place_id}, (details, status)=>{
          const geoLocation = details.geometry.location.toString()
          /*
            Latitude and Longitude are available via
            details.geometry.location.lat()
            details.geometry.location.lng()
          */
          if(details){
            this.selected = {...place, address: details.formatted_address, geoLocation}
          }
        })
      },
      getAsyncData: debounce(function(){
        this.data = []
        this.isFetching = true
        const input = this.name
        input && AutocompleteServicex.getPlacePredictions({ input }, (res, status) => {
          this.data = (res || []).map(x=>({...x, title: x.description}))
          this.isFetching = false
        })
      }, 500)
    }
  }
</script>
