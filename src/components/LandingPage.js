import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Stack,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { borderRadius } from '@mui/system';

import PlanitLogoFilled from './PlanitLogoFilled';
import VideoBackground from './VideoBackground';


const LandingPage = () => {
  const videoRef = `../videos/waves.mp4`

  const [activeBackground, setActiveBackground] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const potentialBackgrounds = [
    {
      url: `../videos/waves.mp4`,
      name: 'Bay of Fundy',
      location: 'Canada',
      carbonCost: '120kgCE',
      description: 'Stunning views of changing tides'
    },
    {
      url: `../videos/pyramids.mp4`,
      name: 'Pyramids of Giza',
      location: 'Egypt',
      carbonCost: '140kgCE',
      description: 'Explore an ancient wonder'
    },
    {
      url: `../videos/mountain-range.mp4`,
      name: 'Mount McKinley',
      location: 'Alaska, USA',
      carbonCost: '90kgCE',
      description: 'Beautiful scenery tucked away in the last frontier'
    }
  ];

  useEffect(() => {
    if (firstRender) {
      setActiveBackground(
        potentialBackgrounds[
          Math.floor(Math.random() * potentialBackgrounds.length)
        ]
      );
    }
    setFirstRender(false);
  });

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1))`,
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0
      }}
    >
      <div
        style={{
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          position: "absolute"
        }}
      >
        <VideoBackground
          videoRef={activeBackground.url}
          style={{
            margin: 0,
            padding: 0,
            position: 'absolute',
            margin: 0,
            objectFit: 'cover'
          }}
        ></VideoBackground>
      </div>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        width={'100%'}
        height={'100%'}
        margin={'0%'}
        padding={'10%'}
        position="absolute"
        zIndex={1}
      >
        <Grid
          item
          width={'100%'}
          marginBottom={'2%'}
          container
          justifyContent="space-between"
        >
          <PlanitLogoFilled />
          <Card
            sx={{
              minWidth: 200,
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)'
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Typography variant="p" color="text.secondary" gutterBottom>
                  {activeBackground.name}
                </Typography>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  color="primary.dark"
                  flexItem
                />
                <Typography variant="p" color="text.secondary" gutterBottom>
                  {activeBackground.location}
                </Typography>
              </Stack>
              <Typography variant="p" color="text.secondary" component="div">
                {activeBackground.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton>
                <ModeOfTravelIcon color="primary.dark" />
              </IconButton>
              <Typography paddingLeft={1} color="text.secondary">
                Plan a trip here
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item width={'100%'} container direction="column">
          <Typography
            variant="h2"
            color="text.secondary"
            maxWidth={'50%'}
            marginBottom={'2%'}
          >
            {'travel made cleaner.'}
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth={500}>
            {
              'The only tool designed to plan your trip and minimize your carbon footprint at every step of your journey.'
            }
          </Typography>
        </Grid>
        <Grid item container justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{
              minWidth: 250,
              backdropFilter: 'blur(5px)',
              color: 'rgba(255, 255, 255)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              borderColor: 'rgba(255, 255, 255)',
              borderWidth: '1px',
              borderRadius: '20px'
            }}
            endIcon={<div></div>}
          >
            {'Plan your trip'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
