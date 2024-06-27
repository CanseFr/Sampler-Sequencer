// import Wad from 'web-audio-daw';
// import hat_chipitaka from '../../assets/hats/hat_chipitaka.wav';
// import hat_626 from '../../assets/hats/hat_626.wav';
// import hat_addverb from '../../assets/hats/hat_addverb.wav';
// import React, {useEffect, useState} from "react";
// import {SelectChangeEvent} from "@mui/material";
// import {InstrumentSequenceProps} from "./kick-sequence";
// import {SelectableSequence} from "../selectable/selectable-sequence";
// import {SelectableSample} from "../selectable/selectable-sample";
// import {GridSampleSequence} from "../generic-components/grid-sample-sequence";
//
//
// export const HatSequence = ({timePoint, sequence, setSequence}: InstrumentSequenceProps) => {
//   const hat_chipitakaSound = new Wad({source: hat_chipitaka});
//   const hat_626Sound = new Wad({source: hat_626});
//   const hat_addverbSound = new Wad({source: hat_addverb});
//
//   const [hatSelect, setHatSelect] = useState(0)
//
//   const [hatArraySample, setHatArraySample] = useState([
//     {name: "hat_chipitaka", sample: hat_chipitakaSound},
//     {name: "hat_626", sample: hat_626Sound},
//     {name: "hat_addverb", sample: hat_addverbSound},
//   ]);
//
//   const handleSelectHat = (index: number) => {
//     setSequence((prev) => {
//       let newArray = [...prev];
//       newArray[index] = newArray[index] === 1 ? 0 : 1;
//       return newArray;
//     });
//   }
//
//   const handleChangeHat = (event: SelectChangeEvent<number>) => {
//     setHatSelect(event.target.value as number);
//   };
//
//
//   useEffect(() => {
//     if (sequence[timePoint - 1] === 1) {
//       hatArraySample[hatSelect].sample.play()
//     }
//   }, [hatArraySample, hatSelect, sequence, timePoint]);
//
//
//   return (
//     <GridSampleSequence>
//       <SelectableSample instrumentSelectedIndex={hatSelect} handleChangeInstrument={handleChangeHat} arraySample={hatArraySample} name="Hat"/>
//       {sequence.map((item, index) => (
//         <SelectableSequence index={index} item={item} handleSelect={handleSelectHat}/>
//       ))}
//     </GridSampleSequence>
//   )
// }

import hat_chipitaka from '../../assets/hats/hat_chipitaka.wav';
import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {InstrumentSequenceProps} from "./kick-sequence";
import {SelectableSequence} from "../selectable/selectable-sequence";
import {GridSampleSequence} from "../generic-components/grid-sample-sequence";
import * as Tone from "tone";
import Slider from '@mui/material/Slider';
import Button from "@mui/material/Button";
import {DialogFxHat} from "../fx/dialog-fx-hat";


export const HatSequence = ({timePoint, sequence, setSequence}: InstrumentSequenceProps) => {

  const [open, setOpen] = React.useState(false);

  const player = new Tone.Player(
    hat_chipitaka
  ).toDestination();

  const [wet, setWet] = useState<number>(0);
  // const [decay, setDecay] = useState<number>(0.00);
  // const [preDelay, setPreDelay] = useState<number>(0.00);

  const handleWet = () => {
    setWet(wet===0?1:0);
    console.log(wet);
  };
  //
  // const handleDecay = (event: Event, newValue: number | number[])  => {
  //   setDecay(newValue as number);
  // };
  //
  // const handlePreDelay = (event: Event, newValue: number | number[])  => {
  //   setPreDelay(newValue as number);
  // };



  const feedbackDelay = new Tone.Reverb({
    "wet": wet,
    // "wet": wet,
    "decay": 0.2,
    // "decay": decay,
    "preDelay": 0.2
    // "preDelay": preDelay
  }).toDestination();

  const handleSelectHat = (index: number) => {
    setSequence((prev) => {
      let newArray = [...prev];
      newArray[index] = newArray[index] === 1 ? 0 : 1;
      return newArray;
    });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (sequence[timePoint - 1] === 1) {
      Tone.loaded().then(() => {
        player.connect(feedbackDelay).start();
      });
    }
  }, [ sequence, timePoint]);

  return (
    <>

    {open && <DialogFxHat open={open} setOpen={setOpen} wet={wet} handleWet={handleWet} />}
    {/*{open && <DialogFxHat open={open} setOpen={setOpen} handleWet={handleWet} handleDecay={handleDecay} handlePreDelay={handlePreDelay}/>}*/}
    <GridSampleSequence>

      <Typography>Hat</Typography>
      <Button variant="outlined" onClick={handleClickOpen}>
        FX
      </Button>
      {sequence.map((item, index) => (
        <SelectableSequence index={index} item={item} handleSelect={handleSelectHat}/>
      ))}
    </GridSampleSequence>
    </>
  )
}