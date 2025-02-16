import React from "react";
import { Slider, Tooltip, Input, Typography, tooltipClasses} from "@mui/material";
import { styled } from '@mui/material/styles';
import CustomToolTip from "./CustomToolTip";

const DcfInput = ({
  getter,
  setter,
  handleSlider,
  handleInput,
  title,
  min,
  max,
  step,
  unit,
  toolTip = false,
  toolTipText = "",
}) => {

  return (
    <div className="input-grid">
      
      <Typography
        id="input-slider"
        sx={{ color: "#ffffff", textAlign: "left", gridRow: "1"}}
        fontFamily={"Raleway, sans-serif"}
        fontSize={14}
        fontWeight={"thin"}
        gutterBottom
        marginBottom={0}
      >
        {title} {unit ? `(${unit})` : ""} {toolTip ? <CustomToolTip toolTipText={toolTipText}/> : ""}
      </Typography>
      
      
      <Slider
        aria-label={title}
        sx={{color: "#ffffff", gridRow: "2"}}
        min={min}
        max={max}
        step={step}
        value={getter}
        onChange={handleSlider(setter)}
        valueLabelDisplay="auto"
      />
      <Input
        sx={{
          color: "#ffffff",
          backgroundColor: "#152450",
          borderRadius: 1,
          padding: .5,
          paddingLeft: 1.5,
          marginBottom: 0,
          marginLeft: 5,
          width: 90,
          fontFamily: "bebas-neue-pro",
          gridRow: "2",
          fontSize: 18,
        }}
        value={getter || ""}
        size="small"
        onChange={handleInput(setter)}
        inputProps={{
          step: step,
          min: min,
          max: max,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />
    </div>
  );
};

export default DcfInput;
