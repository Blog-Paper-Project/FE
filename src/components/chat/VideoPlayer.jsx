import React, { useContext } from "react";
import { Grid, Typography, Paper, makeStyles } from "@material-ui/core";
import default_profile from "../../public/images/default_profile.png";

import { SocketContext } from "../../Context";

const useStyles = makeStyles((theme) => ({
  video: {
    width: "550px",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
    },
  },
  gridContainer: {
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  paper: {
    padding: "10px",
    border: "2px solid black",
    margin: "0 10px",
  },
}));

const VideoPlayer = () => {
  const {
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
  } = useContext(SocketContext);
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer}>
      {callAccepted && stream ? (
        <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>Me</Typography>
          <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
        </Grid>
      </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Me
            </Typography>
            <img src={default_profile} className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded ? (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              You
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              You
            </Typography>
            <img src={default_profile} className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
