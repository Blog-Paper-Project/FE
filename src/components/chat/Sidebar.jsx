import React, { useContext } from "react";
import { Button, Grid, Container, Paper } from "@material-ui/core";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import { Phone, PhoneDisabled } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { SocketContext } from "../../Context";
import styled from "styled-components";

// import AudioOff from "../../public/images/AudioOff.svg";
// import AudioOn from "../../public/images/AudioOn.svg";
// import VideoOff from "../../public/images/VideoOff.svg";
// import VideoOn from "../../public/images/VideoOn.svg";
// import ShareScreen from "../../public/images/ShareScreen.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  container: {
    width: "600px",
    margin: "35px 0",
    padding: 0,
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: "10px 20px",
  },
}));

const Sidebar = ({ children }) => {
  const {
    callAccepted,
    // callEnded,
    idToCall,
    // audioOn,
    // videoOn,
    // audioHandler,
    // videoHandler,
    // shareScreen,
    leaveCall,
    callUser,
    call,
    answerCall,
  } = useContext(SocketContext);
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {/* <Paper elevation={10} className={classes.paper}> */}
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container className={classes.gridContainer}>
          {/* <ButtonList>
              <div>
                {audioOn ? (
                  <button size={25} onClick={audioHandler}>
                    <img src={AudioOff} alt="" />
                  </button>
                ) : (
                  <button size={25} onClick={audioHandler}>
                    <img src={AudioOn} alt="" />
                  </button>
                )}
              </div>
              <div>
                {videoOn ? (
                  <button size={25} onClick={videoHandler}>
                    <img src={VideoOff} alt="" />
                  </button>
                ) : (
                  <button size={25} onClick={videoHandler}>
                    <img src={VideoOn} alt="" />
                  </button>
                )}
              </div>
              <div>
                <button size={25} onClick={shareScreen}>
                  <img src={ShareScreen} />
                </button>
              </div>
            </ButtonList> */}
          {callAccepted ? (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<PhoneDisabled fontSize="large" />}
              fullWidth
              onClick={leaveCall}
              className={classes.margin}
            >
              나가기
            </Button>
          ) : call.isReceivingCall && !callAccepted ? (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={answerCall}
              className={classes.margin}
            >
              Answer
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Phone fontSize="large" />}
              fullWidth
              onClick={() => callUser(idToCall)}
              className={classes.margin}
            >
              화상 연결하기
            </Button>
          )}
        </Grid>
      </form>
      {children}
      {/* </Paper> */}
    </Container>
  );
};

// const ButtonWrap = styled.div`
//   display: flex;
//   justify-content: center;
//   width: 100%;
// `;

// const Button = styled.button`
//   width: 300px;
//   height: 50px;
//   font-size: 15px;
//   border: 1px solid #333;
//   &:hover {
//     color: #fff;
//     background-color: #153587;
//   }
// `;

// const ButtonOut = styled(Button)`
//   width: 300px;
//   height: 50px;
//   font-size: 15px;
//   border: 1px solid #333;
//   &:hover {
//     color: #fff;
//     background-color: #981821;
//   }
// `;

export default Sidebar;
