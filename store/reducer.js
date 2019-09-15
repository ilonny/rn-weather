import {SET_CURRENT_CITY, SET_FORECAST} from '../constants/action_types';

const initialState = {
    currentCity: '',
    forecast: '',
    updateTime: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_CITY:
            return {
                ...state,
                currentCity: action.city,
            };
        case SET_FORECAST:
            return {
                ...state,
                forecast: action.res,
                updateTime: Date.now(),
            };
        default:
            return state;
    }
};
