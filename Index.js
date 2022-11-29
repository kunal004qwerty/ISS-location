// ! get time
let today = new Date();
let timenow = today.toLocaleTimeString();
// console.log(timenow);

// ! GET DATA FROM ISS API

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
// for miles ca;culation
// const api_url_miles = "https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=1436029892,1436029902&units=miles"

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  //   const response1 = await fetch(api_url_miles);
  //   const data1 = await response1.json();
  //   console.log(data1);
  // console.log(data);
  let { latitude, longitude, altitude, velocity, visibility } = data;

  if (visibility == "eclipsed") {
    document.getElementById("vis").innerText = "The ISS is in earth shadow";
    document.getElementById("vis").style.color = "white";
    document.getElementById("vis").style.background = "#0a67c9";
  } else {
    document.getElementById("vis").innerText = "The ISS is in sunlight";
    document.getElementById("vis").style.color = "black";
    document.getElementById("vis").style.background = "yellow";
  }

  document.getElementById("lat").innerText = latitude;
  document.getElementById("long").innerText = longitude;
  document.getElementById("alt").innerText = altitude.toFixed(3); // toFixed()  // how much number after decimal
  document.getElementById("vel").innerText = velocity.toFixed(3);
  document.getElementById("time").innerText = timenow;

  marker.setLatLng([latitude, longitude]);
  circle.setLatLng([latitude, longitude]);

  map.setView([latitude, longitude], map.getZoom());
}

getISS();
setInterval(getISS, 1000);

// ! SETING UP THE MAP
var map = L.map("map").setView([0, 0], 4);
L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png?api_key=AAPK22f3edca83a54a628f90fb713bae7e83kvPGDHtb8IAZ1di6G47UrqFtReTaxSNDQYLbZ5lmLVE_KZ12ThTZZdOMLe4XGy44 ",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }
).addTo(map);
L.esri.basemapLayer("NationalGeographic").addTo(map);
// “Streets”, “Topographic”, “Oceans”, “OceansLabels”, “NationalGeographic”,
//  “Gray”, “GrayLabels”, “DarkGray”, “DarkGrayLabels”, “Imagery”, “ImageryLabels”,
//  “ImageryTransportation”, “ShadedRelief”, “ShadedReliefLabels”, “Terrain”,
//  “TerrainLabels” or “USATopo”

var t = L.terminator();
t.addTo(map);
setInterval(function () {
  updateTerminator(t);
}, 500);
function updateTerminator(t) {
  t.setTime();
}

const issIcon = L.icon({
  iconUrl: "iss200.png",
  iconSize: [80, 80],
  iconAnchor: [40, 40],
});

let marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

var circle = L.circle([0, 0], {
  color: "white",
  fillColor: "white",
  fillOpacity: 0.5,
  radius: 400000,
}).addTo(map);

// !---------------
