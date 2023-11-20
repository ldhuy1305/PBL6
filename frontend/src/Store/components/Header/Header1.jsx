import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from "../../theme";
const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px 0" display="flex" alignItems="center">
            <Box
                fontSize="20px"
                height="30px"
                width="30px"
                border="0.1px solid black"
                borderRadius="2px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                marginRight="20px"
                color="gray"
            >
                <i style={{ color:"gray"}}className="fa-solid fa-left-long"></i>
            </Box>
            <Typography
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="24px"
                fontWeight="400"
            >
                {title}
            </Typography>
        </Box>
    );
};

export default Header;
