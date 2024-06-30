import React, {Dispatch, SetStateAction} from "react";
import {Knob, KnobChangeEvent} from 'primereact/knob';
import {Grid, Typography} from "@mui/material";
import {FeedbackDelayType} from "../types/feedback-delay";

interface KnobButtonProps {
  label: string;
  value: FeedbackDelayType;
  setValue: Dispatch<SetStateAction<FeedbackDelayType>>;
  min: number;
  max: number;
  step: number
  keyParam: keyof FeedbackDelayType;
}

export const KnobButton = ({label, value, setValue, min, max, step, keyParam}: KnobButtonProps) => {

  return (

    <Grid container flexDirection="column" textAlign="center" >
      <Grid item>
        <Knob value={value[keyParam]} min={min} step={step} max={max} onChange={(e: KnobChangeEvent) => setValue((prev)=>({...prev, [keyParam]: e.value}))}/>
      </Grid>
      <Grid item>
        <Typography>{label}</Typography>
      </Grid>
    </Grid>
  )
}
