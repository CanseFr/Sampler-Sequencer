import hat_chipitaka from '../../assets/hats/hat_chipitaka.wav';
import hat_626 from '../../assets/hats/hat_626.wav';
import hat_addverb from '../../assets/hats/hat_addverb.wav';
import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {InstrumentSequenceProps} from "./kick-sequence";
import {SelectableSequence} from "../selectable/selectable-sequence";
import {GridSampleSequence} from "../generic-components/grid-sample-sequence";
import * as Tone from "tone";
import Button from "@mui/material/Button";
import {DialogFxHat} from "../fx/dialog-fx-hat";
import {FeedbackDelayType, initFeedbackDelay} from "../types/feedback-delay";
import {SelectableSample} from "../selectable/selectable-sample";

export const HatSequence = ({ timePoint, sequence, setSequence }: InstrumentSequenceProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [player, setPlayer] = useState<Tone.Player | null>(null);
  const [feedbackDelay, setFeedbackDelay] = useState<FeedbackDelayType>(initFeedbackDelay);
  const toneFeedbackDelay = new Tone.Reverb(feedbackDelay).toDestination();
  const [hatSelect, setHatSelect] = useState(0);

  const hatArraySample = [
    { name: "hat_chipitaka", sample: hat_chipitaka },
    { name: "hat_626", sample: hat_626 },
    { name: "hat_addverb", sample: hat_addverb },
  ];

  const handleSelectHat = (e: any) => {
    setHatSelect(e.target.value as number);
  };

    const handleStepHat = (index: number) => {
    setSequence((prev) => {
      let newArray = [...prev];
      newArray[index] = newArray[index] === 1 ? 0 : 1;
      return newArray;
    });
  }

  useEffect(() => {
    if (hatArraySample[hatSelect]) {
      const newPlayer = new Tone.Player(hatArraySample[hatSelect].sample).toDestination();
      setPlayer(newPlayer);

      return () => {
        newPlayer.dispose();
      };
    }
  }, [hatSelect]);

  useEffect(() => {
    if (player && sequence[timePoint - 1] === 1) {
      Tone.loaded().then(() => {
        player.connect(toneFeedbackDelay).start();
      });
    }
  }, [toneFeedbackDelay, player, sequence, timePoint]);

  return (
    <>
      {open && <DialogFxHat open={open} setOpen={setOpen} feedbackDelay={feedbackDelay} setFeedbackDelay={setFeedbackDelay} />}
      <GridSampleSequence>
        <SelectableSample instrumentSelectedIndex={hatSelect} handleChangeInstrument={handleSelectHat} arraySample={hatArraySample} name="Hat" />
        <Button variant="outlined" onClick={() => setOpen(!open)}>
          FX
        </Button>
        {sequence.map((item, index) => (
          <SelectableSequence key={index} index={index} item={item} handleSelect={handleStepHat} />
        ))}
      </GridSampleSequence>
    </>
  );
};