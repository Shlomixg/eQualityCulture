var wms_layers = [];


        var lyr_OSMStandard_0 = new ol.layer.Tile({
            'title': 'OSM Standard',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Data_1 = new ol.format.GeoJSON();
var features_Data_1 = format_Data_1.readFeatures(json_Data_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Data_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Data_1.addFeatures(features_Data_1);
var lyr_Data_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Data_1, 
                style: style_Data_1,
                interactive: true,
                title: '<img src="styles/legend/Data_1.png" /> Data'
            });

lyr_OSMStandard_0.setVisible(true);lyr_Data_1.setVisible(true);
var layersList = [lyr_OSMStandard_0,lyr_Data_1];
lyr_Data_1.set('fieldAliases', {'Name': 'Name', 'Address': 'Address', 'Latitude': 'Latitude', 'Longitude': 'Longitude', 'Phone': 'Phone', 'Accessibility Officer Mail': 'Accessibility Officer Mail', 'Accessibility Officer Phone': 'Accessibility Officer Phone', 'Webite': 'Webite', 'Category': 'Category', 'Area': 'Area', 'Accessibility Description': 'Accessibility Description', 'hearing': 'hearing', 'sight': 'sight', 'mobillity': 'mobillity', 'field_15': 'field_15', 'field_16': 'field_16', 'field_17': 'field_17', 'field_18': 'field_18', 'field_19': 'field_19', 'field_20': 'field_20', 'field_21': 'field_21', 'field_22': 'field_22', 'field_23': 'field_23', 'field_24': 'field_24', 'field_25': 'field_25', });
lyr_Data_1.set('fieldImages', {'Name': 'TextEdit', 'Address': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Phone': 'TextEdit', 'Accessibility Officer Mail': 'TextEdit', 'Accessibility Officer Phone': 'TextEdit', 'Webite': 'TextEdit', 'Category': 'TextEdit', 'Area': 'TextEdit', 'Accessibility Description': 'TextEdit', 'hearing': 'TextEdit', 'sight': 'TextEdit', 'mobillity': 'TextEdit', 'field_15': 'TextEdit', 'field_16': 'TextEdit', 'field_17': 'TextEdit', 'field_18': 'TextEdit', 'field_19': 'TextEdit', 'field_20': 'TextEdit', 'field_21': 'TextEdit', 'field_22': 'TextEdit', 'field_23': 'TextEdit', 'field_24': 'TextEdit', 'field_25': 'TextEdit', });
lyr_Data_1.set('fieldLabels', {'Name': 'no label', 'Address': 'no label', 'Latitude': 'no label', 'Longitude': 'no label', 'Phone': 'no label', 'Accessibility Officer Mail': 'no label', 'Accessibility Officer Phone': 'no label', 'Webite': 'no label', 'Category': 'no label', 'Area': 'no label', 'Accessibility Description': 'no label', 'hearing': 'no label', 'sight': 'no label', 'mobillity': 'no label', 'field_15': 'no label', 'field_16': 'no label', 'field_17': 'no label', 'field_18': 'no label', 'field_19': 'no label', 'field_20': 'no label', 'field_21': 'no label', 'field_22': 'no label', 'field_23': 'no label', 'field_24': 'no label', 'field_25': 'no label', });
lyr_Data_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});