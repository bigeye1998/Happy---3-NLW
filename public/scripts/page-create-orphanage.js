//create map
var map = L.map("mapid").setView([-15.8576797, -47.9789931], 12);

//create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
var icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [38, 68],
  iconAnchor: [29, 68],
});

//create and add marker
var marker;

map.on("click", (event) => {
  //create variables for coordinate data
  var lat = event.latlng.lat;
  var lng = event.latlng.lng;

  //store coordinate values
  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  //remove marker
  if (marker) {
    map.removeLayer(marker);
  }

  //add marker
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

//add pictures

var addPhoto = function () {
  //store #images container data
  var imageContainer = document.querySelector("#images");

  //store .new-upload data
  var newImageContainers = document.querySelectorAll(".new-upload");

  //duplicate last image added
  var newImage = newImageContainers[newImageContainers.length - 1].cloneNode(true);

  //block addition if input box is empty
  var input = newImage.children[0];

  if (input.value === "") {
    return;
  }

  //clear last input
  input.value = "";

  //add duplicate to #images container
  imageContainer.appendChild(newImage);
};

//remove pictures
var deletePhoto = function (event) {
  //store specific target data
  var span = event.currentTarget;

  //store .new-upload data
  var newImageContainers = document.querySelectorAll(".new-upload");

  if (newImageContainers.length < 2) {
    span.parentNode.children[0].value = "";
    return;
  } else {
    span.parentNode.remove();
  }
};

var toggle = function(event) {
    //store selected button
    var button = event.currentTarget;

    //change hidden input value respective to selected option
    var input = document.querySelector('[name="open_on_weekends"]')
    
    //check option
    input.value = button.dataset.value
    console.log(input.value)

    //remove .active class from buttons
    var removeActive = function(button) {
        button.classList.remove('active')
    }
    document.querySelectorAll('.button-select button').forEach(removeActive)
    

    //assign .active class to selected button
    button.classList.add('active')
}

var validate = function(event) {
  //definir os campos para validação
    var coordinate = document.querySelectorAll('[name="lat"]', '[name="lng"]');
    var latlng = coordinate[0];

  //validar se lat e lng estão preenchidos
  if (latlng.value === '') {
    event.preventDefault()
    alert("Selecione um ponto no mapa")
  }
     
}