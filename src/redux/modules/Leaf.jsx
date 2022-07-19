import { api, apiToken } from "../../shared/apis/Apis";
import { getCookie } from "../../shared/Cookie";
import Swal from "sweetalert2";

const PATCH_LEAF = "PATCH_LEAF";

const patchLeaf = (setPoint) => {
    console.log(setPoint)
    return { type: PATCH_LEAF, setPoint }
}

const initialState = {
    selectLeaf: {
        setPoint: 5,
    }
};
export const setLeafDB = (userId, LeafCount) => {
    return function () {
        console.log(LeafCount)
        apiToken({
            method: "post",
            url: `/api/booking/leaf/${userId}`,
            data: {
                setPoint: Number(LeafCount),
            },
        })
        .then(() => {
            Swal.fire({
                icon: "success",
                text: `채팅에 필요한 나뭇잎 갯수를 설정 하였습니다!`,
                showConfirmButton: true,
                confirmButtonColor: "#3085d6",
              });
         })
         .catch((err) => {
            console.log(err);
        });
    }
}

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

const leafReducer = (state = initialState, action) => {
    switch (action.type) {
        case PATCH_LEAF:
            return { data: action.data };
        default:
            return state;
    }
};

export default leafReducer;