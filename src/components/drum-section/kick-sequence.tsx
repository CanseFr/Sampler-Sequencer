import Wad from 'web-audio-daw';
import bd_deephouser from '../../assets/bd_kick/bd_deephouser.wav';
import bd_dandans from '../../assets/bd_kick/bd_dandans.wav';
import bd_909dwsd from '../../assets/bd_kick/bd_909dwsd.wav';
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Grid, SelectChangeEvent} from "@mui/material";
import {SelectableSequence} from "../selectable/selectable-sequence";
import {SelectableSample} from "../selectable/selectable-sample";

export interface InstrumentSequenceProps {
  timePoint: number;
  sequence: number[];
  setSequence: Dispatch<SetStateAction<number[]>>;
}

export const KickSequence = ({timePoint, sequence, setSequence}: InstrumentSequenceProps) => {


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

  const handleSelectKick = (index: number) => {
    setSequence((prev) => {
      let newKickArray = [...prev];
      newKickArray[index] = newKickArray[index] === 1 ? 0 : 1;
      return newKickArray;
    });
  }

  useEffect(() => {
    if (sequence[timePoint - 1] === 1) {
      kickArraySample[kickSelect].sample.play()
    }
  }, [kickArraySample, kickSelect, sequence, timePoint]);


  return (
    <Grid container justifyContent="space-around">
      <SelectableSample instrumentSelectedIndex={kickSelect} handleChangeInstrument={handleChangeKick} arraySample={kickArraySample} name="Kick"/>
      {sequence.map((item, index) => (
        <SelectableSequence index={index} item={item} handleSelect={handleSelectKick}/>
      ))}
    </Grid>
  )
}