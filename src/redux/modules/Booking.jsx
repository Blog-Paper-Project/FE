import { api } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";
import Swal from 'sweetalert2';


//액션타입
const GET_BOOKING = 'GET_BOOKING';
const GET_NOTI = 'GET_NOTI';

//액션 크리에이터
const getBooking = (data) => {
    return { type: GET_BOOKING, data };
};
const getNoti = (data) => {
    return { type: GET_NOTI, data }
};

const initialState = {
    list: [],
    noti: [],
};

//---------청크--------------//
// 예약하기
export const setBookingDB = (data, tutorName) => {
    return function (dispatch, getState) {
        
        let userId = getCookie('userId')
        let isTutor = getCookie('nickname')
        console.log(userId);
        console.log('DB 저장으로 가는 데이터 : ', { data, tutorName });
        if (!userId) {
            Swal.fire({
                icon: 'error',
                text: `로그인후 예약해주세요~!`,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                timer: 2000,
            });
            return;
        }

        if (isTutor === 1) {
            Swal.fire({
                icon: 'error',
                text: `선생님은.. 예약 할수 없어요... ㅠㅠ`,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                timer: 2000,
            });
            return;
        }

        if (data.length === 0) {
            Swal.fire({
                icon: 'error',
                text: '시간과 날짜를 선택해주세요~',
                confirmButtonColor: '#3085d6',
                confirmButtonText: '확인',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }

        console.log(data);

        api({
            method: 'post',
            url: `/api/booking/${userId}`,
            data: {
                start: data[0]?.start,
                end: data[0]?.end,
                userName: userId,
            },
        })
            .then((doc) => {
                const startTime = data[0].start;
                const endTime = data[0].end;

                let [week, month, day, year, sTime] = startTime.toString().split(' ');
                let start = sTime.substr(0, 5);
                let end = endTime.toString().substr(-17, 5);

                let Month = (month) => {
                    console.log(month);
                    if (month === 'Jan') return '1';
                    if (month === 'Feb') return '2';
                    if (month === 'Mar') return '3';
                    if (month === 'Apr') return '4';
                    if (month === 'May') return '5';
                    if (month === 'Jun') return '6';
                    if (month === 'Jul') return '7';
                    if (month === 'Aug') return '8';
                    if (month === 'Sep') return '9';
                    if (month === 'Oct') return '10';
                    if (month === 'Nov') return '11';
                    if (month === 'Dec') return '12';
                };

                Swal.fire({
                    icon: 'success',
                    text: `${Month(
                        month,
                    )}월  ${day}일   ${start} - ${end} 예약 되었습니다!!`,
                    showConfirmButton: true,
                    confirmButtonColor: '#3085d6',
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

// 예약리스트 불러오기
export const getBookingDB = ({ userId, isTutor }) => {
    return function (dispatch, getState) {
      api({
        method: 'get',
        url: `/api/booking/${userId}&isTutor=${isTutor}`, // 학생 또는 선생님
      })
        .then((doc) => {
          dispatch(getBooking(doc.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };

  // 알림 예약 불러오기
export const getBookingNotiDB = (userId) => {
    return function (dispatch, getState) {
      api({
        method: 'get',
        url: `/api/booking/${userId}`,
        headers: { token: `${getCookie('token')}` },
      })
        .then((doc) => {
          dispatch(getNoti(doc.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };


//리듀서
const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKING:
            return { data: action.payload };
        case GET_NOTI:
            return { data: action.payload };
        default:
            return state;        
    }
};

export default bookingReducer;