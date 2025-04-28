"use client";

// Watch.tsx
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import '../app/components.css'

export interface City {
  name: string;
  timezone: string;
  coordinates: [number, number];
}

const cities: City[] = [
  { name: 'Brasília', timezone: 'America/Sao_Paulo', coordinates: [-15.793889, -47.882778] },
  { name: 'Nova York', timezone: 'America/New_York', coordinates: [40.7128, -74.0060] },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', coordinates: [34.0522, -118.2437] },
  { name: 'Chicago', timezone: 'America/Chicago', coordinates: [41.8781, -87.6298] },
  { name: 'Londres', timezone: 'Europe/London', coordinates: [51.5074, -0.1278] },
  { name: 'Paris', timezone: 'Europe/Paris', coordinates: [48.8566, 2.3522] },
  { name: 'Berlim', timezone: 'Europe/Berlin', coordinates: [52.52, 13.405] },
  { name: 'Roma', timezone: 'Europe/Rome', coordinates: [41.9028, 12.4964] },
  { name: 'Madri', timezone: 'Europe/Madrid', coordinates: [40.4168, -3.7038] },
  { name: 'Moscou', timezone: 'Europe/Moscow', coordinates: [55.7558, 37.6173] },
  { name: 'Tóquio', timezone: 'Asia/Tokyo', coordinates: [35.6895, 139.6917] },
  { name: 'Pequim', timezone: 'Asia/Shanghai', coordinates: [39.9042, 116.4074] },
  { name: 'Sydney', timezone: 'Australia/Sydney', coordinates: [-33.8688, 151.2093] },
  { name: 'Auckland', timezone: 'Pacific/Auckland', coordinates: [-36.8485, 174.7633] },
  { name: 'Dubai', timezone: 'Asia/Dubai', coordinates: [25.2048, 55.2708] },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', coordinates: [22.3193, 114.1694] },
  { name: 'Singapura', timezone: 'Asia/Singapore', coordinates: [1.3521, 103.8198] },
  { name: 'Bangkok', timezone: 'Asia/Bangkok', coordinates: [13.7563, 100.5018] },
  { name: 'Jacarta', timezone: 'Asia/Jakarta', coordinates: [-6.2088, 106.8456] },
  { name: 'Cairo', timezone: 'Africa/Cairo', coordinates: [30.0444, 31.2357] },
  { name: 'Joanesburgo', timezone: 'Africa/Johannesburg', coordinates: [-26.2041, 28.0473] },
  { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', coordinates: [-34.6037, -58.3816] },
  { name: 'Santiago', timezone: 'America/Santiago', coordinates: [-33.4489, -70.6693] },
  { name: 'Cidade do México', timezone: 'America/Mexico_City', coordinates: [19.4326, -99.1332] },
  { name: 'Toronto', timezone: 'America/Toronto', coordinates: [43.6532, -79.3832] },
  { name: 'Calcutá', timezone: 'Asia/Kolkata', coordinates: [22.5726, 88.3639] },
  { name: 'Istambul', timezone: 'Europe/Istanbul', coordinates: [41.0082, 28.9784] },
  { name: 'São Francisco', timezone: 'America/Los_Angeles', coordinates: [37.7749, -122.4194] },
  { name: 'Seul', timezone: 'Asia/Seoul', coordinates: [37.5665, 126.978] },
  { name: 'Riad', timezone: 'Asia/Riyadh', coordinates: [24.7136, 46.6753] },
  { name: 'Nairobi', timezone: 'Africa/Nairobi', coordinates: [-1.2921, 36.8219] },
  { name: 'Estocolmo', timezone: 'Europe/Stockholm', coordinates: [59.3293, 18.0686] },
  { name: 'Zurique', timezone: 'Europe/Zurich', coordinates: [47.3769, 8.5417] },
];

const WatchMap = dynamic(() => import("./WatchMap"), { ssr: false });

const Watch: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateTime = () => {
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: selectedCity.timezone,
    };

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: selectedCity.timezone,
    };

    try {
      const timeText = new Intl.DateTimeFormat("pt-BR", timeOptions).format(currentTime);
      const dateText = new Intl.DateTimeFormat("pt-BR", dateOptions).format(currentTime);
      const dateParts = dateText.split(", ");
      return {
        timeText,
        dayOfWeekText: dateParts[0],
        dayText: dateParts[1] || "",
      };
    } catch {
      return { timeText: "00:00:00", dayOfWeekText: "", dayText: "Erro ao formatar data e hora" };
    }
  };

  const { timeText, dayOfWeekText, dayText } = formatDateTime();

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const city = cities.find((c) => c.name === event.target.value);
    if (city) setSelectedCity(city);
  };

  if (!isMounted) return null;

  return (
    <div className="h-screen flex-4 mx-auto bg-slate-950 text-slate-100 p-6 shadow-lg border-2 border-slate-100 ">
     

      <h2 className="text-2xl font-bold mb-4 text-center">Relógio Mundial</h2>
      <div className="text-center mb-4">
        <div className="text-3xl font-bold mb-2">{timeText}</div>
        <div className="text-lg capitalize">{dayOfWeekText}</div>
        <div className="text-md">{dayText}</div>
        <div className="mt-2 text-sm text-slate-300">Fuso horário: {selectedCity.timezone}</div>
      </div>
      <div className="mb-4">
        <label htmlFor="citySelect" className="block mb-2 text-sm font-medium">
          Selecione uma cidade:
        </label>
        <select
          id="citySelect"
          className="w-full p-2.5 rounded-md bg-slate-800 text-white border border-slate-300 focus:ring-2 focus:ring-slate-500 focus:outline-none"
          value={selectedCity.name}
          onChange={handleCityChange}
        >
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <WatchMap
          selectedCity={selectedCity}
          cities={cities}
          onSelectCity={setSelectedCity}
        />
      </div>

      
      
    </div>
  );
};

export default Watch;



