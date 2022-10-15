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
import PlanitLogoOutlined from './PlanitLogoOutlined';
import PlanitLogoTextUnder from './PlanitLogoTextUnder';
import ChooseApiClient from '../apiClients/choooseApiClient';

const LandingPage = () => {
  const [activeBackground, setActiveBackground] = useState({});
  const [firstRender, setFirstRender] = useState(true);
  const potentialBackgrounds = [
    {
      url: '/chichenitza.jpg',
      name: 'Chichen Itza',
      location: 'Mexico',
      carbonCost: '140kgCE',
      description: 'a lovely place to visit'
    },
    {
      url: '/grandcanyon.jpg',
      name: 'Grand Canyon',
      location: 'USA',
      carbonCost: '140kgCE',
      description: 'beautiful and awe inspiring'
    },
    {
      url: '/iceland.jpg',
      name: 'Iceland Beach',
      carbonCost: '140kgCE',
      location: 'Iceland',

      description: "don't freeze when you come here"
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
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), 
                url(${activeBackground.url})`,

        backgroundSize: 'cover',
        height: '100vh'
      }}
    >
      <Stack
        paddingTop={'7%'}
        paddingLeft={'10%'}
        direction="row"
        spacing={'45%'}
      >
        <Stack alignItems="start" spacing={2}>
          <PlanitLogoTextUnder />
          <Typography variant="h5" color="text.secondary" maxWidth={500}>
            {
              'The only tool designed to plan your trip and minimize your carbon footprint at every step of your journey.'
            }
          </Typography>
        </Stack>
        <Stack alignItems="start" spacing="140%">
          <Card
            sx={{
              minWidth: 200,
              backdropFilter: 'blur(14px)',
              backgroundColor: 'rgba(255, 255, 255, 0.01)'
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {activeBackground.name}
                </Typography>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  color="primary.dark"
                  flexItem
                />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  {activeBackground.location}
                </Typography>
              </Stack>
              <Typography variant="h6" color="text.secondary" component="div">
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
          <div>
            <Button
              variant="outlined"
              sx={{
                minWidth: 200,
                backdropFilter: 'blur(1px)',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                borderRadius: '20px'
              }}
              endIcon={<div></div>}
              onClick={() => {
                const apiClient = new ChooseApiClient();
              }}
            >
              {'Plan your trip'}
            </Button>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default LandingPage;
