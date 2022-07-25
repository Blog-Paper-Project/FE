import React from "react";
import { Typography, AppBar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Sidebar from "../components/chat/Sidebar";
import Notifications from "../components/chat/Notifications";
import VideoPlayer from "../components/chat/VideoPlayer";
import Chatting from "../components/chat/Chatting";

import Header from "../components/main/Header";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "600px",
    border: "2px solid black",

    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  image: {
    marginLeft: "15px",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

const Chat = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography variant="h2" align="center">
            Video Chat
          </Typography>
        </AppBar>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
        <Chatting />
      </div>
    </>
  );
};

export default Chat;
