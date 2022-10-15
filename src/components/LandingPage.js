import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Stack,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Hidden
} from '@mui/material';
import Typography from '@mui/material/Typography';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { useNavigate } from 'react-router-dom';

import PlanitLogoFilled from './PlanitLogoFilled';
import VideoBackground from './VideoBackground';

const LandingPage = () => {
  const [activeBackground, setActiveBackground] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const navigate = useNavigate();
  const potentialBackgrounds = [
    {
      url: `../videos/waves.mp4`,
      name: 'Bay of Fundy',
      location: 'Canada',
      carbonCost: '120kgCE',
      description: 'Stunning views of changing tides'
    },
    {
      url: `../videos/mountain-range.mp4`,
      name: 'Mount McKinley',
      location: 'Alaska, USA',
      carbonCost: '90kgCE',
      description: 'Beautiful scenery tucked away in the last frontier'
    },
    {
      url: `../videos/night-sky.mp4`,
      name: 'Yellowstone National Park',
      location: 'Wyoming, USA',
      carbonCost: '90kgCE',
      description: 'America\'s first national park'
    },
    {
      url: `../videos/white-mountains.mp4`,
      name: 'White Mountains',
      location: 'New Hampshire, USA',
      carbonCost: '90kgCE',
      description: 'Stunning fall foliage'
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
        padding: 0,
        overflowY: 'hidden'
      }}
    >
      <div
        style={{
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          position: 'absolute'
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
        backgroundColor="rgba(0, 0, 0, 0.375)"
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
            variant="outlined"
            sx={{
              width: 270,
              height: 120,
              padding: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              backdropFilter: 'blur(5px)',
              color: 'rgba(255, 255, 255)',
              borderColor: 'white',
              boxShadow: 'none',
              borderRadius: '20px'
            }}
          >
            <CardActions>
              <IconButton>
                <ModeOfTravelIcon
                  style={{
                    color: 'rgba(255, 255, 255, 1)'
                  }}
                />
              </IconButton>
              <Typography color="text.secondary" variant="h6">
                Go here
              </Typography>
            </CardActions>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Grid container direction={'column'} maxWidth={'100%'}>
                <Grid
                  item
                  container
                  direction="row"
                  justifyContent={'space-between'}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    marginLeft={6}
                  >
                    {activeBackground.name}, {activeBackground.location}
                  </Typography>
                </Grid>
                <Grid item container direction="row">
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="div"
                    marginLeft={6}
                  >
                    {activeBackground.description}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item width={'100%'} container direction="column">
          <Typography
            variant="h3"
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
        <Grid item container justifyContent="flex-start">
          <Button
            variant="outlined"
            sx={{
              minWidth: 250,
              height: 53.75,
              backdropFilter: 'blur(5px)',
              color: 'rgba(255, 255, 255)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)',
              borderColor: 'rgba(255, 255, 255)',
              borderWidth: '1px',
              borderRadius: '20px'
            }}
            endIcon={<div></div>}
            onClick={() => {
              navigate('/plan');
            }}
          >
            {'Plan your trip'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingPage;
