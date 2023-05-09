import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AddchartTwoTone, AddTaskTwoTone, Close, ExpandMore, Menu, PeopleAltTwoTone } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, ListItemButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        fontFamily: "Yrsa"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,

    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
    expanded: {
        margin: '0px',
    },
    test: {
        '&$expanded': {
            margin: '0px',
        },
    }
}));

const Item = ({ icon, title, to }) => {
    return (
        <>
            <List style={{ margin: '0px', padding: '0px' }} >
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                        <ListItemText>
                            <Typography component='p'> <Link to={to} style={{ textDecoration: "none", fontFamily: "Yrsa" }}  >{title}</Link></Typography>
                            <Link to={to} />
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}

const AdminTopbar = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} style={{ fontFamily: "Yrsa" }} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        INK
                    </Typography>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                            <Close />
                        </IconButton>
                        <Accordion disableGutters>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}

                            >
                                <Typography>Profile</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Item
                                    title="Add Profile"
                                    to="/aprofile"
                                    icon={<PeopleAltTwoTone />}
                                />
                                <Item
                                    title="Block Profile"
                                    to="/block_profile"
                                    icon={<PeopleAltTwoTone />}
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Item
                            icon={<AddchartTwoTone />}
                            title="Manage"
                            to='/manage'
                        />
                        <Item
                            icon={<AddTaskTwoTone />}
                            title="Task"
                            to='/task'
                        />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar} />
                        <Accordion elevation={0} disableGutters>
                            <AccordionSummary
                                expandIcon={<ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{ margin: '0px' }}
                            >
                                <Typography>Profile</Typography>
                            </AccordionSummary>
                            <AccordionDetails >
                                <Item
                                    title="Add Profile"
                                    to="/aprofile"
                                    icon={<PeopleAltTwoTone />}
                                />
                                <Item
                                    title="Block Profile"
                                    to="/block_profile"
                                    icon={<PeopleAltTwoTone />}
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Item
                            icon={<AddchartTwoTone />}
                            title="Manage"
                            to='/manage'
                        />
                        <Item
                            icon={<AddTaskTwoTone />}
                            title="Task"
                            to='/task'
                        />
                    </Drawer>
                </Hidden>
            </nav>
            {/* <div className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="h1" color="initial">Hello</Typography>
            </div> */}
        </div>
    )
}

export default AdminTopbar