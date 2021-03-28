import React from 'react';
import { PokemonContext } from '../partial/PokemonContext';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { gql, useQuery } from '@apollo/client';
import { useParams, useHistory } from "react-router-dom";

const GET_POKEMONS = gql`
query pokemon($name: String!) {
  pokemon(name: $name) {
    id
    name
    sprites {
      front_default
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
  }
}
`;

export const FetchPokemonDetails = (gqlVariables) => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) console.log('Loading...');
  if (error) console.log(`Error! ${error.message}`);

  console.log('Response details ', data);
  // console.log('Success! ',data.pokemons.status);
  return data;
};


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    // maxWidth: 345,
    margin: "10px",
    minWidth: 330,
    [theme.breakpoints.up('lg')]: {
      width: '100vh',
    },
  },
  content_holder: {
    flex: 1,
    overflowY: 'auto',
    maxHeight: '50vh',
  },
  chip: {
    margin:'5px',
    marginBottom: '15px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  media: {
    height: 140,
    width: 140,
    margin: "auto"
  },
}));

function Details() {
  let history = useHistory();
  const classes = useStyles();
  let { name } = useParams();
  // const [pokedetail, setDetail] = React.useState(name);
  const { capture, capturedPokemons } = React.useContext(PokemonContext);

  const detailParam = {
    name: name
  }

  let arrPoke = {}

  var objDetail = FetchPokemonDetails(detailParam);
  var isAvail = false;

  if (objDetail) {
    isAvail = true;
    var value = objDetail.pokemon;
    arrPoke = {
      name: value.name,
      image: value.sprites.front_default,
      nickname: "a"+ (100 + Math.random() * (400 - 100)),
    }
  }

  var upperCase = name.charAt(0).toUpperCase() + name.slice(1)

  console.log("di details", upperCase)
  return (
    <div className={classes.root}>
        <AppBar position="static" style={{ background: '#1abc9c', opacity: '80%' }}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="back" onClick={() => history.goBack()}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.root}>
            </Typography>
            {isAvail ? (
              <Button variant="outlined" color="inherit" onClick={capture(arrPoke)}>Catch!</Button>
            ):(
              <Button variant="outlined" color="inherit">...</Button>
            )}
            
          </Toolbar>
        </AppBar>
        
        <CssBaseline />
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '50vh' }}>

        <Grid item xs={12}>
        {/* <Container maxWidth="sm"> */}
        {isAvail ? (
          <Card className={classes.card} variant="outlined">
            <CardMedia
              className={classes.media}
              image={value.sprites.front_default}
              title={value.name}
            />
            <CardContent>
              <Typography variant="h4" align="center">
              {upperCase}
              </Typography>
              {value.types.map((tipe, index) =>(
                <Chip key={tipe.type.name} className={classes.chip} label={tipe.type.name} clickable /> 
              ))}
              <br></br>
              <Typography variant="h6" color="textSecondary">
                Moves ({value.moves.length} count totals)
              </Typography>
              <Divider />
              <div className={classes.content_holder}>
              <List component="nav" aria-label="main">
              {value.moves.map((gerak, index) =>(
                <ListItem button key={gerak.move.name}>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary={gerak.move.name} />
                </ListItem>
              ))}
              </List> 
              </div>
            </CardContent>
            </Card>
          ) : (
            <Card className={classes.card} variant="outlined">
              <CardContent>
              <Typography color="textSecondary" align="center">
              loading..
              </Typography>
            </CardContent>
            </Card>
          )}
          {/* </Container> */}
          </Grid>    
          </Grid>      
    </div>
  );
}

export default Details;
