import React, {useEffect, useState} from 'react';
import './App.css';
import {Box, Button, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import kickSample from '././assets/bd_kick/bd_909dwsd.wav';
import hatSample from '././assets/hats/hat_addverb.wav';
import clapSample from '././assets/clap/clp_clap10000.wav';
import Wad from 'web-audio-daw';

// KICK
import bd_deephouser from './assets/bd_kick/bd_deephouser.wav';
import bd_dandans from './assets/bd_kick/bd_dandans.wav';
import bd_909dwsd from './assets/bd_kick/bd_909dwsd.wav';

// Hat
import hat_chipitaka from './assets/hats/hat_chipitaka.wav';
import hat_626 from './assets/hats/hat_626.wav';
import hat_addverb from './assets/hats/hat_addverb.wav';

// Clap
import clp_can from './assets/clap/clp_can.wav';
import clp_delma from './assets/clap/clp_delma.wav';
import clp_clap10000 from './assets/clap/clp_clap10000.wav';


function App() {
  const [arraySequence, setArraySequence] = useState(new Array(16).fill(0));

  const [kickSequence, setKickSequence] = useState(new Array(16).fill(0));
  const [htaSequence, setHatSequence] = useState(new Array(16).fill(0));
  const [clapSequence, setClapSequence] = useState(new Array(16).fill(0));

  const [bpm, setBpm] = useState(500);
  const [timePoint, setTimePoint] = useState(0);

  const markIndexSequence = [1,5,9,13]

  // Kick Section

  const bd_deephouserSound = new Wad({source: bd_deephouser});
  const bd_909dwsdSound = new Wad({source: bd_909dwsd});
  const bd_dandansSound = new Wad({source: bd_dandans});

  const [kickArraySample, setKickArraySample] = useState([
    {name: "bd_deephouser", sample: bd_deephouserSound},
    {name: "bd_dandans", sample: bd_dandansSound},
    {name: "bd_909dwsd", sample: bd_909dwsdSound},
  ]);
  const [kickSelect, setKickSelect] = useState(0)


  const handleChangeKick = (event: SelectChangeEvent<number>) => {
    setKickSelect(event.target.value as number);
  };

  // Kick Section


  // HAT SECTION
  const hat_chipitakaSound = new Wad({source: hat_chipitaka});
  const hat_626Sound = new Wad({source: hat_626});
  const hat_addverbSound = new Wad({source: hat_addverb});

  const [hatSelect, setHatSelect] = useState(0)

  const [hatArraySample, setHatArraySample] = useState([
    {name: "hat_chipitaka", sample: hat_chipitakaSound},
    {name: "hat_626", sample: hat_626Sound},
    {name: "hat_addverb", sample: hat_addverbSound},
  ]);

  const handleChangeHat = (event: SelectChangeEvent<number>) => {
    setHatSelect(event.target.value as number);
  };
  // HAT SECTION


  // Clap Section
  const clp_canSound = new Wad({source: clp_can});
  const clp_delmaSound = new Wad({source: clp_delma});
  const clp_clap10000Sound = new Wad({source: clp_clap10000});

  const [clapSelect, setClapSelect] = useState(0)

  const [clapArraySample, setClapArraySample] = useState([
    {name: "clp_can", sample: clp_canSound},
    {name: "clp_delma", sample: clp_delmaSound},
    {name: "clp_clap10000", sample: clp_clap10000Sound},
  ]);

  const handleChangeClap = (event: SelectChangeEvent<number>) => {
    setClapSelect(event.target.value as number);
  };

  // Clap Section

  const modifyBpm = (e: any) => {
    setBpm(Number(e.target.value));
  }

  const handleSelectKick = (index: number) => {
    setKickSequence((prev) => {
      let newKickArray = [...prev];
      newKickArray[index] = newKickArray[index] === 1 ? 0 : 1;
      return newKickArray;
    });
  }

  const handleSelectHat = (index: number) => {
    setHatSequence((prev) => {
      let newArray = [...prev];
      newArray[index] = newArray[index] === 1 ? 0 : 1;
      return newArray;
    });
  }

  const handleSelectClap = (index: number) => {
    setClapSequence((prev) => {
      let newArray = [...prev];
      newArray[index] = newArray[index] === 1 ? 0 : 1;
      return newArray;
    });
  }

  const handleResetPattern = () => {
    setHatSequence(new Array(16).fill(0));
    setClapSequence(new Array(16).fill(0));
    setKickSequence(new Array(16).fill(0));
  }


  useEffect(() => {
    const intervalId = setInterval(() => {
      setArraySequence((prev) => {
        const newArray = new Array(16).fill(0);
        newArray[timePoint] = 1;
        return newArray;
      });

      setTimePoint((prev) => (prev + 1) % arraySequence.length);

    }, bpm);

    return () => clearInterval(intervalId);
  }, [bpm, timePoint, arraySequence.length]);

  useEffect(() => {
    if (kickSequence[timePoint - 1] === 1) {
      kickArraySample[kickSelect].sample.play()
    }
    if (htaSequence[timePoint - 1] === 1) {
      hatArraySample[hatSelect].sample.play()
    }
    if (clapSequence[timePoint - 1] === 1) {
      clapArraySample[clapSelect].sample.play()
    }
  }, [timePoint, kickSequence, htaSequence, clapSequence, kickArraySample, kickSelect, hatArraySample, hatSelect, clapArraySample]);

  return (
    <div className="App">
      <header className="App-header">

        <Box sx={{width: 200}}>
          <Typography>BPM :</Typography>
          <TextField
            defaultValue={bpm}
            onChange={modifyBpm}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
          <Button onClick={handleResetPattern}>Reset All</Button>
        </Box>

        <Grid container justifyContent="space-around">
          <Typography minWidth="200px" maxWidth="200px">
            Index
          </Typography>
          {arraySequence.map((item, index) => (
            <Typography minWidth="25px" maxWidth="25px" color={markIndexSequence.includes(index+1)? "red": "" } >{index + 1}</Typography>
          ))}
        </Grid>

        <Grid container justifyContent="space-around">
          <Typography minWidth="200px" maxWidth="200px">
            Sequence
          </Typography>
          {arraySequence.map((item, index) => (
            <span key={index} className={item === 0 ? 'dot' : 'dot-red'}></span>
          ))}
        </Grid>

        <Grid container justifyContent="space-around">

            <FormControl sx={{width: 200}}>
              <InputLabel id="demo-simple-select-label">Kick</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kickSelect}
                label="Kick"
                onChange={handleChangeKick}
              >
                {kickArraySample.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              {kickSequence.map((item, index) => (
                <Checkbox sx={{minWidth: "25px", maxWidth: "25px"}} key={index} checked={item === 1} onChange={() => handleSelectKick(index)}/>
              ))}
        </Grid>


        <Grid container justifyContent="space-around">

          <FormControl sx={{width: 200}}>
            <InputLabel id="demo-simple-select-label">Hat</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={hatSelect}
              label="Hat"
              onChange={handleChangeHat}
            >
              {hatArraySample.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {htaSequence.map((item, index) => (
            <Checkbox sx={{minWidth: "25px", maxWidth: "25px"}} key={index} checked={item === 1} onChange={() => handleSelectHat(index)}/>
          ))}
        </Grid>

        <Grid container justifyContent="space-around">

          <FormControl sx={{width: 200}}>
            <InputLabel id="demo-simple-select-label">Clap</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={clapSelect}
              label="Clap"
              onChange={handleChangeClap}
            >
              {clapArraySample.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {clapSequence.map((item, index) => (
            <Checkbox sx={{minWidth: "25px", maxWidth: "25px"}} key={index} checked={item === 1} onChange={() => handleSelectClap(index)}/>
          ))}
        </Grid>

      </header>
    </div>
  );
}


export default App;



