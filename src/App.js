import React from 'react';
import store from 'store';
import { PokemonContext } from './partial/PokemonContext';
import { KEY_USER_DATA } from './partial/actions';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Book';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';

import ScrollToTop from './partial/ScrollToTop';
import Home from './pages/Home';
import Details from './pages/Details';
import Party from './pages/Party';

const useStyles = makeStyles((theme) => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
  },
  content_holder: {
    flex: 1,
    overflowY: 'auto',
    minHeight: '100vh',
    marginBottom: '70px',
    clear: 'both',
  },
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: "#f7f9f9",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  actionItemStyles: {
    "&$selected": {
      color: "#1abc9c"
    }
  },
  selected: {}
}));

export default function App() {
  const pathname = window.location.pathname;
  const classes = useStyles();
  const [value, setValue] = React.useState(pathname);
  const { addPokemons } = React.useContext(PokemonContext);
  //get local data from the user
  var user = store.get(KEY_USER_DATA)

  React.useEffect(() => {
    console.log("called once")
    if (!user) user = [];
    addPokemons(user); //add local data to context
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <Router>
      <ScrollToTop />
      <div className={classes.app}>
        <div className={classes.content_holder}>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/party" component={ Party } />
          <Route path="/details/:name" component={ Details } />
        </Switch>
        </div>
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
        </div>
    </Router>
  );
}
