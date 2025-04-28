"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface City {
  name: string;
  timezone: string;
  coordinates: [number, number];
}

interface WatchMapProps {
  selectedCity: City;
  cities: City[];
  onSelectCity: (city: City) => void;
}

// Ícone vermelho para cidade selecionada
const selectedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Ícone cinza para as outras cidades
const defaultIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
};

const WatchMap: React.FC<WatchMapProps> = ({ selectedCity, cities, onSelectCity }) => {
  return (
    <MapContainer
      center={selectedCity.coordinates}
      zoom={3}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "400px", borderRadius: "8px" }}
    >
      <MapUpdater center={selectedCity.coordinates} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      {cities.map((city) => (
        <Marker
          key={city.name}
          position={city.coordinates}
          icon={city.name === selectedCity.name ? selectedIcon : defaultIcon}
          eventHandlers={{
            click: () => onSelectCity(city),
          }}
        >
          <Popup>
            <strong>{city.name}</strong>
            <br />
            Fuso horário: {city.timezone}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WatchMap;




// "use client";

// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Define a interface para cada cidade
// export interface City {
//   name: string;
//   timezone: string;
//   coordinates: [number, number];
// }

// // Props que o componente WatchMap irá receber
// interface WatchMapProps {
//   selectedCity: City;
//   cities: City[];
//   onSelectCity: (city: City) => void;
// }

// // Ícones personalizados para os marcadores
// const defaultIcon = new L.Icon({
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// const selectedIcon = new L.Icon({
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// const WatchMap: React.FC<WatchMapProps> = ({ selectedCity, cities, onSelectCity }) => {
//   return (
//     <MapContainer
//       center={selectedCity.coordinates}
//       zoom={3}
//       style={{ width: "100%", height: "400px", borderRadius: "8px" }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
//       />
//       {cities.map((city) => (
//         <Marker
//           key={city.name}
//           position={city.coordinates}
//           icon={city.name === selectedCity.name ? selectedIcon : defaultIcon}
//           eventHandlers={{
//             click: () => onSelectCity(city),
//           }}
//         >
//           <Popup>
//             <strong>{city.name}</strong>
//             <br />
//             Fuso horário: {city.timezone}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default WatchMap;
