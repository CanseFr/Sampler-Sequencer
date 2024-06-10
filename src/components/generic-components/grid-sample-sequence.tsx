import {Grid} from "@mui/material";
import React, {ReactNode} from "react";

interface GridSampleSequenceProps {
  children: ReactNode;
}
export const GridSampleSequence = ({children}:GridSampleSequenceProps) => {
  return <Grid container justifyContent="space-around" mb={2}>{children}</Grid>
}