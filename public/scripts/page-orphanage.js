//disable map controls
var options = {
    dragging:  false,
    touchZoom: false,
    doubleClickZoom:  false,
    scrollWheelZoom: false,
    zoomControl: false
}

//store coordinate data for one orphanage data
var lat = document.querySelector('span[data-lat]').dataset.lat
var lng = document.querySelector('span[data-lng]').dataset.lng

//create map
var map = L.map('mapid', options).setView([lat, lng], 14);

//create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
var icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

//create and add marker
L.marker([lat, lng], { icon }).addTo(map)

var selectImage = function(event){
    var button = event.currentTarget;

    //remover classe .active
    var buttons = document.querySelectorAll(".images button");  
    var removeActiveClass = function(button){
        button.classList.remove("active");
    };

    buttons.forEach(removeActiveClass);

    //selecionar a imagem clicada
    var image = button.children[0];
    var imageContainer =  document.querySelector(".orphanage-details > img");

    //apresentar a imagem selecionada
    imageContainer.src = image.src;

    //adicionar classe .active
    button.classList.add("active");
};
