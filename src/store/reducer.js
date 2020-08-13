const initialState = {
    logedIn: false
};

const reducer =(state = initialState, action)=>{
    if(action.type === "LOGIN"){
        return {
            ...state,
            logedIn: true
        };
    }
    if(action.type === "LOG_OUT"){
        return{
            ...state,
            logedIn: false
        };
    }
    return state;
};

export default reducer;