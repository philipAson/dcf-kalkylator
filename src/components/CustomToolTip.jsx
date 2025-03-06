import React from "react";
import { Tooltip, tooltipClasses} from "@mui/material";
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';

const CustomToolTip = ({ toolTipText = "" }) => {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
      minWidth: 500,
      whiteSpace: "pre-line !important",
    },
  }));

  return (
    <LightTooltip title={toolTipText} placement="top-end">
      <InfoIcon sx={{fontSize: 14, marginLeft: 1}}/>
    </LightTooltip>
  );
};

export default CustomToolTip;

