
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HostelMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState('');
  const [isMapVisible, setIsMapVisible] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [76.9558, 11.0168], // Coimbatore coordinates
      zoom: 14
    });

    // Add marker for CIET
    new mapboxgl.Marker()
      .setLngLat([76.9558, 11.0168])
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  };

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      {!isMapVisible ? (
        <div className="p-4 space-y-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Please enter your Mapbox public token to view the map:</p>
          <Input
            type="text"
            placeholder="Enter Mapbox token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <Button 
            onClick={() => {
              setIsMapVisible(true);
              initializeMap();
            }}
            className="w-full"
          >
            Show Map
          </Button>
          <p className="text-xs text-gray-500">
            You can get your public token from <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Mapbox</a>
          </p>
        </div>
      ) : (
        <div ref={mapContainer} className="w-full h-full" />
      )}
    </div>
  );
};

export default HostelMap;
