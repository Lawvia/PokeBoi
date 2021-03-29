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
    padding: theme.spacing(3),
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

  var user = pokemons;
  console.log("data party ",user);

  return (
    <div className={classes.root}>
      <main className={classes.fullWidth}>
      <div className={classes.title}>
        <Typography variant='h6'><b>Party</b></Typography>
      </div>
      <div className={classes.content}>
        {user ? (
          <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {user.map((value, index) => (
                <Grid key={value.nickname} item>
                  <Card className={classes.card} variant="outlined">                
                      <CardActions>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="delete">
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
