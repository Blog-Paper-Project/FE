import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../shared/apis/Apis";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDB } from "../redux/modules/Booking";

import { useParams } from "react-router-dom";

import CalendarTemplate from "../components/booking/Calendar";
import Header from "../components/main/Header";
import Footer from "../components/main/Footer";

const Reservation = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookingDB());
  }, []);

  // console.log(LeafCount)
  // console.log(userId)

  const [availability, setAvailability] = useState([]);
  const Calendar = CalendarTemplate({
    blogId,
    availability,
    setAvailability,
  });
  return (
    <div>
      <Header/>
      <Calendar userId={blogId}/>
      <Footer/>
    </div>
  );
};

export default Reservation;
