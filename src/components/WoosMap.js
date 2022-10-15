import React, { useRef, useEffect, useState } from 'react';
import useScript from '../hooks/useScript';

import '../styles/Map.css';

const WoosMap = () => {
  const mapContainerRef = useRef(null);
  const woosmapLoaded = useScript(
    `https://sdk.woosmap.com/map/map.js?key=woos-48c80350-88aa-333e-835a-07f4b658a9a4`
  );

  useEffect(() => {
    if (woosmapLoaded) {
      console.log('loaded');
    }
  }, [woosmapLoaded]);

  const initMap = () => {
    map = new woosmap.map.Map(mapContainerRef.current, {
      center: { lat: 51.50940214, lng: -0.133012 },
      zoom: 13
    });
  };

  return (
    <div>
      <div className="mapContainer" ref={mapContainerRef} />
    </div>
  );
};

export default WoosMap;
