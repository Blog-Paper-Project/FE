import { api, apiToken } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";

//액션타입
const GET_BOOKING = "GET_BOOKING";
// const DEL_BOOKING = "DEL_BOOKING";

//액션 크리에이터
const getBooking = (data) => {
  // console.log(data);
  return { type: GET_BOOKING, data };
};
// const delBooking =(data) => {
//   return { type: DEL_BOOKING, data}
// }


const initialState = {
  list: [],
};

//---------청크--------------//
// 예약하기
const userName = getCookie("blogId");
export const setBookingDB = (data, blogId) => {
  return function (dispatch, getCookie) {
    console.log(blogId);
    console.log(userName);
    console.log("DB 저장으로 가는 데이터 : ", { data, blogId });
    if (!userName) {
      Swal.fire({
        icon: "error",
        text: `로그인후 예약해주세요~!`,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        timer: 2000,
      });
      return;
    }

    if (blogId === userName) {
      Swal.fire({
        icon: "error",
        text: `선생님은.. 예약 할수 없어요... ㅠㅠ`,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        timer: 2000,
      });
      return;
    }

    if (data.length === 0) {
      Swal.fire({
        icon: "error",
        text: "시간과 날짜를 선택해주세요~",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "확인",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }

    console.log(data);

    apiToken({
      method: "post",
      url: `/api/booking/${blogId}`,
      data: {
        // time: `${data[0]?.start}-${data[0]?.end}`,
        start: data[0]?.start,
        end: data[0]?.end,
        blogId: userName,
      },
    })
      .then((doc) => {
        const startTime = data[0].start;
        const endTime = data[0].end;

        let [week, month, day, year, sTime] = startTime.toString().split(" ");
        let start = sTime.substr(0, 5);
        let end = endTime.toString().substr(-17, 5);
        let Month = (month) => {
          if (month === "Jan") return "1";
          if (month === "Feb") return "2";
          if (month === "Mar") return "3";
          if (month === "Apr") return "4";
          if (month === "May") return "5";
          if (month === "Jun") return "6";
          if (month === "Jul") return "7";
          if (month === "Aug") return "8";
          if (month === "Sep") return "9";
          if (month === "Oct") return "10";
          if (month === "Nov") return "11";
          if (month === "Dec") return "12";
        };

        Swal.fire({
          icon: "success",
          text: `${Month(
            month
          )}월  ${day}일   ${start} - ${end} 예약 되었습니다!!`,
          showConfirmButton: true,
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.msg === " 보유한 나뭇잎이 부족합니다.") {
          Swal.fire({
            title: "예약에 필요한 나뭇잎이 부족합니다!",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
        if (err.response.data.msg === "이미 지나간 시간대에는 예약할 수 없습니다.") {
          Swal.fire({
            title: "이미 지나간 시간에는 예약 하실 수 없습니다!",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
        if (err.response.data.msg === "예약 가능 횟수를 초과하였습니다.") {
          Swal.fire({
            title: "예약은 최대 12개 까지 가능합니다!",
            icon: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "확인",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      });
  };
};

// 예약리스트 불러오기
export const getBookingDB = () => {
  return function (dispatch) {
    apiToken({
      method: "get",
      url: `/api/booking`, // 학생 또는 선생님
    })
      .then((doc) => {
        // console.log(doc.data.totalList);
        dispatch(getBooking(doc.data.totalList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 예약 수락하기
export const patchBookingDB = (hostId) => {
    return function () {
    apiToken({
      method: "patch",
      url: `/api/booking/${hostId.hostId}/${hostId.bookingId}`,
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: `예약을 수락 하셨 습니다!`,
          showConfirmButton: true,
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 호스트 예약 취소
export const deleteHostBookingDB = (hostId) => {
  console.log(hostId)
  return function () {
    apiToken({
      method: "delete",
      url: `/api/booking/host/${hostId.hostId}/${hostId.bookingId}`,
    })
    .then(() => {
      // dispatch(delBooking())
      Swal.fire({
        icon: "success",
        text: `예약을 취소 하셨 습니다!`,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      });
      
    })
    .catch((err) => {
      console.log(err);
    });
  };
};

// 게스트 예약 취소
export const deleteGuestBookingDB = (Guest, bookingId) => {
  return function () {
    console.log(Guest, bookingId)
    apiToken({
      method: "delete",
      url: `/api/booking/guest/${Guest}/${bookingId}`,
    })
    .then((bookingId) => {
      // dispatch(delBooking(bookingId))
      Swal.fire({
        icon: "success",
        text: `예약을 취소 하셨 습니다!`,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
      });
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
      return { data: action.data };
    // case DEL_BOOKING:
    //   const newList = state.list.filter((state) => {return state.bookingId !== action.id});
    //   return {...state,list:[...newList]};
      default:
      return state;
  }
};

export default bookingReducer;
