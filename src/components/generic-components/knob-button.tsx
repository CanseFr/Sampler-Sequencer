import React, {useState} from "react";
import {Knob, KnobChangeEvent} from 'primereact/knob';
import {Grid, Typography} from "@mui/material";

interface KnobButtonProps {
  label: string;
  value: any;
  setValue: any;
  min: number;
  max: number;
  step: number
}

export const KnobButton = ({label, value, setValue, min, max, step}: KnobButtonProps) => {

  return (

    <Grid container flexDirection="column" textAlign="center" >
      <Grid item>
        <Knob value={value} min={min} step={step} max={max} onChange={(e: KnobChangeEvent) => setValue(e.value)}/>
      </Grid>
      <Grid item>
        <Typography>{label}</Typography>
      </Grid>
    </Grid>
  )
}
