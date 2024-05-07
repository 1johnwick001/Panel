import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ChecklistIcon from '@mui/icons-material/Checklist';
import GavelIcon from '@mui/icons-material/Gavel';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import PolicyIcon from '@mui/icons-material/Policy';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';


const drawerWidth = 190;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  const navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleTAndCClick = () => {
    navigate('/t&c'); 
  };

  const handleAboutUs = () => {
    navigate('/AboutUs')
  }

  const handlePrivacyPolicy = () => {
    navigate('/PrivacyPolicy')
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //logout
  const AdminLogout = async () => {
    localStorage.removeItem("Admin_Email"); // Remove stored email
    localStorage.removeItem("is_Admin_loggedIn"); // Clear session status
    navigate("/"); // Redirect to the home page or login page
  };

  const blueTheme = createTheme({
    palette: {
      primary: {
        main: '#4fc9d1', // set the primary color to skybluish as its theme
      },
    },
  });

  return (
    <ThemeProvider theme={blueTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} style={{ padding: '5px' }} >
          <Toolbar>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 4,
                ...(open && { display: 'none' }),

              }}

            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" noWrap component="div">
              Admin Panel
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              color="inherit"

              startIcon={<LogoutIcon />}
              onClick={() => {
                AdminLogout()
              }}
            >
              Logout
            </Button>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Add Games', 'Games List', 'Admin List'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block', color: 'black', fontWeight: '20px' }}>
                <Link
                  to={
                    text === 'Admin List'
                      ? '/AdminList'
                      : text === 'Add Games'
                        ? '/AddGames'
                        : text === 'GamesList'
                          ? '/GamesList':'/GamesList'
                          
                  }
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 64,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,

                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        mr: open ? 4 : 'auto',
                        justifyContent: 'center',

                      }}
                    >
                      {index % 4 === 0 ? (
                        <NoteAddIcon /> // Add Games
                      ) : index % 3 === 1 ? (
                        <ChecklistIcon /> // Games List
                      ) : index % 2 === 0 ? ( // Adjusted for Admin List (index 2)
                        <SupervisorAccountIcon /> // Admin List
                      ) : (
                        <GavelIcon/> // T&C
                      )}
                    </ListItemIcon>

                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />

        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography paragraph>
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
            enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
            imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
            Convallis convallis tellus id interdum velit laoreet id donec ultrices.
            Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
            nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
            leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
            feugiat vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
            sapien faucibus et molestie ac.
          </Typography>
          <Button
              variant="contained"
              color="inherit"
              onClick={handleTAndCClick}
              startIcon={<GavelIcon/>}
              >
              Terms & Cond.
          </Button>
          <Button
              style={{left:'10px'}}
              variant="contained"
              color="inherit"
              onClick={handleAboutUs}
              startIcon={<InfoIcon/>}
              >
             About Us
          </Button>
          <Button
              style={{left:'20px'}}
              variant="contained"
              color="inherit"
              onClick={handlePrivacyPolicy}
              startIcon={<PolicyIcon/>}
              >
             Privacy Policy
          </Button>

        </Box>
      </Box>
    </ThemeProvider>

  );
}