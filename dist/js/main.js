// Create a map
let mymap = L.map('mapid', {
    center: [31.5, 34.75],
    zoom: 8,
});

let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 28,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

let hot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

let theatersLayer = L.layerGroup().addTo(mymap);
let cinemasLayer = L.layerGroup().addTo(mymap);
let musicLayer = L.layerGroup().addTo(mymap);

let theaters = {"type": "FeatureCollection", "features": []},
    cinemas = {"type": "FeatureCollection", "features": []}, 
    musics = {"type": "FeatureCollection", "features": []};

places.features.forEach(place => {
    console.log(place);
    if (place.properties.Category.includes('Theater')) theaters.features.push(place);
    if (place.properties.Category.includes('Cinema')) cinemas.features.push(place);
    if (place.properties.Category.includes('Music')) musics.features.push(place);
})

console.log(theaters);

L.geoJson(theaters, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "img/theater-marker.png",
            iconSize: [42, 42],
            iconAnchor: [20, 30],
            popupAnchor: [0, -26]
          }),
          title: feature.properties.Name,
          riseOnHover: true
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`${feature.properties.Name}`);
        theatersLayer.addLayer(layer);
    }
});

L.geoJson(cinemas, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "img/cinema-marker.png",
            iconSize: [42, 42],
            iconAnchor: [20, 30],
            popupAnchor: [0, -26]
          }),
          title: feature.properties.Name,
          riseOnHover: true
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`${feature.properties.Name}`);
        cinemasLayer.addLayer(layer);
    }
});

L.geoJson(musics, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "img/music-marker.png",
            iconSize: [42, 42],
            iconAnchor: [20, 30],
            popupAnchor: [0, -26]
          }),
          title: feature.properties.Name,
          riseOnHover: true
        });
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(`${feature.properties.Name}`);
        musicLayer.addLayer(layer);
    }
});

// These options will appear in the control box that users click to show and hide layers
let basemapControl = {
    "Map": streets,
    "Hot": hot
}

// an option to show or hide the layer you created from geojson
let layerControl = {
    "Theaters": theatersLayer,
    "Cinemas": cinemasLayer,
    "Music": musicLayer,
}
  
/* 5 */
// Add the control component, a layer list with checkboxes for operational layers and radio buttons for basemaps
L.control.layers(basemapControl, layerControl).addTo(mymap)