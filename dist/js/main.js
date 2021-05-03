let map, featuresArray = [];

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
        $("#feature-list").append(`<li class="feature-row" id="${L.stamp(layer)}" lat="${layer.getLatLng().lat}" lng="${layer.getLatLng().lng}">
                                    <span><img src="img/theater-marker.png" width="30" height="30"></span>
                                    <span class="item-name">${layer.feature.properties.name}</span>
                                    <span class="item-address">${layer.feature.properties.address}</span>
                                    <span class="icon">
                                        <i class="fa fa-chevron-left"></i>
                                    </span>
                                    </li>`);
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
        $("#feature-list").append(`<li class="feature-row" id="${L.stamp(layer)}" lat="${layer.getLatLng().lat}" lng="${layer.getLatLng().lng}">
                                    <span><img src="img/cinema-marker.png" width="30" height="30"></span>
                                    <span class="item-name">${layer.feature.properties.name}</span>
                                    <span class="item-address">${layer.feature.properties.address}</span>
                                    <span class="icon">
                                        <i class="fa fa-chevron-left"></i>
                                    </span>
                                    </li>`);
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
        $("#feature-list").append(`<li class="feature-row" id="${L.stamp(layer)}" lat="${layer.getLatLng().lat}" lng="${layer.getLatLng().lng}">
                                    <span><img src="img/music-marker.png" width="30" height="30"></span>
                                    <span class="item-name">${layer.feature.properties.name}</span>
                                    <span class="item-address">${layer.feature.properties.address}</span>
                                    <span class="icon">
                                        <i class="fa fa-chevron-left"></i>
                                    </span>
                                    </li>`);
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
    layers: [streets, markerClusters],
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
    if (e.layer === theatersLayer) {
        markerClusters.addLayers(theaters);
        // TODO: Add syncSidebarList
    }
    else if (e.layer === cinemasLayer) {
        markerClusters.addLayers(cinemas);
    }
    else if (e.layer === musicsLayer) {
        markerClusters.addLayers(musics);
    }
});
  
map.on("overlayremove", function(e) {
    if (e.layer === theatersLayer) {
        markerClusters.removeLayer(theaters);
    }
    else if (e.layer === cinemasLayer) {
        markerClusters.removeLayer(cinemas);
    }
    else if (e.layer === musicsLayer) {
        markerClusters.removeLayer(musics);
    }
});



// These options will appear in the control box that users click to select tile layers
let basemapControl = {
    "Map": streets,
    "Satellite": satellite
}

// an option to show or hide the layer you created from geojson
let layerControl = {
    "<img src='img/theater-marker.png' width='18' height='18'>&nbsp;תיאטראות": theatersLayer,
    "<img src='img/cinema-marker.png' width='18' height='18'>&nbsp;קולנוע": cinemasLayer,
    "<img src='img/music-marker.png' width='18' height='18'>&nbsp;מוזיקה": musicsLayer,
}

// Add the control component, a layer list with checkboxes for operational layers and radio buttons for basemaps
L.control.layers(basemapControl, layerControl).addTo(map);

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

$(".about").click(function(){
    $(".modal-card-title").text("מידע אודות האפליקציה");
    $(".category").text("האפליקציה נועדה לעזור לבעלי מוגבלויות למצוא אתרים המספקים בילוי גם לאנשים עם צורכי הנגשה למיניהם.");
    $(".address").text(" ניתן לסנן לפי איזור או קטגוריה מסויימת (בעזרת הכפתור בפינה הימנית העליונה על המפה) או לחפש את המקום המבוקש ישירות דרך הרשימה בראש הדף.");
    $(".phone").text("עבור כל אתר הנמצא על המפה תוכלו לקבל מידע מתומצת לגבי אופן ההנגשה הקיים במקום.");
    $(".accesibilty-mail").text("שימו לב, המידע עלול להשתנות בכל עת, יש ליצור קשר עם המקום בטלפון או לבקר באתר לצורך בירור.");
    $(".accesibilty-phone").text("גלישה מהנה!");
    $(".website").text("חזרה לדף הראשי");
    document.getElementsByClassName(".website").href = "";
    $(".modal").toggleClass("is-active");
});

$(".contact").click(function(){
    $(".modal-card-title").text("צור קשר");
    $(".category").text("ניתן לפנות אל בעלי האפליקציה למטרת עדכון בנוגע לטעות או פרטים שהשתנו:");
    $(".address").text("קובי חדאד -  kobi3336@gmail.com");
    $(".phone").text("shlomixg@gmail.com - שלומי חפיף");
    $(".accesibilty-mail").text("תומר כרמל -  tomerca94@gmail.com");
    $(".accesibilty-phone").text("במייל יש לציין את שם המקום עבורו נשלח המייל ואת מקור המידע עבור הטעות/עדכון.");
    $(".website").text("שלח מייל");
    document.getElementsByClassName(".website").href = "https://www.google.com/";
    $(".modal").toggleClass("is-active");
});

function sidebarFeatureClick(id) {
    let layer = markerClusters.getLayer(id);
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 16);
    layer.fire("click");
    /* Hide sidebar and go to the map on small screens */
    if (document.body.clientWidth <= 767) {
        $( ".sidebar-list-btn" ).trigger( "click" );
    }
}

$(".feature-row").click(function (){
    sidebarFeatureClick(parseInt($(this).attr("id"), 10));
});

// Define List for listjs (for list & search)
let options = {
    valueNames: [ 'item-name', 'item-address' ],
};

let featuresList = new List('features-panel', options);
featuresList.sort("item-name", {order:"asc"});