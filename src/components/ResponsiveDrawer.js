import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SimpleBar from 'simplebar-react';
import '../css/simplebar.css';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MicIcon from '@material-ui/icons/Mic';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import useWindowDimensions from './windowDimensions';


const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        }
    },
    appBar: {
        backdropFilter: "blur(8px)",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    appBarInput: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.5),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 1),

        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    inputIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputNode: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '50ch',
        },
    },
    importExportButton: {
        transform: "rotate(90deg)"
    },

    toolbar: theme.mixins.toolbar,
    toolbarShadow: {
        backdropFilter: "blur(8px)",
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            backgroundColor: "transparent"
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    avatar: {

        width: "32px",
        height: "32px",
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)" 
    },
    sentiment: {
        borderRadius: "50%",
        height: "16px",
        width: "16px",
        borderColor: "rgb(255,255,255,0.7)",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)" 
    }
}));

const ResponsiveDrawer = (props) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { height, width } = useWindowDimensions();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleKeyDown = (e) => {

        if (e.keyCode === 13) {
            props.onSpeak();
        }
    }

    const calculateSentiment = (sentiment) => {
        switch (sentiment.sentiment) {
            case "positive":
                return "rgb(0,255,0," + sentiment.positive + ")";
            case "negative":
                return "rgb(255,0,0," + sentiment.negative + ")";
            default:
                return "rgb(255,255,0," + sentiment.neutral + ")";

        }
    }

    const drawer = (
        <div>
            <div className={clsx([classes.toolbar, classes.toolbarShadow])} />
            <Divider />
            <SimpleBar  style={{ maxHeight: height - 70 }} >
                <List>
                    {props.messages && props.messages.map((item, index) => (
                        <ListItem alignItems="flex-start" button key={index}>
                            <ListItemIcon>
                                <Avatar
                                className={classes.avatar}
                                    alt={item.name}
                                    src={item.src}
                                    />
                            </ListItemIcon>
                            <ListItemText primary={item.name} secondary={item.message} />
                            <ListItemSecondaryAction>
                                <div style={{ backgroundColor: calculateSentiment(item.sentiment) }} className={classes.sentiment}></div>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </SimpleBar>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} color="transparent">
                <Toolbar>
                    <div className={classes.appBarInput}>
                        <div className={classes.inputIcon}>
                            <MicIcon />
                        </div>

                        <InputBase
                            placeholder="Enter text to speech"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputNode,
                            }}
                            onChange={(e) => { props.onTextChanged(e.target.value) }}
                            onKeyDown={(e) => { handleKeyDown(e) }}
                        />

                    </div>
                  
                   
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="messages">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, 
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

export default ResponsiveDrawer;
