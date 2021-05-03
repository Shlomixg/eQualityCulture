let map, featuresArray = [], activeLayers = [];

// Creating tile layers
let streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 28,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
})

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    id: 'satellite-streets-v11',
    accessToken: 'pk.eyJ1Ijoic2hsb21peCIsImEiOiJja28yamQ3cTkxMDZhMnFvYnp6YzNzOGEzIn0.PjvvCpp5Ndo8wqtHo56sIw',
	maxZoom: 28,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

/* Single marker cluster layer to hold all clusters */
let markerClusters = new L.markerClusterGroup();

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
let theatersLayer = L.geoJson(null),
    cinemasLayer = L.geoJson(null),
    musicsLayer = L.geoJson(null);

// Define the layers properties
let theaters = L.geoJson(null, {
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
        featuresArray.push({
            marker_name: layer.feature.properties.name,
            marker_address: layer.feature.properties.address,
            marker_category: "theaters",
            marker_img: "img/theater-marker.png",
            marker_id: L.stamp(layer),
            marker_lat: layer.feature.geometry.coordinates[1],
            marker_lng: layer.feature.geometry.coordinates[0]
        });
    }
});

let cinemas = L.geoJson(null, {
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
        featuresArray.push({
            marker_name: layer.feature.properties.name,
            marker_address: layer.feature.properties.address,
            marker_category: "cinemas",
            marker_img: "img/cinema-marker.png",
            marker_id: L.stamp(layer),
            marker_lat: layer.feature.geometry.coordinates[1],
            marker_lng: layer.feature.geometry.coordinates[0]
        });
    }
});

let musics = L.geoJson(null, {
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
        featuresArray.push({
            marker_name: layer.feature.properties.name,
            marker_address: layer.feature.properties.address,
            marker_category: "musics",
            marker_img: "img/music-marker.png",
            marker_id: L.stamp(layer),
            marker_lat: layer.feature.geometry.coordinates[1],
            marker_lng: layer.feature.geometry.coordinates[0]
        });
    }
});

// Adding places to each layer according to it's category
places.features.forEach(place => {
    if (place.properties.category.includes('Theater')) theaters.addData(place);
    if (place.properties.category.includes('Cinema')) cinemas.addData(place);
    if (place.properties.category.includes('Music')) musics.addData(place);
})

// Create a map
map = L.map('mapid', {
    center: [31.4, 34.75],
    zoom: 8,
    maxZoom: 18,
    minZoom: 8,
    layers: [streets, markerClusters],
});

// Define List for listjs (for list & search)
let options = {
    valueNames: [ 
        'marker_name',
        'marker_address',
        {attr: 'src', name: 'marker_img'},
        {attr: 'id', name: 'marker_id'},
        {attr: 'lat', name: 'marker_lat'},
        {attr: 'lng', name: 'marker_lng'},
        {attr: 'marker_category', name: 'marker_category'},
    ],
    item: '<li class="feature-row"><span class="marker_id marker_lat marker_lng marker_category"></span><img class="marker_img" width="30" height="30"><div class="feature-wrapper"><span class="marker_name"></span><span class="marker_address"></span></div><span class="icon feature-arrow"><i class="fa fa-chevron-left"></i></span></li>' 
};

let featuresList = new List('features-panel', options, featuresArray);
featuresList.sort("item-name", {order:"asc"});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
    if (e.layer === theatersLayer) {
        markerClusters.addLayers(theaters);
        syncSidebarList();
    }
    else if (e.layer === cinemasLayer) {
        markerClusters.addLayers(cinemas);
        syncSidebarList();
    }
    else if (e.layer === musicsLayer) {
        markerClusters.addLayers(musics);
        syncSidebarList();
    }
});
  
map.on("overlayremove", function(e) {
    switch (e.layer) {
    case theatersLayer:
        markerClusters.removeLayer(theaters);
        syncSidebarList();
        break;
    case cinemasLayer:
        markerClusters.removeLayer(cinemas);
        syncSidebarList();
        break;
    case musicsLayer:
        markerClusters.removeLayer(musics);
        syncSidebarList();
        break;
    }
});

// These options will appear in the control box that users click to select tile layers
let basemapControl = {
    "Map": streets,
    "Satellite": satellite
}

// an option to show or hide the layer from geojson
let layerControl = {
    "<img src='img/theater-marker.png' width='18' height='18'>&nbsp;תיאטראות": theatersLayer,
    "<img src='img/cinema-marker.png' width='18' height='18'>&nbsp;קולנוע": cinemasLayer,
    "<img src='img/music-marker.png' width='18' height='18'>&nbsp;מוזיקה": musicsLayer,
}

// Adding simple API to get array of active overlays (for filtering features list in the sidebar)
L.Control.Layers.include({
    getActiveOverlays: function () {
        let active = []; // Create array for holding active layers
        // Iterate all layers in control
        this._layers.forEach(obj => {
            // Check if it's an overlay and added to the map
            if (obj.overlay && this._map.hasLayer(obj.layer)) {
                // Push layer to active layers array
                if (obj.name.includes('תיאטראות')) active.push('theaters');
                if (obj.name.includes('קולנוע')) active.push('cinemas');
                if (obj.name.includes('מוזיקה')) active.push('musics');
            }
        });
        return active; // Return array
    }
});

// Add the control component, a layer list with checkboxes for operational layers and radio buttons for basemaps
let control = L.control.layers(basemapControl, layerControl).addTo(map);

// Adding the empty layers to map to trigger the markerCluster
map.addLayer(theatersLayer);
map.addLayer(cinemasLayer);
map.addLayer(musicsLayer);

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

$(".feature-row").click(function (){
    sidebarFeatureClick(parseInt($(this).children(":first").attr("id"), 10));
});

function syncSidebarList() {
    activeLayers = control.getActiveOverlays();
    console.log(activeLayers);
    featuresList.filter(feature => {
        return (activeLayers.includes(feature._values.marker_category));
    });
}

function sidebarFeatureClick(id) {
    let layer = markerClusters.getLayer(id);
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 16);
    layer.fire("click");
    /* Hide sidebar and go to the map on small screens */
    if (document.body.clientWidth <= 767) {
        $( ".sidebar-list-btn" ).trigger( "click" );
    }
}