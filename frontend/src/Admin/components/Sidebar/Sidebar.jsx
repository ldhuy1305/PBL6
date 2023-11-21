import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CommentIcon from '@mui/icons-material/Comment';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Item = ({ title, to, icon, selected, setSelected }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const handleNavigation = ({ to, title }) => {
        navigate(to);
        setSelected(title);
    };
    return (
        <MenuItem
            onClick={() => { handleNavigation({ to, title }); setSelected(title); }}
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}

            icon={icon}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const Sidebara = ({ Catname, Admin }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Danh sách Sản phẩm");
    const { t } = useTranslation();
    console.log("Admin")
    console.log(Admin)

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 30px 5px 5px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },

            }}
        >
            <ProSidebar collapsed={isCollapsed} backgroundColor="none" height='auto'>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <ArrowForwardIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="25px"

                            >
                                <Typography variant="h3" color={colors.grey[100]}>
                                    ADMINIS
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Danh sách cửa hàng"
                            to="/"
                            icon={<MenuOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}

                        />
                        <Item
                            title="Cấp phép cửa hàng"
                            to="/Acceptstore"
                            icon={<LeaderboardIcon />}
                            selected={selected}
                            setSelected={setSelected}

                        />

                        <Item
                            title="Danh sách Shipper"
                            to="/ViewAllShipper"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Cấp phép Shipper"
                            to="/ManageShipper"
                            icon={<CommentIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Danh sách người dùng"
                            to="/ManageUser"
                            icon={<MenuOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}

                        />

                        <Item
                            title="Logout"
                            to="/calendar"
                            icon={<LogoutIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebara;