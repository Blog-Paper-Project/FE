import { api, apiToken } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";

const GET_LEAF = "GET_LEAF";

const getLeaf = (data) => {
    console.log(data);
    return { type: GET_LEAF, data }
}

const initialState = {
    selectLeaf: [],
};
// 나뭇잎 갯수 변경
export const patchLeafDB = (userId, LeafCount) => {
    return function () {
        console.log(LeafCount)
        apiToken({
            method: "patch",
            url: `/api/booking/leaf/${userId}`,
            data: {
                setPoint: Number(LeafCount),
            },
        })
            .then(() => {
                Swal.fire({
                    icon: "success",
                    text: `채팅에 필요한 나뭇잎 갯수를 변경 하였습니다!`,
                    showConfirmButton: true,
                    confirmButtonColor: "#3085d6",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

//채팅용 나뭇잎 갯수 확인
export const getLeafDB = (blogId) => {
    return function (dispatch) {
        apiToken({
            method: "get",
            url: `/api/booking/leaf/${blogId}`,
        })
            .then((doc) => {
                console.log(doc)
                dispatch(getLeaf(doc.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

const leafReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEAF:
            return { ...state, data: action.data };
        default:
            return state;
    }
};

export default leafReducer;