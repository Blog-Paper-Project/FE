import { api, apiToken } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";
import Swal from 'sweetalert2';


//액션타입
const GET_BOOKING = 'GET_BOOKING';
const GET_NOTI = 'GET_NOTI';

//액션 크리에이터
const getBooking = (data) => {
    console.log(data)
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
let userName = getCookie('userId')
console.log(userName);
export const setBookingDB = (data, userId, LeafCount) => {
    return function (dispatch, getCookie) {
        
        
        // let isTutor = getCookie('nickname')
        console.log(userId)
        console.log(userName);
        console.log('DB 저장으로 가는 데이터 : ', { data, userId, LeafCount });
        if (!userName) {
            Swal.fire({
                icon: 'error',
                text: `로그인후 예약해주세요~!`,
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                timer: 2000,
            });
            return;
        }

        if (userId === userName) {
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

        apiToken({
            method: 'post',
            url: `/api/booking/${userId}`,
            data: {
                // time: `${data[0]?.start}-${data[0]?.end}`,
                guestId: userName,
                leaf: Number(LeafCount),
                date: `${data[0]?.start}-${data[0]?.end}`,
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
                    console.log(start)
                    console.log(sTime)
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
export const getBookingDB = () => {
    return function (dispatch) {
      apiToken({
        method: 'get',
        url: `/api/booking`, // 학생 또는 선생님
      })
        .then((doc) => {
            console.log(doc.data.inquireResult)
          dispatch(getBooking(doc.data.inquireResult));
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
            console.log(action.data)
            return { data: action.data };
        case GET_NOTI:
            return { data: action.data };
        default:
            return state;        
    }
};

export default bookingReducer;