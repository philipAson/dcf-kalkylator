import React from "react";
import { Slider, Grid, Input, Typography, Box } from "@mui/material";

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
        {title} {unit ? `(${unit})` : ""}
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
          borderRadius: 2,
          padding: .5,
          paddingLeft: 1.5,
          marginBottom: 3,
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
