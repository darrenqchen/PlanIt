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
  Button
} from '@mui/material';
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
import WOosMapApiClient from '../apiClients/woosmapApiClient';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

export default function InputPaper() {
  const [srcLoc, setSrcLoc] = useState('');
  const [dstLoc, setDstLoc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numTravelers, setNumTravelers] = useState('1');
  const [modesOfTranspo, setModesOfTranspo] = useState(['air', 'road', 'rail']);
  const [loading, setLoading] = useState(true)

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
                    <Stack direction="column" spacing={0.5} height={'165px'} justifyContent={'space-between'} alignItems={'center'}>
                      <Slider
                        aria-label="Cost"
                        orientation="vertical"
                        valueLabelDisplay="auto"
                        defaultValue={50}
                        color="primary"
                      />
                      <AttachMoneyIcon color="primary" />
                    </Stack>

                    <Stack direction="column" spacing={0.5} justifyContent={'space-between'} alignItems={'center'}>
                      <Slider
                        aria-label="Emissions"
                        orientation="vertical"
                        defaultValue={50}
                        valueLabelDisplay="auto"
                        color="secondary"
                      />
                      <Co2Icon color="secondary" />
                    </Stack>

                    <Stack direction="column" spacing={0.5} justifyContent={'space-between'} alignItems={'center'}>
                      <Slider
                        getAriaLabel={() => 'Travel Time'}
                        orientation="vertical"
                        defaultValue={50}
                        valueLabelDisplay="auto"
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
                  size = "large"
                  fullWidth = "true"
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
                    const woosmapClient = new WOosMapApiClient();

                    // get source and dest lat, long as dict {lat, long}
                    const srcLocality = await woosmapClient.getLocalityLocation(
                      'paris'
                    );
                    const dstLocality = await woosmapClient.getLocalityLocation(
                      'boston'
                    );
                    const scrCoords = srcLocality.localities[0].location;
                    const dstCoords = dstLocality.localities[0].location;
                  }}
                >
                  planit
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
