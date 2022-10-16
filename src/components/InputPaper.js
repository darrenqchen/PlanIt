import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import {
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import { borderColor, borderRadius, borders } from '@mui/system';
import PlanitLogoOutlined from './PlanitLogoOutlined';
import WoosMapLocalities from './WoosMapLocalities';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Co2Icon from '@mui/icons-material/Co2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import WoosMapApiClient from '../apiClients/woosmapApiClient';
import AmadeusAPI from '../apiClients/amadeusAPI';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Graph from '../graphUtils/Graph';

export default function InputPaper() {
  const [srcLoc, setSrcLoc] = useState('');
  const [dstLoc, setDstLoc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numTravelers, setNumTravelers] = useState('1');
  const [modesOfTranspo, setModesOfTranspo] = useState(['air', 'road', 'rail']);
  const [loading, setLoading] = useState(true);
  const [userCarbon, setUserCarbon] = useState(50);
  const [userTime, setUserTime] = useState(50);
  const [userDollars, setUserDollars] = useState(50);
  const [routes, setRoutes] = useState([
    {
      links: ['ORN', 'MRN', 'ORY'],
      carbon: '1840kgCo2e',
      cost: '$923',
      time: '12:45'
    },
    {
      links: ['ORN', 'JFK', 'ORY'],
      carbon: '1987kgCo2e',
      cost: '$1423',
      time: '17:45'
    },
    {
      links: ['ORN', 'JFK', 'ORY'],
      carbon: '1840kgCo2e',
      cost: '$923',
      time: '17:45'
    }
  ]);
  const [routeData, setRouteData] = useState(false);

  return (
    <Grid container sx={{ height: '100%' }}>
      <Grid
        item
        xs={3}
        paddingTop={4}
        paddingLeft={4}
        paddingBottom={4}
        sx={{ height: '100%' }}
      >
        <Paper
          elevation={4}
          sx={{
            height: '100%',
            position: 'absolute',
            zIndex: 1,
            width: '25%',
            padding: '1%',
            backgroundColor: '#FBFAF8'
          }}
        >
          <Stack spacing={2}>
            <Typography paddingLeft={2} variant="h3">
              planit
            </Typography>
            <TextField
              label="Starting Location"
              InputLabelProps={{
                style: { color: 'black' }
              }}
              variant="outlined"
              value={srcLoc}
              onChange={(event) => {
                setSrcLoc(event.target.value);
              }}
            />
            <TextField
              label="Destination"
              InputLabelProps={{
                style: { color: 'black' }
              }}
              variant="outlined"
              value={dstLoc}
              onChange={(event) => {
                setDstLoc(event.target.value);
              }}
              sx={{ color: 'red' }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" spacing={2}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/DD/YYYY"
                  value={startDate}
                  onChange={(change) => {
                    setStartDate(change);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="End Date"
                  inputFormat="MM/DD/YYYY"
                  value={endDate}
                  onChange={(change) => {
                    setEndDate(change);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>

            {/* 2 column setup */}
            <Stack direction="row" spacing={2} width={'100%'} height={'180px'}>
              {/* holds sliders above mode of transport selector */}
              <Stack direction="column" spacing={2} width={'50%'}>
                {/* sliders */}
                <Stack
                  alignItems={'center'}
                  justifyContent={'space-around'}
                  width={'100%'}
                >
                  <Stack
                    direction={'row'}
                    spacing={2}
                    width={'100%'}
                    padding={'5px'}
                    paddingTop={'10px'}
                    justifyContent={'space-around'}
                    sx={{
                      border: 1,
                      borderRadius: '10px',
                      borderColor: 'lightgray'
                    }}
                  >
                    <Stack
                      direction="column"
                      spacing={0.5}
                      height={'165px'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Slider
                        aria-label="Cost"
                        orientation="vertical"
                        valueLabelDisplay="auto"
                        defaultValue={50}
                        value={
                          typeof userDollars === 'number' ? userDollars : 50
                        }
                        onChange={(event, val) => setUserDollars(val)}
                        color="primary"
                      />
                      <AttachMoneyIcon color="primary" />
                    </Stack>

                    <Stack
                      direction="column"
                      spacing={0.5}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Slider
                        aria-label="Emissions"
                        orientation="vertical"
                        defaultValue={50}
                        value={typeof userCarbon === 'number' ? userCarbon : 50}
                        onChange={(event, val) => setUserCarbon(val)}
                        valueLabelDisplay="auto"
                        color="secondary"
                      />
                      <Co2Icon color="secondary" />
                    </Stack>

                    <Stack
                      direction="column"
                      spacing={0.5}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Slider
                        getAriaLabel={() => 'Travel Time'}
                        orientation="vertical"
                        defaultValue={50}
                        valueLabelDisplay="auto"
                        value={typeof userTime === 'number' ? userTime : 50}
                        onChange={(event, val) => setUserTime(val)}
                        color="warning"
                      />
                      <AccessTimeIcon color="warning" />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              {/* holds travellers and planit */}
              <Stack
                direction="column"
                width={'50%'}
                justifyContent={'space-between'}
              >
                {/* travellers */}
                <TextField
                  value={numTravelers}
                  onChange={(event) => {
                    setNumTravelers(event.target.value);
                  }}
                  select
                  label="Number of Travelers"
                  InputLabelProps={{
                    style: { color: 'black' }
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                </TextField>

                {/* selector */}
                <ToggleButtonGroup
                  value={modesOfTranspo}
                  exclusive
                  size="large"
                  fullWidth="true"
                  onChange={(event, newMode) => {
                    let newArr = [...modesOfTranspo];
                    if (modesOfTranspo.includes(newMode)) {
                      newArr = newArr.filter((ele) => {
                        return ele !== newMode;
                      });
                    } else {
                      newArr.push(newMode);
                    }
                    setModesOfTranspo(newArr);
                  }}
                  color="primary"
                >
                  <ToggleButton value="road" aria-label="road transport">
                    <DriveEtaIcon color="primary.dark" />
                  </ToggleButton>
                  <ToggleButton value="rail" aria-label="rail transport">
                    <DirectionsTransitIcon color="primary.dark" />
                  </ToggleButton>
                  <ToggleButton value="air" aria-label="air transport">
                    <FlightTakeoffIcon color="primary.dark" />
                  </ToggleButton>
                </ToggleButtonGroup>

                {/* planit */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={async () => {
                    const woosmapClient = new WoosMapApiClient();

                    // get source and dest lat, long as dict {lat, long}
                    const srcLocality = await woosmapClient.getLocalityLocation(
                      'london'
                    );
                    const dstLocality = await woosmapClient.getLocalityLocation(
                      'paris'
                    );
                    const srcCoords = srcLocality.localities[0].location;
                    const dstCoords = dstLocality.localities[0].location;

                    // get closest airport
                    const amadeusAccessToken =
                      await AmadeusAPI.getAccessToken();
                    const amadeusAPI = new AmadeusAPI(amadeusAccessToken);

                    console.log('time start');
                    await new Promise((r) => setTimeout(r, 500));
                    console.log('time end');
                    const srcAirport =
                      await amadeusAPI.getNearestAirportByCoords(
                        srcCoords.lat,
                        srcCoords.lng
                      );
                    console.log('time start');
                    await new Promise((r) => setTimeout(r, 500));
                    console.log('time end');
                    const destAirport =
                      await amadeusAPI.getNearestAirportByCoords(
                        dstCoords.lat,
                        dstCoords.lng
                      );

                    const srcAirportCode = srcAirport.data[0].iataCode;
                    const destAirportCode = destAirport.data[0].iataCode;

                    // get flights - mocking because API endpoint is not working
                    const sampleFlights = amadeusAPI.getFlightsMock(
                      srcAirportCode,
                      destAirportCode,
                      startDate
                    );

                    const minData = sampleFlights.data.map((route) => {
                      return {
                        price: route.price.grandTotal,
                        time: route.itineraries[0].duration,
                        links: route.itineraries[0].segments.map((segment) => {
                          return {
                            departure: segment['departure'].iataCode,
                            arrival: segment['arrival'].iataCode
                          };
                        })
                      };
                    });

                    console.log(minData);

                    const graph = new Graph(
                      minData,
                      userTime,
                      userCarbon,
                      userDollars
                    );

                    setRouteData(true);
                  }}
                >
                  planit
                </Button>
              </Stack>
            </Stack>
            {routeData && (
              <Stack spacing={2}>
                <Stack direction="row" spacing={20} alignItems="end">
                  <Typography variant="h4">Routes</Typography>
                  <Link>see sustainable destinations</Link>
                </Stack>
                {routes.map((route, i) => (
                  <Card
                    sx={{
                      minWidth: 275,
                      paddingTop: 2,
                      backgroundColor: '#fdfdfd'
                    }}
                    key={i}
                  >
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.primary"
                        gutterBottom
                      >
                        Travel
                      </Typography>
                      <Typography paddingTop={1}>Legs:</Typography>
                      <Stack direction="row" spacing={2}>
                        {route.links.map((link, j) => (
                          <Typography key={j}>{link}</Typography>
                        ))}
                      </Stack>
                      <Stack direction="row" spacing={2} paddingTop={1}>
                        <Typography>{route.cost}</Typography>
                        <Typography>{route.time}</Typography>
                        <Typography>{route.carbon}</Typography>
                      </Stack>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Add to itinerary</Button>
                    </CardActions>
                  </Card>
                ))}
              </Stack>
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
