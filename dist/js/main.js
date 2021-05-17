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
let markerClusters = new L.markerClusterGroup({
    disableClusteringAtZoom: 13
});

/* Highligh layer */
let highlight = L.geoJson(null);
let highlightStyle = {
  stroke: false,
  fillColor: "#3ec1d3",
  fillOpacity: 0.7,
  radius: 10
};

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
let theatersLayer = L.geoJson(null),
    cinemasLayer = L.geoJson(null),
    musicsLayer = L.geoJson(null),
    museumsLayer = L.geoJson(null),
    natureLayer = L.geoJson(null);

function onEachFeature(feature, layer) {
    layer.on('click', e => {
        let place = feature.properties, cat, accessibility;
        switch (place.category) {
            case "Theater":
                cat = 'תיאטראות';
                break;
            case "Cinema":
                cat = 'קולנוע';
                break;
            case "Music":
                cat = 'מוזיקה';
                break;
            case "Museum":
                cat = 'מוזיאונים';
                break;
            case "Nature":
                cat = 'טבע';
                break;
        }

        highlight.clearLayers();
        highlight.addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));

        $(".modal-popup-title").text(place.name);
        let popup_tbody = $(".popup-tbody");
        popup_tbody.empty();
        popup_tbody.append(`<tr><td>קטגוריה</td><td>${cat}</td></tr>`);
        popup_tbody.append(`<tr><td>כתובת</td><td>${place.address}</td></tr>`);
        popup_tbody.append(`<tr><td>טלפון</td><td><a href="tel:${place.phone}">${place.phone}</a></td></tr>`);
        popup_tbody.append(`<tr><td>אתר</td><td><a class="website" href="${place.website}" target="_blank">${place.website}</a></td></tr>`);

        if (place.accessibility_officer_mail)
            popup_tbody.append(`<tr><td>מייל קצין נגישות</td><td><a href = "mailto:${place.accessibility_officer_mail}">${place.accessibility_officer_mail}</a></td></tr>`);
        if (place.accessibility_officer_phone)
            popup_tbody.append(`<tr><td>טלפון קצין נגישות</td><td><a href="tel:${place.accessibility_officer_phone}">${place.accessibility_officer_phone}</a></td></tr>`);

        if (place.sight == 'X') accessibility = 'אין נגישות';
        else if (place.sight == 'P') accessibility = 'נגישות חלקית';
        else accessibility = 'נגישות מלאה';
        popup_tbody.append(`<tr><td>נגישות לכבדי ראייה ועיוורים</td><td>${accessibility}</td></tr>`);

        if (place.hearing == 'X') accessibility = 'אין נגישות';
        else if (place.hearing == 'P') accessibility = 'נגישות חלקית';
        else accessibility = 'נגישות מלאה';
        popup_tbody.append(`<tr><td>נגישות לכבדי שמיעה וחירשים</td><td>${accessibility}</td></tr>`);

        if (place.mobillity == 'X') accessibility = 'אין נגישות';
        else if (place.mobillity == 'P') accessibility = 'נגישות חלקית';
        else accessibility = 'נגישות מלאה';
        popup_tbody.append(`<tr><td>נגישות למוגבלי ניידות</td><td>${accessibility}</td></tr>`);

        popup_tbody.append(`<tr><td>פירוט נגישות במקום</td><td>${place.accessibility_description}</td></tr>`);
        $("#modal-popup").toggleClass("is-active");
    });
    featuresArray.push({
        marker_name: feature.properties.name,
        marker_address: feature.properties.address,
        marker_category: feature.properties.category,
        marker_img: `img/${feature.properties.category}-marker.png`,
        marker_id: L.stamp(layer),
        marker_lat: feature.geometry.coordinates[1],
        marker_lng: feature.geometry.coordinates[0]
    });
}

// Define the layers properties
let theaters = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: `img/${feature.properties.category}-marker.png`,
                iconSize: [42, 42],
                iconAnchor: [21, 34],
                popupAnchor: [0, -26]
            }),
            title: feature.properties.name,
            riseOnHover: true
        });
    },
    onEachFeature: onEachFeature
});

let cinemas = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: `img/${feature.properties.category}-marker.png`,
                iconSize: [42, 42],
                iconAnchor: [21, 34],
                popupAnchor: [0, -26]
            }),
            title: feature.properties.name,
            riseOnHover: true
        });
    },
    onEachFeature: onEachFeature
});

let musics = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: `img/${feature.properties.category}-marker.png`,
                iconSize: [42, 42],
                iconAnchor: [21, 34],
                popupAnchor: [0, -26]
            }),
            title: feature.properties.name,
            riseOnHover: true
        });
    },
    onEachFeature: onEachFeature
});

