let map, featuresArray = [];

// Create a map
map = L.map('mapid', {
    center: [31.5, 34.75],
    zoom: 8,
});

// Creating tile layers
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 28,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: 'satellite-streets-v11',
    accessToken: 'pk.eyJ1Ijoic2hsb21peCIsImEiOiJja28yamQ3cTkxMDZhMnFvYnp6YzNzOGEzIn0.PjvvCpp5Ndo8wqtHo56sIw',
	maxZoom: 28,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

// Creating empty layer groups
let theatersLayer = L.layerGroup().addTo(map),
    cinemasLayer = L.layerGroup().addTo(map),
    musicLayer = L.layerGroup().addTo(map);

let theaters = {"type": "FeatureCollection", "features": []}, 
    cinemas = {"type": "FeatureCollection", "features": []}, 
    musics = {"type": "FeatureCollection", "features": []};

// Adding places to each layer according to it's category
places.features.forEach(place => {
    if (place.properties.category.includes('Theater')) theaters.features.push(place);
    if (place.properties.category.includes('Cinema')) cinemas.features.push(place);
    if (place.properties.category.includes('Music')) musics.features.push(place);
})

// Define the layers properties
L.geoJson(theaters, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          icon: L.icon({
            iconUrl: "img/theater-marker.png",
            iconSize: [42, 42],
            iconAnchor: [20, 30],
            popupAnchor: [0, -26]
          }),
          title: feature.properties.name,
          riseOnHover: true
        });
    },
    onEachFeature: function (feature, layer) {
        layer.on({
            click: function () {
                $(".modal-card-title").text(feature.properties.name);
                $(".category").text(`קטגוריה: ${feature.properties.category}`);
                $(".address").text(`כתובת: ${feature.properties.address}`);
                $(".phone").text(`טלפון: ${feature.properties.phone}`);
                document.getElementsByClassName(".website").href = feature.properties.website;
                $(".accesibilty-mail").text("אימייל נציג נגישות: " + feature.properties.accessibility_officer_mail);
                $(".accesibilty-phone").text("טלפון נציג נגישות: " + feature.properties.accessibility_officer_phone);
                $(".info").text("מידע אודות הנגישות באתר: " + feature.properties.accessibility_description);
                $(".modal").toggleClass("is-active");
            }
        });
        $("#feature-list").append(`<li class="feature-row" id="${L.stamp(layer)}" lat="${layer.getLatLng().lat}" lng="${layer.getLatLng().lng}">
                                    <span><img src="img/theater-marker.png" width="30" height="30"></span>
                                    <span class="item-name">${layer.feature.properties.name}</span>
                                    <span class="item-address">${layer.feature.properties.address}</span>
                                    <span class="icon">
                                        <i class="fa fa-chevron-left"></i>
                                    </span>
                                    </li>`);
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
          title: feature.properties.name,
          riseOnHover: true
        });
    },
    onEachFeature: function (feature, layer) {
        layer.on({
            click: function () {
                $(".modal-card-title").text(feature.properties.name);
                $(".category").text(`קטגוריה: ${feature.properties.category}`);
                $(".address").text(`כתובת: ${feature.properties.address}`);
                $(".phone").text(`טלפון: ${feature.properties.phone}`);
                document.getElementsByClassName(".website").href = feature.properties.website;
                $(".accesibilty-mail").text("אימייל נציג נגישות: " + feature.properties.accessibility_officer_mail);
                $(".accesibilty-phone").text("טלפון נציג נגישות: " + feature.properties.accessibility_officer_phone);
                $(".info").text("מידע אודות הנגישות באתר: " + feature.properties.accessibility_description);
                $(".modal").toggleClass("is-active");
            }
        });
        $("#feature-list").append(`<li class="feature-row" id="${L.stamp(layer)}" lat="${layer.getLatLng().lat}" lng="${layer.getLatLng().lng}">
                                    <span><img src="img/cinema-marker.png" width="30" height="30"></span>
                                    <span class="item-name">${layer.feature.properties.name}</span>
                                    <span class="item-address">${layer.feature.properties.address}</span>
                                    <span class="icon">
                                        <i class="fa fa-chevron-left"></i>
                                    </span>
                                    </li>`);
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
          title: feature.properties.name,
          riseOnHover: true
        });
    },
    onEachFeature: function (feature, layer) {
        layer.on({
            click: function () {
                $(".modal-card-title").text(feature.properties.name);
                $(".category").text(`קטגוריה: ${feature.properties.category}`);
                $(".address").text(`כתובת: ${feature.properties.address}`);
                $(".phone").text(`טלפון: ${feature.properties.phone}`);
                document.getElementsByClassName(".website").href = feature.properties.website;
                $(".accesibilty-mail").text("אימייל נציג נגישות: " + feature.properties.accessibility_officer_mail);
                $(".accesibilty-phone").text("טלפון נציג נגישות: " + feature.properties.accessibility_officer_phone);
                $(".info").text("מידע אודות הנגישות באתר: " + feature.properties.accessibility_description);
                $(".modal").toggleClass("is-active");
            }
        });
        $("#feature-list").append(`<li class="feature-row" id="${L.stamp(layer)}" lat="${layer.getLatLng().lat}" lng="${layer.getLatLng().lng}">
                                    <span><img src="img/music-marker.png" width="30" height="30"></span>
                                    <span class="item-name">${layer.feature.properties.name}</span>
                                    <span class="item-address">${layer.feature.properties.address}</span>
                                    <span class="icon">
                                        <i class="fa fa-chevron-left"></i>
                                    </span>
                                    </li>`);
        musicLayer.addLayer(layer);
    }
});

// These options will appear in the control box that users click to select tile layers
let basemapControl = {
    "Map": streets,
    "Satellite": satellite
}

// an option to show or hide the layer you created from geojson
let layerControl = {
    "Theaters": theatersLayer,
    "Cinemas": cinemasLayer,
    "Music": musicLayer,
}

// Add the control component, a layer list with checkboxes for operational layers and radio buttons for basemaps
L.control.layers(basemapControl, layerControl).addTo(map)

// Add control to locate user location (Plugin)
L.control.locate({
    flyTo: true,
    icon: 'fas fa-map-marker-alt',
}).addTo(map);


$(document).ready(function() {
    /* Control on navbar */
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");

    });

});

$(".modal-close-button").click(function (){
    $(".modal").toggleClass("is-active");
});

$(".sidebar-list-btn").click(function (){
    $(".sidebar-list").animate({width: 'toggle'})
});


let options = {
    valueNames: [ 'item-name', 'item-address' ],
};

let featuresList = new List('features-panel', options);
featuresList.sort("item-name", {order:"asc"});