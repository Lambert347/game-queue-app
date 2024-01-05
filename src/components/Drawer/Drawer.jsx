import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useHistory } from 'react-router-dom';


export default function TemporaryDrawer(){

  //array of menuItems with objects for each path. These correspond to the buttons in the drawer that will direct the user to the specific path when clicked 
    const menuItems = [
        {
            text: 'Home',
            path: '/profile',
        },
        {
            text: 'Search',
            path: '/search',
        },
        {
            text: 'Queue',
            path: '/queue',
        },
        {
            text: 'Add',
            path: '/add',
        },
        {
            text: 'About',
            path: '/about',
        }

    ]
    const history = useHistory();

    // basic styling for the drawer
    const useStyles = makeStyles({
        list: {
          width: 250,
        },
        fullList: {
          width: 'auto',
        },
        drawer: {
          marginLeft: '10px'
        }
      });
    const classes = useStyles();

    const [state, setState] = React.useState({
      top: false,
    });
  
    //function to toggle the opening of the drawer when the anchor is clicked
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({...state, [anchor]: open});
    };

    //function for rendering of the list of buttons and its items when the anchor is clicked
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        {/* maps through the list to render them to the drawer */}
        <List color="palette.secondary">
          {menuItems.map((item, index) => (
            <ListItem button key={item.text}
                onClick={() => history.push(item.path)}
            >
              <ListItemText color="secondary">{item.text}</ListItemText>
            </ListItem>
          ))}

          {/* brings in the logout button so the user can logout easily from the drawer */}
          <ListItem>
            <LogOutButton />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  
    return (
        <div>

          {/* renders the anchor to the dom */}
          {/* 'left' tells the anchor that the drawer will pop in from the left when the anchor is clicked */}
            {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
                <Button color="secondary" variant="contained" size="large" className={classes.drawer} onClick={toggleDrawer(anchor, true)}>Menu</Button>
                <Drawer color="primary" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
                </Drawer>
            </React.Fragment>
            ))}
        </div>
    );
  }