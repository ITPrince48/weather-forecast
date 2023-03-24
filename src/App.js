import React, { useState } from 'react'
import {
  Grid,
  Paper,
  Stack,
  Button,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import './App.css'

//UI config
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

function App() {
  const [stdate, setstdate] = useState('')
  const [endate, setendate] = useState('')
  const [city, setcity] = useState('Orlando')
  const [weather, setweather] = useState('')
  const [but,setbut] = useState([]);

  const sendrequ = async (para1, para2) => {
    await fetch(
      `${process.env.REACT_APP_API_URL}${city}/${para1}/${para2}?key=${process.env.REACT_APP_API_KEY}`,
    )
      .then((res) => res.json())
      .then((result) => {
        setweather(result)
      }).catch((err)=>{
        if(err)
        {
          alert('You have exceeded the maximum number of daily result records for your account');
        }
      })
  }

  const test = () => {
    if (!city) {
      alert('City is invalid!');
      return 1;
    }
    else if (!stdate) {
      alert('Date is invalid!');
      return 2;
    }
    else if (!endate) {
      setendate(stdate);
      submit(1)
    }
    else {
      submit(0)
    }
  }


  const submit = (para) => {
    var start = new Date(stdate)
    var end="";
    if (para) {
      end = new Date(stdate);
    }
    else {
      end = new Date(endate)
    }
    var startdate = start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate();
    var enddate = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();
    sendrequ(startdate, enddate)
  }


  return (
    <Grid container sx={{ height: '97vh' }}>
      <Grid item xs={6}>
        <Item sx={{ boxShadow: 'none', mt: '10vh' }}>
          <Grid item>
            <Item sx={{ boxShadow: 'none' }}>
              <Stack direction="row" className="colmns">
                <span style={{ fontSize: '25px' }}>TO&nbsp;:&nbsp;</span>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {(popupState) => (
                    <React.Fragment>
                      <Button variant="contained" {...bindTrigger(popupState)}>
                        Choose from Menu
                      </Button>
                      <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>Profile</MenuItem>
                        <MenuItem onClick={popupState.close}>
                          My account
                        </MenuItem>
                        <MenuItem onClick={popupState.close}>Logout</MenuItem>
                      </Menu>
                    </React.Fragment>
                  )}
                </PopupState>
              </Stack>
              <Stack className="colmns" direction="row">
                <Grid item xs={4}>
                  <Item className="components" sx={{ boxShadow: 'none' }}>
                    <TextField
                      label="Location"
                      value={city}
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setcity(e.target.value)
                      }}
                    />
                    &nbsp;&nbsp;
                    <Button
                      variant="contained"
                      style={{ maxHeight: '40px' }}
                      onClick={test}
                    >
                      Submit
                    </Button>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item className="components" sx={{ boxShadow: 'none' }}>
                    {/* <span style={{ fontSize: '20px' }}>
                      Arrival&nbsp;:&nbsp;
                    </span> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Arrival"
                        value={stdate}
                        onChange={(newValue) => {
                          setstdate(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item className="components" sx={{ boxShadow: 'none' }}>
                    {/* <span style={{ fontSize: '20px' }}>
                      Departure&nbsp;:&nbsp;
                    </span> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Departure"
                        value={endate}
                        onChange={(newValue) => {
                          setendate(newValue)
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Item>
                </Grid>
              </Stack>

              <Stack
                className="colmns"
                direction="row"
                sx={{ justifyContent: 'space-between' }}
              >
                <Button variant="outlined" onClick={()=>{setbut(!but[0])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>News</Button>
                <Button variant="outlined" onClick={()=>{setbut(!but[1])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>Whether</Button>
                <Button variant="outlined" onClick={()=>{setbut(!but[2])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>More</Button>
                <Button variant="outlined" onClick={()=>{setbut(!but[3])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>Mews</Button>
                <Button variant="outlined" onClick={()=>{setbut(!but[4])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>Map</Button>
                <Button variant="outlined" onClick={()=>{setbut(!but[5])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>Activities</Button>
                <Button variant="outlined" onClick={()=>{setbut(!but[6])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>ToDO</Button>
                <Button variant="outlined" onClick={()=>{setbut(!but[7])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>Objection</Button>
                <Button variant="outlined" onClick={()=>{setbut(!but[8])}} sx={{fontSize:'13px',px:'1px',py:'5px'}}>More</Button>
              </Stack>
            </Item>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={6}>
        {weather.resolvedAddress ? (
          <Item sx={{ boxShadow: 'none' }}>
            <Stack className="address">{weather.resolvedAddress}</Stack>
            <Stack direction="row" sx={{ p: '20px' }}>
              <Stack sx={{ pr: '30px' }}>
                <img
                  src={
                    process.env.REACT_APP_ICON_URL +
                    weather.days[0].icon +
                    '.png'
                  }
                  alt="img"
                />
              </Stack>
              <Stack sx={{ fontSize: '50px', pr: '20px' }} direction="row">
                {weather.days[0].temp}
                <sup style={{ fontSize: '30px' }}>°F</sup>
              </Stack>
              <Stack sx={{ fontSize: '18px' }}>{weather.days[0].icon}</Stack>
            </Stack>
            <Grid
              container
              spacing={1}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                py: '35px',
                px: '10px',
              }}
            >
              {weather.days.map((para) => {
                return (
                  <Grid
                    item
                    xs={1.7}
                    key={para.datetime}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Item>
                      <Stack>{para.datetime}</Stack>
                      <Stack sx={{ height: '80px', verticalAlign: 'middle' }}>
                        <img
                          src={
                            process.env.REACT_APP_ICON_URL + para.icon + '.png'
                          }
                          alt="img"
                          style={{ width: '70%', margin: 'auto' }}
                        />
                      </Stack>
                      <Stack sx={{ fontSize: '20px' }}>{para.tempmax}°</Stack>
                      <Stack sx={{ fontSize: '20px' }}>{para.tempmin}°</Stack>
                    </Item>
                  </Grid>
                )
              })}
            </Grid>
            <Stack sx={{ fontSize: '20px' }}>{weather.description}</Stack>
          </Item>
        ) : null}
      </Grid>
    </Grid>
  )
}

export default App
