<script setup lang="ts">
import mapboxgl from 'mapbox-gl'

/*************************
 ** Mapbox configuraion **
 *************************/

// Mapbox general public access token.
mapboxgl.accessToken =
  'pk.eyJ1IjoiZGV4ZW50byIsImEiOiJjanR4NTljcG4wNDlnNGNyM2duNms3cXo4In0.q4G3Zzgf1zQ8MQFZzwMPQA'

onMounted(() => {
  setTimeout(() => {
    const map = new mapboxgl.Map({
      container: 'mapContainer', // container ID
      style: 'mapbox://styles/dexento/cjujsu10w07p81fnz7vcdjvg3', // style URL
      center: [11.064777, 59.963297], // starting position [lng, lat]
      zoom: 15, // starting zoom
      projection: 'globe',
    })

    const navControls = new mapboxgl.NavigationControl()

    map.addControl(navControls, 'bottom-right')
  }, 200)
})
</script>

<template>
  <div>
    <div id="mapContainer" class="map-container" />
  </div>
</template>

<style scoped>
.map-container {
  height: 375px;
  width: 100%;
}

@media (min-width: 640px) {
  .map-container {
    height: 330px;
    width: 100%;
  }
}

@media (min-width: 768px) {
  .map-container {
    height: 370px;
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .map-container {
    height: 575px;
    width: 100%;
  }
}
</style>
