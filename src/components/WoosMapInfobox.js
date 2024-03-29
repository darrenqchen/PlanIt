/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import conf from '../woosmapConfig.json';
import useScript from '../hooks/useScript';
import { Button, Typography, Stack, Paper } from '@mui/material';

import '../styles/InfoBox.css';


const Infobox = ({ showbox, setshowbox, poitype, poi, value, set }) => {
  if (!poi || !showbox) {
    return <div></div>;
  } else {
    return (
      <Paper
        className="infoBox"
        id={`infobox-${poi}`}
      >

        <Stack>
          <Typography variant="h4">{poi}</Typography>
          <Button
            onClick={() => {
              set((value) => [...value, poi]);
            }}
          >
            <Typography>Add to itinerary</Typography>
          </Button>

          <Button onClick={() => {setshowbox(false)}}>
            <Typography>Close</Typography>
          </Button>

        </Stack>
      </Paper>
    );
  }
};
export default Infobox;
