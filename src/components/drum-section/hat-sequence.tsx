import Wad from 'web-audio-daw';
import hat_chipitaka from '../../assets/hats/hat_chipitaka.wav';
import hat_626 from '../../assets/hats/hat_626.wav';
import hat_addverb from '../../assets/hats/hat_addverb.wav';
import React, {useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material";
import {InstrumentSequenceProps} from "./kick-sequence";
import {SelectableSequence} from "../selectable/selectable-sequence";
import {SelectableSample} from "../selectable/selectable-sample";
import {GridSampleSequence} from "../generic-components/grid-sample-sequence";


export const HatSequence = ({timePoint, sequence, setSequence}: InstrumentSequenceProps) => {
  const hat_chipitakaSound = new Wad({source: hat_chipitaka});
  const hat_626Sound = new Wad({source: hat_626});
  const hat_addverbSound = new Wad({source: hat_addverb});

  const [hatSelect, setHatSelect] = useState(0)

  const [hatArraySample, setHatArraySample] = useState([
    {name: "hat_chipitaka", sample: hat_chipitakaSound},
    {name: "hat_626", sample: hat_626Sound},
    {name: "hat_addverb", sample: hat_addverbSound},
  ]);

  const handleSelectHat = (index: number) => {
    setSequence((prev) => {
      let newArray = [...prev];
      newArray[index] = newArray[index] === 1 ? 0 : 1;
      return newArray;
    });
  }

  const handleChangeHat = (event: SelectChangeEvent<number>) => {
    setHatSelect(event.target.value as number);
  };


  useEffect(() => {
    if (sequence[timePoint - 1] === 1) {
      hatArraySample[hatSelect].sample.play()
    }
  }, [hatArraySample, hatSelect, sequence, timePoint]);


  return (
    <GridSampleSequence>
      <SelectableSample instrumentSelectedIndex={hatSelect} handleChangeInstrument={handleChangeHat} arraySample={hatArraySample} name="Hat"/>
      {sequence.map((item, index) => (
        <SelectableSequence index={index} item={item} handleSelect={handleSelectHat}/>
      ))}
    </GridSampleSequence>
  )
}