import Wad from 'web-audio-daw';
import clp_can from '../../assets/clap/clp_can.wav';
import clp_delma from '../../assets/clap/clp_delma.wav';
import clp_clap10000 from '../../assets/clap/clp_clap10000.wav';
import React, {useEffect, useState} from "react";
import {Grid, SelectChangeEvent} from "@mui/material";
import {InstrumentSequenceProps} from "./kick-sequence";
import {SelectableSequence} from "../selectable/selectable-sequence";
import {SelectableSample} from "../selectable/selectable-sample";
import {GridSampleSequence} from "../generic-components/grid-sample-sequence";

export const ClapSequence = ({timePoint, sequence, setSequence}: InstrumentSequenceProps) => {

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

  const handleSelectClap = (index: number) => {
    setSequence((prev) => {
      let newArray = [...prev];
      newArray[index] = newArray[index] === 1 ? 0 : 1;
      return newArray;
    });
  }

  useEffect(() => {

    if (sequence[timePoint - 1] === 1) {
      clapArraySample[clapSelect].sample.play()
    }
  }, [timePoint, clapArraySample, clapSelect, sequence]);


  return (
    <GridSampleSequence>
      <SelectableSample instrumentSelectedIndex={clapSelect} handleChangeInstrument={handleChangeClap} arraySample={clapArraySample} name="Clap"/>
      {sequence.map((item, index) => (
        <SelectableSequence index={index} item={item} handleSelect={handleSelectClap}/>
      ))}
    </GridSampleSequence>
  )
}