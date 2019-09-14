import {createSelector} from 'reselect'

export const selectCurrentCity = createSelector(
    state => state.currentCity,
    currentCity => currentCity
)

export const selectForecast = createSelector(
    state => state.forecast,
    forecast => forecast
)