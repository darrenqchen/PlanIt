import React, { useRef, useEffect, useState } from 'react';
import conf from '../woosmapConfig.json';
import useScript from '../hooks/useScript';

import '../styles/Map.css';
import poi from '../woosmapPython/poi.json';
import hotels from '../woosmapPython/hotels_poi.json';
import Infobox from './WoosMapInfobox';
import { Button, Icon, Stack, Typography, Paper } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const Map = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const woosmapLoaded = useScript(conf.woosmapMapJSUrl);
  const [selectedPOI, setSelectedPOI] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [showItinerary, setShowItinerary] = useState(false);
  const [poiType, setPoiType] = useState(null);
  const [showInfo, setShowInfo] = useState(true);


  useEffect(() => {
    if (woosmapLoaded && !map) {
      setMap(initMap());
    }
  }, [woosmapLoaded]);

  const initMap = () => {
    const map = new window.woosmap.map.Map(
      mapContainerRef.current,
      conf.woosmapMapOptions
    );
    poi.data.forEach((data) => {
      map.data.add({
        geometry: new window.woosmap.map.Data.Point({
          lat: data.latitude,
          lng: data.longitude
        }),
        properties: { name: data.data__name, type: 'poi' }
      });
    });
    hotels.hotels.forEach((data) => {
      map.data.add({
        geometry: new window.woosmap.map.Data.Point({
          lat: data.Latitude,
          lng: data.Longitude
        }),
        properties: { name: data.Name, type: 'hotel' }
      });
    });

    map.data.setStyle(function (feature) {
      let iconPint =
        'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzNHB4IiB2aWV3Qm94PSIwIDAgMzQgMzQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+T3ZhbDwvdGl0bGU+CiAgICA8ZGVmcz4KICAgICAgICA8Y2lyY2xlIGlkPSJwYXRoLTEiIGN4PSIxNyIgY3k9IjE1IiByPSIxMyI+PC9jaXJjbGU+CiAgICAgICAgPGZpbHRlciB4PSItMjYuOSUiIHk9Ii0xOS4yJSIgd2lkdGg9IjE1My44JSIgaGVpZ2h0PSIxNTMuOCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImZpbHRlci0yIj4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIwIiBkeT0iMiIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlR2F1c3NpYW5CbHVyPgogICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49InNoYWRvd0JsdXJPdXRlcjEiIGluMj0iU291cmNlQWxwaGEiIG9wZXJhdG9yPSJvdXQiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUNvbXBvc2l0ZT4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNSAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iT3ZhbCI+CiAgICAgICAgICAgIDx1c2UgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMSIgZmlsdGVyPSJ1cmwoI2ZpbHRlci0yKSIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgIDxjaXJjbGUgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0ic3F1YXJlIiBmaWxsPSIjRTJCOTY3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGN4PSIxNyIgY3k9IjE1IiByPSIxMS41Ij48L2NpcmNsZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==';
      if (feature.getProperty('highlighted')) {
        iconPint =
          'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzRweCIgaGVpZ2h0PSIzNHB4IiB2aWV3Qm94PSIwIDAgMzQgMzQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+T3ZhbDwvdGl0bGU+CiAgICA8ZGVmcz4KICAgICAgICA8Y2lyY2xlIGlkPSJwYXRoLTEiIGN4PSIxNyIgY3k9IjE1IiByPSIxMyI+PC9jaXJjbGU+CiAgICAgICAgPGZpbHRlciB4PSItMjYuOSUiIHk9Ii0xOS4yJSIgd2lkdGg9IjE1My44JSIgaGVpZ2h0PSIxNTMuOCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImZpbHRlci0yIj4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR4PSIwIiBkeT0iMiIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSI+PC9mZU9mZnNldD4KICAgICAgICAgICAgPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIgaW49InNoYWRvd09mZnNldE91dGVyMSIgcmVzdWx0PSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlR2F1c3NpYW5CbHVyPgogICAgICAgICAgICA8ZmVDb21wb3NpdGUgaW49InNoYWRvd0JsdXJPdXRlcjEiIGluMj0iU291cmNlQWxwaGEiIG9wZXJhdG9yPSJvdXQiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUNvbXBvc2l0ZT4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuNSAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iT3ZhbCI+CiAgICAgICAgICAgIDx1c2UgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMSIgZmlsdGVyPSJ1cmwoI2ZpbHRlci0yKSIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgIDxjaXJjbGUgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lam9pbj0ic3F1YXJlIiBmaWxsPSIjNjI2MjYyIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGN4PSIxNyIgY3k9IjE1IiByPSIxMS41Ij48L2NpcmNsZT4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==';
      }
      return {
        icon: iconPint
      };
    });

    let highlightedFeatureId;
    map.data.addListener('click', function (event) {
      if (highlightedFeatureId) {
        map.data
          .getFeatureById(highlightedFeatureId)
          .setProperty('highlighted', false);
      }
      // document.getElementById(
      //   "info"
      // ).innerHTML = `<strong>${event.feature.getProperty("name")}</strong>`;
      event.feature.setProperty('highlighted', true);
      highlightedFeatureId = event.feature.id;
      setSelectedPOI(event.feature.getProperty('name'));
      setPoiType(event.feature.getProperty('type'));
      //console.log(event.feature.getProperty("type"))
      setShowInfo(true);
    });
  };

  function makeItinerary() {
    if (showItinerary) {
      return (
        <Paper className="itinerary">
          <Stack>
            {itinerary.map((element) => {
              return <Typography key="">{element}</Typography>;
            })}
          </Stack>
          <Button
            onClick={() => {
              setItinerary([]);
            }}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              setShowItinerary(false);
            }}
          >
            Hide
          </Button>
        </Paper>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className="mapContainer">
      <div ref={mapContainerRef} />
      <div />

            <Infobox
              showbox={showInfo}
              setshowbox={setShowInfo}
              poitype={poiType}
              poi={selectedPOI}
              value={itinerary}
              set={setItinerary}
            ></Infobox>
      <Icon className="showItinerary">
        <FormatListBulletedIcon
          onClick={() => {
            setShowItinerary(!showItinerary);
          }}
        ></FormatListBulletedIcon>
      </Icon>
      {makeItinerary()}
    </div>
  );
};

export default Map;
