// const url = "https://sdk.woosmap.com/localities/localitieswidget.2.0.js?key=woos-b15dcbad-3a4e-3b3b-a974-ebc501caa1cd"

// new woosmap.localities.Autocomplete('myInputID', {types: "locality"});

// import React, { useEffect, useState } from 'react';
// import conf from '../woosmapConfig.json';
// import useScript from '../hooks/useScript';

// import '../styles/Map.css';
// import { Autocomplete } from '@mui/material';

// const WoosMapLocalities = () => {
//   const woosmapLoaded = useScript(url);
//   const [localityAuto, setLocalityAuto] = useState()

//   useEffect(() => {
//     if (woosmapLoaded) {
//         setLocalityAuto(new woosmap.localities.Autocomplete('autoCompleteContainer', {types: 'locality', "components": {
//             "country": ["fr", "us"]
//         } }))
//     }
//   }, [woosmapLoaded]);

//   const initMap = () => {
//     const map = new window.woosmap.map.Map(
//       mapContainerRef.current,
//       conf.woosmapMapOptions
//     );
//     return map;
//   };

//   return (
//     <Autocomplete className="autoCompleteContainer" id="autoCompleteContainer">

//     </Autocomplete>
//   );
// };
// export default WoosMapLocalities;
