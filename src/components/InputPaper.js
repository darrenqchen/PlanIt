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
import PlanitLogoFilled from './PlanitLogoFilled';
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

export default function InputPaper() {
  const [srcLoc, setSrcLoc] = useState('');
  const [dstLoc, setDstLoc] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numTravelers, setNumTravelers] = useState('1');
  const [modesOfTranspo, setModesOfTranspo] = useState(['air', 'road', 'rail']);

  return (
    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={3}
        paddingTop={2}
        paddingLeft={2}
        paddingBottom={2}
        sx={{ height: '100%' }}
      >
        <Paper
          elevation={3}
          sx={{ height: '100%', position: 'absolute', zIndex: 1, width: '22%' }}
        >
          <Stack>
            <Typography paddingLeft={2} variant="h3">
              planit
            </Typography>
            <TextField
              label="Starting Location"
              variant="outlined"
              value={srcLoc}
              onChange={(event) => {
                setSrcLoc(event.target.value);
              }}
            />
            <TextField
              label="Destination"
              variant="outlined"
              value={dstLoc}
              onChange={(event) => {
                setDstLoc(event.target.value);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            </LocalizationProvider>
            <TextField
              value={numTravelers}
              onChange={(event) => {
                setNumTravelers(event.target.value);
              }}
              select
              label="Number of Travellers"
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
            <Stack
              sx={{ height: 100, paddingTop: 2, paddingLeft: 2 }}
              spacing={5}
              direction="row"
            >
              <Stack>
                <Slider
                  aria-label="Cost"
                  orientation="vertical"
                  valueLabelDisplay="auto"
                  defaultValue={100}
                  color="primary"
                />
                <AttachMoneyIcon color="primary" />
              </Stack>
              <Stack>
                <Slider
                  aria-label="Emissions"
                  orientation="vertical"
                  defaultValue={100}
                  valueLabelDisplay="auto"
                  color="secondary"
                />
                <Co2Icon color="secondary" />
              </Stack>

              <Stack>
                <Slider
                  getAriaLabel={() => 'Travel Time'}
                  orientation="vertical"
                  defaultValue={100}
                  valueLabelDisplay="auto"
                  color="warning"
                />
                <AccessTimeIcon color="warning" />
              </Stack>
            </Stack>
          </Stack>
          <ToggleButtonGroup
            value={modesOfTranspo}
            exclusive
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
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log('trying to run workflow');
            }}
          >
            planit
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}
