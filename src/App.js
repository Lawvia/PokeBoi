import React from 'react';

import { makeStyles, useTheme  } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Book';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './pages/Home';
import Party from './pages/Party';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: "#f7f9f9",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  actionItemStyles: {
    "&$selected": {
      color: "#f39c12"
    }
  },
  selected: {}
}));

export default function App() {
  const pathname = window.location.pathname;
  console.log("aaa",pathname)
  const classes = useStyles();
  const [value, setValue] = React.useState(pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    console.log("ok change ", newValue)
  };

  return(
    <Router>
      
        <BottomNavigation 
            value={value} 
            onChange={handleChange} 
            className={classes.root}>
          <BottomNavigationAction 
            component={Link}
            to="/"
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected
            }}
            label="Dex" value="/" icon={<RestoreIcon />} />
          <BottomNavigationAction 
            component={Link}
            to="/party"
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected
            }}
            label="Party" value="/party" icon={<FavoriteIcon />} />
        </BottomNavigation>

        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/party" component={ Party } />
        </Switch>
      
    </Router>
  );
}
