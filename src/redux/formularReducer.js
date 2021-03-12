
const SET_NEW_FORMULAR_VALUES = "formular/set/new/values";

let initialState = {
width: 20,
    height: 20,
    lifeCycles: 10
}

export let formularReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_NEW_FORMULAR_VALUES: {
            debugger; 
            return {
                ...state,
                width: action.width,
                height: action.height,
                lifeCycles: action.lifeCycles
            }
        }
        default: return state;
    }
}

let setNewValuesFormularAC = (height, width, lifeCycles) => ({type: SET_NEW_FORMULAR_VALUES, height, width, lifeCycles});

export let updateValuesOfFormular = (fieldHeight, fieldWidth, lifecycles) => {
    return (dispatch) => {
debugger;
        dispatch(setNewValuesFormularAC(fieldHeight, fieldWidth, lifecycles));
    }
}