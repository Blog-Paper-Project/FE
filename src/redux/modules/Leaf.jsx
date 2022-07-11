const SELECT_LEAF = "SELECT_LEAF";

const selectLeaf = (selectLeaf) => {
    return { type: SELECT_LEAF, selectLeaf }
}

const initialState = {
    selectLeaf: {
        leaf: 5,
    }
};

export const selectLeafDB = (leaf = null, type) => {
    return function (dispatch, getState) {
        let selectData = getState().handle.selectLeaf;
        if (type === "point") {
            selectData = {
                ...selectData,
                point: leaf,
            }
        }
        dispatch(selectLeaf(selectData));
    };
};

const leafReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_LEAF:
            return { data: action.data };
        default:
            return state;
    }
};

export default leafReducer;