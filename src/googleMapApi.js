import GoogleMapsLoader from 'google-maps'
import { API_KEY } from '../googleMapApiKey'

export default new Promise((resolve, reject) => {
  let AutocompleteService, PlacesService
  GoogleMapsLoader.KEY = API_KEY
  GoogleMapsLoader.LIBRARIES = ['geometry', 'places']
  GoogleMapsLoader.load(google => {
    const map = new google.maps.Map(document.createElement('input'), {
      center: {lat: 25.0329636, lng: 121.5654269},
      zoom: 15
    })
    AutocompleteService = new google.maps.places.AutocompleteService()
    PlacesService = new google.maps.places.PlacesService(map)
    resolve({AutocompleteService, PlacesService})
  })
})
