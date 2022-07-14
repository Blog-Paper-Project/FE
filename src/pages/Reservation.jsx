import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "../shared/apis/Apis";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDB } from "../redux/modules/Booking";

import { useParams } from "react-router-dom";

import CalendarTemplate from "../components/booking/Calendar";
import ReservationList from "../components/booking/ReservationList";
import { getCookie } from "../shared/Cookie";
import LeafDrop from "../components/booking/LeafDrop";

const Reservation = () => {
  const [LeafCount, setLeafCount] = useState("");
  const { userId } = useParams();
  const userName = getCookie("userId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookingDB());
  }, []);

  // console.log(LeafCount)
  // console.log(userId)

  const [availability, setAvailability] = useState([]);
  const Calendar = CalendarTemplate({
    LeafCount,
    userId,
    availability,
    setAvailability,
  });
  return (
    <div>
      <LeafDrop setLeafCount={setLeafCount} LeafCount={LeafCount} />
      <Calendar userId={userId} LeafCount={LeafCount} />
    </div>
  );
};

export default Reservation;
