import React, { useEffect, useState } from 'react';
import './App.css';
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { KickSequence } from "./components/drum-section/kick-sequence";
import { HatSequence } from "./components/drum-section/hat-sequence";
import { ClapSequence } from "./components/drum-section/clap-sequence";
import { pink } from "@mui/material/colors";
import { WavSequence } from "./components/drum-section/wav-sequence";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export const markIndexSequence = [1, 5, 9, 13, 17, 21, 25, 29]
const TOTAL_STEPS = 16

function App() {
  const [arraySequence, setArraySequence] = useState(new Array(TOTAL_STEPS).fill(0));
  const [kickSequence, setKickSequence] = useState(new Array(TOTAL_STEPS).fill(0));
  const [hatSequence, setHatSequence] = useState(new Array(TOTAL_STEPS).fill(0));
  const [clapSequence, setClapSequence] = useState(new Array(TOTAL_STEPS).fill(0));
  const [wavSequence, setWavSequence] = useState(new Array(TOTAL_STEPS).fill(0));
  const [bpm, setBpm] = useState(428.6 / 4);
  const [timePoint, setTimePoint] = useState(0);
  const [play, setPlay] = useState(false);

  const modifyBpm = (e: any) => {
    setBpm(Number((60000 / e.target.value * 1) / 4));
  }

  const handleResetPattern = () => {
    setHatSequence(new Array(TOTAL_STEPS).fill(0));
    setClapSequence(new Array(TOTAL_STEPS).fill(0));
    setKickSequence(new Array(TOTAL_STEPS).fill(0));
    setWavSequence(new Array(TOTAL_STEPS).fill(0));
  }

  const handlePlayPause = () =>{
    if(play){
      setPlay(false);
    }
    if(!play){
      setTimePoint(0)
      setPlay(true);
    }
  }

  useEffect(() => {
    if (!play) return;

    const intervalId = setInterval(() => {
      setArraySequence((prev) => {
        const newArray = new Array(TOTAL_STEPS).fill(0);
        newArray[timePoint] = 1;
        return newArray;
      });
      setTimePoint((prev) => (prev + 1) % arraySequence.length);
    }, bpm);

    return () => clearInterval(intervalId);
  }, [bpm, timePoint, arraySequence.length, play]);

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ width: 200 }}>
          <Typography>BPM :</Typography>
          <TextField
            defaultValue={bpm}
            onChange={modifyBpm}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
          <Button onClick={handleResetPattern}>Reset Pattern</Button>
        </Box>

        <Box sx={{ width: 200 }}>
          <Button onClick={handlePlayPause}>{play ? <PauseIcon/> :<PlayArrowIcon/> }</Button>
        </Box>

        <Grid container justifyContent="space-around">
          <Typography minWidth="200px" maxWidth="200px"></Typography>
          {arraySequence.map((item, index) => (
            <Typography key={index} minWidth="25px" maxWidth="25px" color={markIndexSequence.includes(index + 1) ? pink[800] : undefined}>
              {index + 1}
            </Typography>
          ))}
        </Grid>

        <Grid container justifyContent="space-around">
          <Typography minWidth="200px" maxWidth="200px"></Typography>
          {arraySequence.map((item, index) => (
            <span key={index} className={item === 0 ? 'dot' : 'dot-red'}></span>
          ))}
        </Grid>

        <KickSequence timePoint={timePoint} sequence={kickSequence} setSequence={setKickSequence} />
        <HatSequence timePoint={timePoint} sequence={hatSequence} setSequence={setHatSequence} />
        <ClapSequence timePoint={timePoint} sequence={clapSequence} setSequence={setClapSequence} />
        {/*<WavSequence timePoint={timePoint} sequence={wavSequence} setSequence={setWavSequence}/>*/}
      </header>
    </div>
  );
}

export default App;
