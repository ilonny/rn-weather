import {SET_CURRENT_CITY, SET_FORECAST} from '../constants/action_types';

export const setCurrentCityAction = city => (dispatch, getState) => {
    const state = getState();
    dispatch({
        type: SET_CURRENT_CITY,
        city,
    });
    if (city != state.currentCity) {
        dispatch(fetchForecast(city));
    }
};

export const fetchForecast = city => dispatch => {
    console.log(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city},ru&APPID=ea701ad7a826a310d73e33f9d1c3083d&lang=ru&units=metric`,
    );
    fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city},ru&APPID=ea701ad7a826a310d73e33f9d1c3083d&lang=ru&units=metric`,
    )
        .then(res => res.json())
        .then(res => {
            if (res.cod != 429) {
                dispatch({
                    type: SET_FORECAST,
                    res,
                });
            } else {
                console.log('//пробуем другое api..');
                console.log(`https://community-open-weather-map.p.rapidapi.com/forecast?q=surgut%2Cru&lang=ru&units=metric`);
                fetch(
                    `https://community-open-weather-map.p.rapidapi.com/forecast?q=surgut%2Cru&lang=ru&units=metric`,
                    {
                        headers: {
                            'x-rapidapi-host':
                                'community-open-weather-map.p.rapidapi.com',
                            'x-rapidapi-key':
                                'e6a2e7a669mshaef7ccdbda64b1fp1d54e0jsn7343d1c54b6a',
                        },
                    },
                )
                    .then(res => res.json())
                    .then(res => {
                        if (res.cod != 429) {
                            dispatch({
                                type: SET_FORECAST,
                                res,
                            });
                        } else {
                            //пробуем другое api..
                        }
                    });
            }
        });
};
