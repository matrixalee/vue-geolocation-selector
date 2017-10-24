<template>
  <div>
    <input type="text" @input="onInput"/>
    <div>{{input}}</div>
    <ul v-for="place in options">
      <li @click="onPlaceChange(place)">
        {{place.description}}
      </li>
    </ul>
    <div>
      <div>{{place.description}}</div>
      <div>{{place.address}}</div>
      <div>{{place.geoLocation}}</div>
    </div>
  </div>
</template>

<script>
  import googleMapApi from './googleMapApi'
  let AutocompleteServicex, PlacesServicex
  googleMapApi.then(({AutocompleteService, PlacesService})=>{
    AutocompleteServicex = AutocompleteService
    PlacesServicex = PlacesService
  })
  export default {
    data() {
      return {
        input: '',
        options: [],
        onInput: e => {
          const input = e.target.value
          this.input = input
          AutocompleteServicex.getPlacePredictions({ input }, (res, status)=> {
            this.options = res
          })
        },
        place: {},
        onPlaceChange: place => {
          PlacesServicex.getDetails({placeId: place.place_id}, (details, status)=>{
            const geoLocation = details.geometry.location.toString()
            /*
              Latitude and Longitude are available via
              details.geometry.location.lat()
              details.geometry.location.lng()
            */
            if(details){
              this.place = {...place, address: details.formatted_address, geoLocation}
            }
          })
        }
      }
    }
  }
</script>
