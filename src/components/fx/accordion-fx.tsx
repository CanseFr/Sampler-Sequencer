import * as React from 'react';
import {Dispatch, SetStateAction} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import {pink} from "@mui/material/colors";
import Switch from '@mui/material/Switch';
import {FormControlLabel, Grid} from "@mui/material";
import {KnobButton} from "../generic-components/knob-button";
import {FeedbackDelayType} from "../types/feedback-delay";

interface AccordionFxProps {
  setFeedbackDelay: Dispatch<SetStateAction<FeedbackDelayType>>;
  feedbackDelay: FeedbackDelayType;
}

export const AccordionFx = ({setFeedbackDelay, feedbackDelay}: AccordionFxProps) => {

  return (
    <div className="Bg-Color">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{backgroundColor: "#282c34", color: pink[800]}}
        >
          Reverb
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: "#34373b", color: pink[800]}}>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel2-content"
          id="panel2-header"
          sx={{backgroundColor: "#282c34", color: pink[800]}}
        >
          Delay
        </AccordionSummary>
        <AccordionDetails
          sx={{backgroundColor: "#34373b", color: pink[800]}}
        >
          <Grid container spacing={2}>
            <Grid item>
              {/* ON OFF Delay*/}
              <FormControlLabel
                control={<Switch/>}
                onClick={() => setFeedbackDelay((prev) => ({...prev, wet: prev.wet === 0 ? 1 : 0}))}
                label={feedbackDelay.wet ? "On" : "Off"}
              />
            </Grid>

            {/*Decay*/}
            <Grid item>
              <KnobButton label="Decay" value={feedbackDelay} setValue={setFeedbackDelay} keyParam="decay" min={0.1} max={2.5} step={0.1}/>
            </Grid>

            {/*PreDelay*/}
            <Grid item>
              <KnobButton label="Predelay" value={feedbackDelay} setValue={setFeedbackDelay}  keyParam="preDelay" min={0.1} max={2.5} step={0.1}/>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel3-content"
          id="panel3-header"
          sx={{backgroundColor: "#282c34", color: pink[800]}}
        >
          Filter
        </AccordionSummary>
        <AccordionDetails
          sx={{backgroundColor: "#34373b", color: pink[800]}}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
        <AccordionActions className="Bg-Color">
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
