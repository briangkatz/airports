var hideLabel = function(label){ label.labelObject.style.opacity = 0;};
var showLabel = function(label){ label.labelObject.style.opacity = 1;};
var labelEngine = new labelgun.default(hideLabel, showLabel);

var labels = [];
// Alber's Equal Area Projection
var crs = new L.Proj.CRS('EPSG:3085', '+proj=aea +lat_1=27.5 +lat_2=35 +lat_0=18 +lon_0=-100 +x_0=1500000 +y_0=6000000 +ellps=GRS80 +units=m +no_defs', {
    origin: [416729.617118, 412156.942963],
    bounds: [
        [-2410329.835748, 13545805.10653],
        [-10850237.174162, 3977377.378424]
    ],
    resolutions: [
        4891.96999883583 * 8,
        4891.96999883583 * 4,
        4891.96999883583 * 2,
        4891.96999883583,
        2445.98499994708,
        1222.99250010583,
        611.496250052917,
        305.748124894166,
        152.8740625,
        76.4370312632292,
        38.2185156316146,
        19.1092578131615,
        9.55462890525781,
        4.77731445262891,
        2.38865722657904,
        1.19432861315723,
        0.597164306578613,
        0.298582153289307,
        0.298582153289307 / 2,
        0.298582153289307 / 4,
        0.298582153289307 / 8,
        0.298582153289307 / 16
    ]
});
// define map object and parameters
var mymap = L.map('map', {
    center: [38, -98],
    zoom: 3,
    maxZoom: 10,
    minZoom: 2,
    detectRetina: true,
    crs: crs // set projection to Alber's Equal Area
});
// define color scale for airport markers (color-blind friendly yellow/purple combo)
var colors = chroma.scale(['#ffff00', '#800080']).mode('lch').colors(2);
// set color of airport markers based on control tower Y/N (id 1/0)
for (i = 0; i < 2; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 14px; text-shadow: 1px 2px 6px #585858;} </style>"));
}
// add airports data layer
airports = L.geoJson.ajax("assets/airports.geojson", {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.AIRPT_NAME)},
    pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.CNTL_TWR === "Y") { id = 0; }
        else { id = 1;} // "N"
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id + 1).toString() })});
    }}).addTo(mymap);
// set color scale for us-states from purple to yellow (color-blind friendly)
colors = chroma.scale(['#800080', '#ffff00']).mode('lch').colors(5);
// set color scale for legend break points
function setColor(density) {
    var id = 0;
    if (density > 20) { id = 4; }
    else if (density > 15 && density <= 20) { id = 3; }
    else if (density > 10 && density <= 15) { id = 2; }
    else if (density > 5 &&  density <= 10) { id = 1; }
    else  { id = 0; }
    return colors[id];
}
// set choropleth fill color based on airport count
function style(feature) {
    return {
        fillColor: setColor(feature.properties.count),
        fillOpacity: 0.2,
        weight: 2,
        opacity: 1,
        color: '#ffffff',
        dashArray: '3'
    };
}
// add us-states data layer
states = L.geoJson.ajax("assets/us-states.geojson", {
    style: style,
    onEachFeature: function (feature, label) {
        label.bindTooltip(feature.properties.name, {
            className: 'feature-label',
            permanent: true,
            direction: 'center'
        });
        labels.push(label);
    }
}).addTo(mymap);
// define legend
var legend = L.control({position: 'topright'});
// set legend color scale and breaks
legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b># Airports/State</b><br />';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>20+</p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>15-20</p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>10-15</p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 5-10</p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0- 5</p>';
    div.innerHTML += '<hr><b>Control Tower Present<b><br />';
    div.innerHTML += '<i class="fa fa-plane marker-color-1"></i><p> Yes</p>';
    div.innerHTML += '<i class="fa fa-plane marker-color-2"></i><p> No</p>';
    return div;
};

legend.addTo(mymap);

// https://github.com/cloudybay/leaflet.latlng-graticule
L.latlngGraticule({
    showLabel: true,
    opacity: 0.2,
    color: "#000000",
    fillColor: '#747474',
    zoomInterval: [
        {start: 3, end: 3.9, interval: 4},
        {start: 4, end: 5.9, interval: 2},
        {start: 6, end: 7.9, interval: 0.5},
        {start: 8, end: 10, interval: 0.25}
    ]
}).addTo(mymap);

function addLabel(layer, id) {
    var label = layer.getTooltip()._source._tooltip._container;
    if (label) {
        // We need the bounding rectangle of the label itself
        var rect = label.getBoundingClientRect();
        // We convert the container coordinates (screen space) to Lat/lng
        var bottomLeft = mymap.containerPointToLatLng([rect.left, rect.bottom]);
        var topRight = mymap.containerPointToLatLng([rect.right, rect.top]);
        var boundingBox = {
            bottomLeft : [bottomLeft.lng, bottomLeft.lat],
            topRight   : [topRight.lng, topRight.lat]
        };
        // Ingest the label into labelgun itself
        labelEngine.ingestLabel(
            boundingBox,
            id,
            parseInt(Math.random() * (5 - 1) + 1), // Weight
            label,
            label.innerText,
            false
        );
        // If the label hasn't been added to the map already
        // add it and set the added flag to true
        if (!layer.added) {
            layer.addTo(mymap);
            layer.added = true;
        }
    }
}

mymap.on("zoomend", function(){
    var i = 0;
    states.eachLayer(function(label){
        addLabel(label, ++i);
    });
    labelEngine.update();
});