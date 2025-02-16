import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {AccordionFx} from "./accordion-fx";
import {pink} from "@mui/material/colors";
import {Dispatch, SetStateAction} from "react";
import {FeedbackDelayType} from "../types/feedback-delay";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  setFeedbackDelay: Dispatch<SetStateAction<FeedbackDelayType>>;
  feedbackDelay: FeedbackDelayType;
}

export const DialogFxHat = ({open, setOpen, setFeedbackDelay, feedbackDelay}: Props) => {

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={()=>setOpen(false)}
      TransitionComponent={Transition}
    >
      <AppBar sx={{position: 'relative', backgroundColor: "black", color: pink[800]}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={()=>setOpen(false)}
            aria-label="close"
          >
            <CloseIcon/>
          </IconButton>
          <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
            FX
          </Typography>
        </Toolbar>
      </AppBar>
      <AccordionFx setFeedbackDelay={setFeedbackDelay} feedbackDelay={feedbackDelay}/>
    </Dialog>
  );
}
