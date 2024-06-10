import {Checkbox} from "@mui/material";
import React from "react";
import {markIndexSequence} from "../../App";
import {pink} from "@mui/material/colors";

interface SelectableSequenceProps {
  index: number;
  item: number;
  handleSelect: (index: number) => void;
}

export const SelectableSequence = ({index, item, handleSelect}: SelectableSequenceProps) => {
  return (<Checkbox
      sx={{
        minWidth: "25px",
        maxWidth: "25px",
        color: markIndexSequence.includes(index + 1) ? pink[800] : undefined
      }}
      key={index}
      checked={item === 1}
      onChange={() => handleSelect(index)}
    />
  )
}