//create map
var map = L.map("mapid").setView([-15.8257923,-48.0306049], 12);

//create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
var icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

var addMarker = function ({id, name, lat, lng}) {
  //create popup overlay
  var popup = L.popup({
    closeButton: false,
    className: "map-popup",
    minWidth: 240,
    minHeight: 240,
  }).setContent(`${name} <a href="orphanage?id=${id}"><img src="/images/arrow-white.svg"></a>`);

  //create and add marker
  L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
};

var dataInput = function(element) {
  var data = {
    id: element.dataset.id,
    lat: element.dataset.lat,
    lng: element.dataset.lng,
    name: element.dataset.name
  }

  addMarker(data)
}

var Data = document.querySelectorAll(".orphanagesData span")

Data.forEach(dataInput)