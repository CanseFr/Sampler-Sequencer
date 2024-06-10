import {Checkbox} from "@mui/material";
import React from "react";

interface SelectableSequenceProps {
  index: number;
  item: number;
  handleSelect: (index: number)=> void;
}

export const SelectableSequence = ({index, item, handleSelect}:SelectableSequenceProps)=>{
  return(
    <Checkbox sx={{minWidth: "25px", maxWidth: "25px"}} key={index} checked={item === 1} onChange={() => handleSelect(index)}/>

  )
}