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

import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import { gql, useQuery } from '@apollo/client';
import { useParams, useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


//query group in ke models
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
  buttonProgress: {
    color: '#f2f3f4',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

function Details() {
  let history = useHistory();
  const classes = useStyles();
  let { name } = useParams();
  // const [pokedetail, setDetail] = React.useState(name);
  const {pokemons, addPokemon } = React.useContext(PokemonContext);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [snack, setSnack] = React.useState("warning");
  const [open, setOpen] = React.useState(false); //snackbar
  const [message, setMessage] = React.useState("");
  const [dialog, setDialog] = React.useState(false);
  const [eligible, setEligible] = React.useState(true);
  const [errorNick, setErrNick] = React.useState(false);
  const [helperError, setHelperError] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleAbort = () => {
    console.log("masuk ke close dialog")
    setDialog(false);
  };

  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

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
      nickname: "",
    }
  }

  var upperCase = name.charAt(0).toUpperCase() + name.slice(1)

  console.log("di details", upperCase)

  const handleButtonCatch = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        //50% chance of success, attempting catch
        // "Oops.. "+name+" was terified and flee!"
        var rand = Math.floor(Math.random() * 10);
        console.log("luck ",rand)
        if (rand > 4){
          //success, open dialog set name
          setMessage("Gotcha! "+name+" was caught!");
          setSnack("success");
          setDialog(true);

        }else{
          //failed
          setMessage("Oops.. "+name+" was terrified and flee!");
          setSnack("warning");
        }

        setOpen(true);
        setSuccess(true);
        setLoading(false);
      }, 4000);
    }
  };

  const handleNick = (e) =>{         
    const el = e.target.value;
    //check and validate if user enter duplicate nick
    var check = pokemons.some(i => i.nickname == el);
    if (errorNick){ //a way to remove error status only once
      console.log("called to remove")
      setErrNick(false)
      setHelperError("")
    }
    if (check){
      setEligible(true)
      setErrNick(true)
      setHelperError("Nickname already in use")
    }else{
      arrPoke.nickname = el;
      setEligible(false)
    }
    console.log(el, check, arrPoke);
  }

  const handleToParty = () => {
    addPokemon(arrPoke);
    setMessage(""+arrPoke.nickname+" have join the party!");
    setSnack("info");
    setOpen(true);

    setDialog(false);
  }

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
              <div className={classes.wrapper}>
                <Button
                  variant="outlined"
                  color="inherit"
                  className={buttonClassname}
                  disabled={loading}
                  onClick={handleButtonCatch}
                >
                  CATCH!
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </div>
            ):(
              <Button variant="outlined" color="inherit" disabled>...</Button>
            )}
            
          </Toolbar>
        </AppBar>
        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleClose} severity={snack}>
            {message}
          </Alert>
        </Snackbar>

        {/* dialog modal */}
        <Dialog open={dialog} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Set {upperCase} Nickname's</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Congratulations! You just catch a Pokemon, please continue to give her name to
              register it on your party.
            </DialogContentText>
            <TextField
              autoFocus
              error = {errorNick}
              helperText={helperError}
              margin="dense"
              id="user_given"
              label="Nickname"
              type="text"
              variant="outlined"
              inputProps={{ maxLength: 12 }}
              fullWidth
              onChange={(e) => handleNick(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAbort} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleToParty} color="default" disabled={eligible}>
              Send To Party
            </Button>
          </DialogActions>
        </Dialog>
        
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
