import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import SideMenu from '../components/SideMenu';
// import Footer from '../components/Footer';
import MainContent from '../partial/MainContent';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function Details() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <TopMenu />
      <SideMenu /> */}
      <MainContent />
    </div>
  );
}

export default Home;
