import React from "react";
import { IconButton, Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import InfoIcon from "@mui/icons-material/Info";

const CustomToolTip = ({ toolTipText = "" }) => {
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: "rgba(0, 0, 0, 0.87)",
            boxShadow: theme.shadows[1],
            fontSize: 14,
            minWidth: {
                xs: 300,
                sm: 400,
                md: 500,
                lg: 600,
            },
            whiteSpace: "pre-line !important",
        },
    }));

    return (
        <LightTooltip
            title={toolTipText}
            placement="top-end"
            arrow
            enterTouchDealay={0}
            leaveTouchdeDelay={4000}
            disableInteractive={false}
        >
            <InfoIcon sx={{ fontSize: 18, marginLeft: 1 }} />
        </LightTooltip>
    );
};

export default CustomToolTip;
