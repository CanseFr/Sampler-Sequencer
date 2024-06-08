import React, {useEffect, useState} from 'react';
import './App.css';
import {Box, Checkbox, Grid, TextField, Typography} from "@mui/material";
import sound from './assets/kick.mp3';



function App() {
  const [arraySequence, setArraySequence] = useState(new Array(16).fill(0));
  const [kickSequence, setKickSequence] = useState(new Array(16).fill(0));
  const [bpm, setBpm] = useState(500);
  const [timePoint, setTimePoint] = useState(0);

  const audio = new Audio(sound)


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
    if (kickSequence[timePoint] === 1) {
      console.log("KICK");
      audio.play();

    }
  }, [timePoint, kickSequence]);

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
        </Box>

        <Grid container justifyContent="space-around">
          {arraySequence.map((item, index) => (
            <span key={index} className={item === 0 ? 'dot' : 'dot-red'}></span>
          ))}
        </Grid>

        <Grid container justifyContent="space-around">
          {kickSequence.map((item, index) => (
            <Checkbox key={index} checked={item === 1} onChange={() => handleSelectKick(index)} />
          ))}
        </Grid>

      </header>
    </div>
  );
}


export default App;



