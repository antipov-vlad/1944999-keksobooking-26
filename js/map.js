
import { disablingMap,enabledMap } from './toggle-status-map.js';
import generateArrayData from './data.js';
import generateTemplate from './generate-template.js';

const inputeAddress = document.querySelector('#address');
const formFilter = document.querySelector('.map__filters');
const inputeGuests = formFilter.querySelector('#housing-guests');
const inputeRooms = formFilter.querySelector('#housing-rooms');
const inputePrice = formFilter.querySelector('#housing-price');
const inputeType = formFilter.querySelector('#housing-type');


disablingMap();

const map = L.map('map-canvas')
  .on('load', () => {
    enabledMap ();
  })
  .setView({
    lat: 35.658553299865794,
    lng:  139.77657171642844
  },
    12
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon ({
  iconUrl:'./img/main-pin.svg',
  iconSize:[52,52],
  iconAnchor:[26,52]
})

const marker = L.marker({
    lat: 35.658553299865794,
    lng:  139.77657171642844,
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
).addTo(map);

marker.on('moveend', (evt) => {
  inputeAddress.value = evt.target.getLatLng()
})

const usuallyPinIcon= L.icon(
  {
  iconUrl:'./img/pin.svg',
  iconSize:[40,40],
  iconAnchor:[20,40]
  }
)

const infoNotifications = generateArrayData(10);
const popupsFragment = generateTemplate(infoNotifications);


const showMarkers =  (infoNotifications,popups ) => {
  for (let i=0; i <infoNotifications.length; i++){
    L.marker(
      {
        lat: infoNotifications[i].offer.adress.lat,
        lng:  infoNotifications[i].offer.adress.lng,
      },
      {
        icon:usuallyPinIcon
      })
      .bindPopup(popups.children[i])
      .addTo(markerGroup)
  }
}
showMarkers(infoNotifications,popupsFragment)
// console.log(infoNotifications)


formFilter.addEventListener('change', (evt) => {
  markerGroup.clearLayers();

  const filteredInfoNotifications = infoNotifications.filter((infoNotification) => {
    // debugger
    return String(infoNotification.offer.guest) <= inputeGuests.value || inputeGuests.value ==='any'
  })
  .filter((infoNotification) => {
    return String(infoNotification.offer.rooms) === inputeRooms.value || inputeRooms.value ==='any'
  })
  .filter((infoNotification) => {
    if (inputePrice.value === 'middle'){
      return 10000 <= infoNotification.offer.price && infoNotification.offer.price <= 50000
    }
    if (inputePrice.value === 'low') {
      return  infoNotification.offer.price <= 10000
    }
    if (inputePrice.value === 'hight'){
      return 50000 <= infoNotification.offer.price
    }
    return true
  })
  .filter((infoNotification) => {
    return infoNotification.offer.type === inputeType.value || inputeType.value ==='any'
  })


  const filteredPopups = generateTemplate(filteredInfoNotifications)
  showMarkers(filteredInfoNotifications,filteredPopups)

//   if (evt.target.id === 'housing-rooms') {
// .filter((infoNotification) => {
//     return String(infoNotification.offer.rooms) === evt.target.value || evt.target.value ==='any'
//   })
//   }
//Настройка фильтрации количества комнат и гостей
  // showMarkers(infoNotifications,generateTemplate(infoNotifications))

})
// console.log(popups)
// console.log(document.querySelector('#housing-guests').value)
export {map,marker}
