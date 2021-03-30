import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { PokemonContext } from '../partial/PokemonContext';

import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minWidth: 275,
  },
  card: {
    width: 150
  },
  chip: {
    display: "flex",
    flexWrap: "wrap"
  },
  menuButton: {
    marginLeft: 'auto',
    margin: -12
  },
  toolbar: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
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
  media: {
    height: 140,
  },
}));

function Party() {
  const classes = useStyles();
  const { release, pokemons } = React.useContext(PokemonContext);
  const [open, setOpen] = React.useState(false);
  const [deletePoke, setDelete] = React.useState(0);
  const [poorOne, setPoor] = React.useState("");
  const [openSb, setOpenSb] = React.useState(false);

  var user = pokemons;
  console.log("data party ",user);

  const handleClose = () => {
    setOpen(false);
  };

  const handleRelease = (param) => {
    //release the pokemon after throw confirmation dialog
    setPoor(user[param].nickname);
    setDelete(param);
    setOpen(true);
  }

  const handleRemove = () => {
    setOpen(false);
    setOpenSb(true);
    console.log("ok remove",user[deletePoke]);
    release(user[deletePoke]);
  }

  const handleCloseSb = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSb(false);
  };

  return (
    <div className={classes.root}>
      <main className={classes.fullWidth}>
      <div className={classes.title}>
        <Typography variant='h6'><b>Party</b></Typography>
      </div>
      <div className={classes.content}>
        <Snackbar 
          open={openSb} 
          autoHideDuration={6000} 
          onClose={handleCloseSb}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseSb} severity="info">
            {poorOne} successfully return to the wild
          </Alert>
        </Snackbar>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Release "+poorOne+" into the wild?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Thank you for keeping and took care {poorOne} , confirm to remove her from party
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleRemove} color="default" autoFocus>
              GOO
            </Button>
          </DialogActions>
        </Dialog>
        {user.length > 0 ? (
          <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {user.map((value, index) => (
                <Grid key={value.nickname} item>
                  <Card className={classes.card} variant="outlined">                
                      <CardActions>
                        <IconButton onClick={() => handleRelease(index)} edge="start" className={classes.menuButton} color="inherit" aria-label="delete">
                          <DeleteIcon color="action" />
                        </IconButton>
                      
                      </CardActions>
                      <CardMedia
                        className={classes.media}
                        image={value.image}
                        title={value.name}
                      />
                      <CardContent style={{ background: '#f2f3f4' }}>
                        <Typography color="textSecondary" align="center">
                        {value.nickname}
                        </Typography>
                        <Chip variant="outlined" size="small" className={classes.chip} label={value.name} clickable />
                      </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        ) : (
          <Typography paragraph>
            Go roam the grass!
          </Typography>
        )}
      </div>
    </main>
    </div>
  );
}

export default Party;
