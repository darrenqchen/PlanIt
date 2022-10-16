/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import conf from '../woosmapConfig.json';
import useScript from '../hooks/useScript';
import {
    Button,
  } from '@mui/material';

import '../styles/InfoBox.css';

const Infobox = ({poi, value, set}) => {
    if (!poi) {
        return (<div></div>);
    }
    else{
        return (
            <div className='infoBox' id={`infobox-${poi}`}>
                {poi}
                <Button onClick={() => {
                    set(value => [...value, poi])
                    }}>
                Add to itinerary 
                </Button>
            </div>
        );
    }
};
export default Infobox;