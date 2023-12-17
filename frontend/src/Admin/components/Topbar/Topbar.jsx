import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from '../../theme';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box display="flex" justifyContent="space-between" p={2} style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', }}>
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"

            >
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>

                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;