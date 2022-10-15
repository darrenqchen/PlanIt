import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import useScript from '../hooks/useScript';

import '../styles/Map.css';

function initMap() {
  map = new WoosMap.map.Map(document.getElementById('map'), {
    center: { lat: 51.50940214, lng: -0.133012 },
    zoom: 13
  });
}

const WoosMap = () => {
  const mapContainerRef = useRef(null);
  const woosmapLoaded = useScript(
    `https://sdk.woosmap.com/map/map.js?key=woos-48c80350-88aa-333e-835a-07f4b658a9a4&callback=initMap`
  );

  useEffect(() => {
    if (woosmapLoaded) {
      console.log('loaded');
    }
  }, [woosmapLoaded]);

  const initMap = () => {
    map = new woosmap.map.Map(document.getElementById('map'), {
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