let museums = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: `img/${feature.properties.category}-marker.png`,
                iconSize: [42, 42],
                iconAnchor: [21, 34],
                popupAnchor: [0, -26]
            }),
            title: feature.properties.name,
            riseOnHover: true
        });
    },
    onEachFeature: onEachFeature
});

let nature = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.icon({
                iconUrl: `img/${feature.properties.category}-marker.png`,
                iconSize: [42, 42],
                iconAnchor: [21, 34],
                popupAnchor: [0, -26]
            }),
            title: feature.properties.name,
            riseOnHover: true
        });
    },
    onEachFeature: onEachFeature
});

// Adding places to each layer according to it's category
places.features.forEach(place => {
    if (place.properties.category.includes('Theater')) theaters.addData(place);
    else if (place.properties.category.includes('Cinema')) cinemas.addData(place);
    else if (place.properties.category.includes('Music')) musics.addData(place);
    else if (place.properties.category.includes('Museum')) museums.addData(place);
    else if (place.properties.category.includes('Nature')) nature.addData(place);
})

// Create a map
map = L.map('mapid', {
    center: [31.4, 34.75],
    zoom: 8,
    maxZoom: 18,
    minZoom: 8,
    layers: [streets, markerClusters, highlight],
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

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
    switch (e.layer) {
        case theatersLayer:
            markerClusters.addLayers(theaters);
            syncSidebarList();
            break;
        case cinemasLayer:
            markerClusters.addLayers(cinemas);
            syncSidebarList();
            break;
        case musicsLayer:
            markerClusters.addLayers(musics);
            syncSidebarList();
            break;
        case museumsLayer:
            markerClusters.addLayers(museums);
            syncSidebarList();
            break;
        case natureLayer:
            markerClusters.addLayers(nature);
            syncSidebarList();
            break;
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
        case museumsLayer:
            markerClusters.removeLayer(museums);
            syncSidebarList();
            break;
        case natureLayer:
            markerClusters.removeLayer(nature);
            syncSidebarList();
            break;
    }
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
    highlight.clearLayers();
});

// These options will appear in the control box that users click to select tile layers
let basemapControl = {
    "Map": streets,
    "Satellite": satellite
}

// an option to show or hide the layer from geojson
let layerControl = {
    "<img src='img/Theater-marker.png' width='18' height='18'>&nbsp;תיאטראות": theatersLayer,
    "<img src='img/Cinema-marker.png' width='18' height='18'>&nbsp;קולנוע": cinemasLayer,
    "<img src='img/Music-marker.png' width='18' height='18'>&nbsp;מוזיקה": musicsLayer,
    "<img src='img/Museum-marker.png' width='18' height='18'>&nbsp;מוזיאונים": museumsLayer,
    "<img src='img/Nature-marker.png' width='18' height='18'>&nbsp;טבע": natureLayer,
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
                if (obj.name.includes('תיאטראות')) active.push('Theater');
                else if (obj.name.includes('קולנוע')) active.push('Cinema');
                else if (obj.name.includes('מוזיקה')) active.push('Music');
                else if (obj.name.includes('מוזיאונים')) active.push('Museum');
                else if (obj.name.includes('טבע')) active.push('Nature');
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
map.addLayer(museumsLayer);
map.addLayer(natureLayer);

// Add control to locate user location (Plugin)
L.control.locate({
    flyTo: true,
    icon: 'fas fa-map-marker-alt',
}).addTo(map);

/* Control on navbar */
// Check for click events on the navbar burger icon
$(".navbar-burger").click(() => {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
});

$(".sidebar-list-btn").click(() => {
    $(".sidebar-list").animate({width: 'toggle'})
    if ($(".navbar-burger").hasClass("is-active")) {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }
});

$(".feature-row").click(function () {
    sidebarFeatureClick(parseInt($(this).children(":first").attr("id"), 10));
});

$(".website-btn").click(() => {
    window.open($(".website").attr("href"), '_blank');
});

$(".modal-close-button").click(() => {
    $(".modal").removeClass("is-active");
});

$(".about").click(() => {
    $("#modal-about").toggleClass("is-active");
});

$(".contact").click(() => {
    $("#modal-contact").toggleClass("is-active");
});

function syncSidebarList() {
    activeLayers = control.getActiveOverlays();
    featuresList.filter(feature => {
        return (activeLayers.includes(feature._values.marker_category));
    });
}

function sidebarFeatureClick(id) {
    let layer = markerClusters.getLayer(id);
    map.flyTo([layer.getLatLng().lat, layer.getLatLng().lng], 14, {
        animate: true,
        duration: 1
    });
    layer.fire("click");
    /* Hide sidebar and go to the map on small screens */
    if (document.body.clientWidth <= 767) {
        $(".sidebar-list-btn" ).trigger( "click" );
    }
}