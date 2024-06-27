import Wad from 'web-audio-daw';
import React, { useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";
import {SelectableSequence} from "../selectable/selectable-sequence";
import {SelectableSample} from "../selectable/selectable-sample";
import {GridSampleSequence} from "../generic-components/grid-sample-sequence";
import {InstrumentSequenceProps} from "./kick-sequence";

export const WavSequence = ({timePoint, sequence, setSequence}: InstrumentSequenceProps) => {


  const saw = new Wad({source: 'sawtooth',
    filter: [
      {type : 'lowpass', frequency : 600, q : 1, env : {frequency : 800, attack : 0.5}},
      {type : 'highpass', frequency : 1000, q : 5}
    ]
  });

  const [sawArraySample, setSawArraySample] = useState([
    {name: "saw", sample: saw},
  ]);
  const [sawSelect, setSawSelect] = useState(0)

  const handleChangeSaw = (event: SelectChangeEvent<number>) => {
    setSawSelect(event.target.value as number);
  };

  const handleSelectSaw = (index: number) => {
    setSequence((prev) => {
      let newSawArray = [...prev];
      newSawArray[index] = newSawArray[index] === 1 ? 0 : 1;
      return newSawArray;
    });
  }

  useEffect(() => {
    if (sequence[timePoint - 1] === 1) {
      sawArraySample[sawSelect].sample.play()
    }
  }, [sawArraySample, sawSelect, sequence, timePoint]);


  return (
    <GridSampleSequence>
      <SelectableSample instrumentSelectedIndex={sawSelect} handleChangeInstrument={handleChangeSaw} arraySample={sawArraySample} name="Kick"/>
      {/*<Button>FX</Button>*/}
      {sequence.map((item, index) => (
        <SelectableSequence index={index} item={item} handleSelect={handleSelectSaw}/>
      ))}
    </GridSampleSequence>
  )
}