import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from '../../theme';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useNavigate } from 'react-router-dom';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import style from "./Topbar.module.css";

const Topbar = ({ latestUserData }) => {
    const history = useNavigate();
    const redirectToDetailorderPage = (id) => {
        history(`/store/detailorder/${id}`, { state: id });
    };
    console.log(latestUserData)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const numbers = [1, 2, 3, 4, 5];

    return (
        <Box display="flex" justifyContent="space-between" p={1} borderBottom="0.1px solid rgb(230, 230, 230);"
            boxShadow="0px 1px 1px rgba(0, 0, 0, 0.1)">
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
            </Box>

            {/* ICONS */}
            <Box display="flex" gap="10px">
                <IconButton onClick={handleClick}>
                    <Badge badgeContent={10} color="error" overlap="circular">
                        <NotificationsOutlinedIcon sx={{ fontSize: 25 }} />
                    </Badge>
                </IconButton>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Grid sx={{
                        width: "360px", height: "500px",
                        overflowy: "auto", p: "10px",
                    }} container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h3" sx={{ fontWeight: "700" }}>Thông báo mới</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={style.container}>

                                {latestUserData && latestUserData.map((number) => (
                                    <div className={style.notification} onClick={() => redirectToDetailorderPage(number.id)}>
                                        <div className={style.infomative}>
                                            <span className={style.span}>{number.title}</span>
                                            {/* <span className={style.title}></span> */}
                                            <span className={style.mes}>{number.message}</span>
                                        </div>
                                        <div className={style.seed}>
                                            <FiberManualRecordIcon sx={{ color: "#1877F2" }} />
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </Grid>
                    </Grid>
                </Popover>
                <IconButton>
                    <SettingsOutlinedIcon sx={{ fontSize: 25 }} />
                </IconButton>
                <IconButton>
                    <PersonOutlinedIcon sx={{ fontSize: 25 }} />
                </IconButton>
            </Box>
        </Box >
    );
};

export default Topbar;