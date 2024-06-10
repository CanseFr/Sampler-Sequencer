import React, {useEffect, useState} from 'react';
import './App.css';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {KickSequence} from "./components/drum-section/kick-sequence";
import {HatSequence} from "./components/drum-section/hat-sequence";
import {ClapSequence} from "./components/drum-section/clap-sequence";


function App() {
  const [arraySequence, setArraySequence] = useState(new Array(16).fill(0));

  const [kickSequence, setKickSequence] = useState(new Array(16).fill(0));
  const [htaSequence, setHatSequence] = useState(new Array(16).fill(0));
  const [clapSequence, setClapSequence] = useState(new Array(16).fill(0));

  const [bpm, setBpm] = useState(500);
  const [timePoint, setTimePoint] = useState(0);

  const markIndexSequence = [1, 5, 9, 13]

  const modifyBpm = (e: any) => {
    setBpm(Number(e.target.value));
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
            <Typography minWidth="25px" maxWidth="25px" color={markIndexSequence.includes(index + 1) ? "red" : ""}>{index + 1}</Typography>
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

        <KickSequence timePoint={timePoint} sequence={kickSequence} setSequence={setKickSequence}/>
        <HatSequence timePoint={timePoint} sequence={htaSequence} setSequence={setHatSequence}/>
        <ClapSequence timePoint={timePoint} sequence={clapSequence} setSequence={setClapSequence} />

      </header>
    </div>
  );
}


export default App;



