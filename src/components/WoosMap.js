import React, { useRef, useEffect, useState } from 'react';
import conf from '../woosmapConfig.json';
import useScript from '../hooks/useScript';

import '../styles/Map.css';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const woosmapLoaded = useScript(conf.woosmapMapJSUrl);

  useEffect(() => {
    if (woosmapLoaded) {
      setMap(initMap());
    }
  }, [woosmapLoaded]);

  const initMap = () => {
    const map = new window.woosmap.map.Map(
      mapContainerRef.current,
      conf.woosmapMapOptions
    );
    return map;
  };

  return (
    <div className="mapContainer">
      <div ref={mapContainerRef} />
      <div />
    </div>
  );
};
export default Map;
