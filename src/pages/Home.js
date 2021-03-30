import React, { useContext, useEffect } from 'react';
import { PokemonContext } from '../partial/PokemonContext';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Typography, CardActionArea  } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Chip from '@material-ui/core/Chip';

//search compo
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

//auto hide app-bar
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import { Link } from 'react-router-dom';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const gqlVariables = {
  limit: 151,
  offset: 1,
};

export const FetchPokemon = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) console.log('Loading...');
  if (error) console.log(`Error! ${error.message}`);
  return data;
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
  },
  card: {
    width: 150
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  owned: {
    margin: theme.spacing(1)
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
  fullWidth: {
    width: '100%',
  },
  title_card: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 140,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

function Home(props) {
  const classes = useStyles();
  const { pokemons } = useContext(PokemonContext);
  var objPoke = FetchPokemon();
 
  var isAvail = false;

  if (objPoke) {
    isAvail = true;
  }

  console.log("di home")

  return (
    <div className={classes.root}>
      <main className={classes.fullWidth}>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar style={{ background: '#1abc9c' }}>
          <Toolbar>
            <Typography className={classes.title} variant="h6">Poke<b>Pedia</b></Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search for Pokémon"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

      {/* content */}
      <div className={classes.content}>
        
        {isAvail ? (
          <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
          {/* <Typography className={classes.owned} variant="body1" color="textSecondary" align="right">Owned: 12</Typography> */}
            <Grid container justify = "flex-end">
              <Chip variant="outlined" size="small" className={classes.owned} label={"Owned: "+pokemons.length} clickable />
            </Grid>
            <Grid container justify="center" spacing={2}>
              {objPoke.pokemons.results.map((value, index) => (
                <Grid key={value.name} item>
                  <Card className={classes.card} variant="outlined">
                    <CardActionArea component={Link} to={"/details/"+value.name}> 
                      <CardMedia
                        className={classes.media}
                        image={value.image}
                        title={value.name}
                      />
                      <CardContent style={{ background: '#f2f3f4' }}>
                        <Typography color="textSecondary" align="center">
                        {value.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        ) : (
          <h3>Hey, I know. I’ll use my trusty frying pan as a drying pan.</h3>
        )}
        
      </div>
    </main>
    </div>
  );
}

export default Home;
