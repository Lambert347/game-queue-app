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

    const menuItems = [
        {
            text: 'Profile',
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
            text: 'Home',
            path: '/home',
        },
        {
            text: 'Add',
            path: '/add',
        },
        {
            text: 'About',
            path: '/about',
        },
        {
            text: 'Login/Register',
            path: '/login',
        },

    ]
    const history = useHistory();
    const useStyles = makeStyles({
        list: {
          width: 250,
        },
        fullList: {
          width: 'auto',
        },
      });
    const classes = useStyles();
    const [state, setState] = React.useState({
      top: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState({...state, [anchor]: open});
    };
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List color="primary">
          {menuItems.map((item, index) => (
            <ListItem button key={item.text}
                onClick={() => history.push(item.path)}
            >
              <ListItemText color="secondary">{item.text}</ListItemText>
            </ListItem>
          ))}
          <ListItem>
              <LogOutButton />
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  
    return (
        <div>
            {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
                <Button color="secondary" variant="contained" onClick={toggleDrawer(anchor, true)}>Menu</Button>
                <Drawer color="primary" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
                </Drawer>
            </React.Fragment>
            ))}
        </div>
    );
  }