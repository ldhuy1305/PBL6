import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from '../../theme';
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useLang } from '../../services/languageContext';
import { useTranslation } from 'react-i18next';

const Topbar = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [isDropdownLangOpen, setDropdownLangOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('icon icon-lag-vn');
    const { selectedLang, updateLang } = useLang();
    const toggleDropdownLang = () => {
        setDropdownLangOpen(!isDropdownLangOpen);
    };
    const handleSelectLanguage = (iconName, lng) => {
        updateLang(lng)
        setSelectedLanguage(iconName);
        setDropdownLangOpen(false)
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2} style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', }}>
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"

            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>

            {/* ICONS */}
            <Box display="flex">
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                {/* <IconButton>
                    <div class="language dropdown col-auto"
                        style={{ backgroundColor: "white", padding: '2px 5px', borderRadius: '5px', marginRight: '5px' }}
                        aria-expanded={isDropdownLangOpen}
                        onClick={toggleDropdownLang}>
                        <div className='dropdown'>
                            <div
                                class="dropdown-toggle"
                                role='button'
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                tabindex="0"
                                aria-haspopup="true"
                                aria-expanded={isDropdownLangOpen}
                                onClick={toggleDropdownLang}
                            >
                                <span class={selectedLanguage}></span>
                            </div>
                            {isDropdownLangOpen && (
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" >
                                    <button onClick={() => handleSelectLanguage('icon icon-lag-vn', 'vi')} style={{ width: '100%', textAlign: 'left' }}>
                                        <div class="dropdown-item">
                                            <span class="icon icon-lag-vn"></span>
                                            <span class="language-item">Vietnamese</span>
                                        </div>
                                    </button>
                                    <button onClick={() => handleSelectLanguage('icon icon-lag-en', 'en')} style={{ width: '100%' }}>
                                        <div class="dropdown-item">
                                            <span class="icon icon-lag-en"></span>
                                            <span class="language-item">English</span>
                                        </div>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </IconButton> */}
                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;