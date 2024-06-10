import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

interface SelectableSampleProps {
  instrumentSelectedIndex: number;
  handleChangeInstrument: (e: any) => void;
  arraySample: Array<any>;
  name: string;
}

export const SelectableSample = ({name, arraySample, instrumentSelectedIndex, handleChangeInstrument}: SelectableSampleProps) => {
  return (
    <FormControl sx={{width: 200}}>
      <InputLabel>{name}</InputLabel>
      <Select
        value={instrumentSelectedIndex}
        label={name}
        onChange={handleChangeInstrument}
      >
        {arraySample.map((item, index) => (
          <MenuItem key={index} value={index}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}