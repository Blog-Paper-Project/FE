import React,{ useState }from 'react';
import styled from 'styled-components';
import { api } from '../shared/apis/Apis';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import CalendarTemplate from '../components/booking/Calendar';


const Reservation = () => {
  const {userId} = useParams();

  console.log(userId)

  const [availability, setAvailability] = useState([])
  const Calendar = CalendarTemplate({
    availability,
    setAvailability,
  })
  return (
    <div>
      <Calendar />
    </div>
  );
}

export default Reservation