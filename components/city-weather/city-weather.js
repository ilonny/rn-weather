import React, {useEffect, useState, useCallback, Fragment} from 'react';
import {Text, View, ScrollView, FlatList} from 'react-native';
import Preloader from '../preloader';
import {
    weatherTitle,
    pageContainer,
    forecastItem,
    forecastItemRow,
} from '../../constants/styles';
import {formatDate} from "../../utils"
const CityWeather = ({city, forecast, fetchForecast}) => {
    useEffect(() => {
        console.log('forecast', forecast);
    });
    const [refreshing, setRefreshing] = useState(false);
    onRefresh = useCallback(() => {
        setRefreshing(true);
        return new Promise(resolve => {
            fetchForecast(city);
            resolve();
        }).then(() => setRefreshing(false));
    }, [refreshing]);
    const renderItem = ({item}) => {
        const weather = item.weather[0];
        const {main} = item;
        return (
            <View style={forecastItem}>
                <View style={forecastItemRow}>
                    <Text>{formatDate(item.dt)}</Text>
                    <Text>{weather.description}</Text>
                </View>
                <View style={forecastItemRow}>
                    <Text>Температура:</Text>
                    <Text>{main.temp} С°</Text>
                </View>
                <View style={forecastItemRow}>
                    <Text>Минимальная температура:</Text>
                    <Text>{main.temp_min} С°</Text>
                </View>
                <View style={forecastItemRow}>
                    <Text>Максимальная температура:</Text>
                    <Text>{main.temp_max} С°</Text>
                </View>
            </View>
        );
    };
    _keyExtractor = item => item.dt.toString();
    return forecast ? (
        <Fragment>
            <View>
                <Text style={weatherTitle}>Погода в г. {city}</Text>
            </View>
            {forecast.cod != 404 ? (
                <FlatList
                data={forecast.list}
                renderItem={renderItem}
                refreshing={refreshing}
                onRefresh={onRefresh}
                keyExtractor={_keyExtractor}
                />
            ): (
                <Text style={{textAlign: 'center'}}>Город не найден</Text>
            )}
        </Fragment>
    ) : (
        <Preloader />
    );
};

export default CityWeather;
