import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    Alert,
    AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import {
    selectCurrentCity,
    selectForecast,
    selectUpdateTime,
} from '../store/selectors';
import CityWeather from '../components/city-weather';
import {pageContainer} from '../constants/styles';
import Geolocation from '@react-native-community/geolocation';
import {setCurrentCityAction, fetchForecast} from '../store/ac';
import Preloader from '../components/preloader';

const HomeScreen = ({
    navigation,
    currentCity,
    setCurrentCity,
    forecast,
    fetchForecast,
    updateTime,
}) => {
    const [loading, setLoading] = useState(true);
    const detectCity = (force = false) => {
        console.log('detect city fired');
        // AsyncStorage.clear();
        AsyncStorage.getItem('chosen_city', (err, value) => {
            if (!value || force) {
                //если не было сохранено города, попробуем определить по геолокации
                Geolocation.getCurrentPosition(
                    pos => {
                        const {latitude, longitude} = pos.coords;
                        fetch(
                            `https://locationiq.com/v1/reverse_sandbox.php?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`,
                        )
                            .then(res => res.json())
                            .then(res => {
                                const {city} = res.address;
                                if (city) {
                                    Alert.alert(
                                        `Is your city of ${city}?`,
                                        '',
                                        [
                                            {
                                                text: 'No, change city',
                                                onPress: () =>
                                                    navigation.navigate(
                                                        'Search',
                                                    ),
                                            },
                                            {
                                                text: 'Yes',
                                                onPress: () => {
                                                    AsyncStorage.setItem(
                                                        'chosen_city',
                                                        city,
                                                    ).then(() => {
                                                        setCurrentCity(city),
                                                            setLoading(false);
                                                    });
                                                },
                                            },
                                        ],
                                    );
                                } else {
                                    Alert.alert(
                                        'Не удалось определить ваше местоположение',
                                    );
                                    setLoading(false);
                                    navigation.navigate('Search');
                                }
                            });
                    },
                    //по геолокации не получилось, отправляем искать руками
                    err => {
                        Alert.alert(
                            'Не удалось определить ваше местоположение',
                        );
                        navigation.navigate('Search');
                    },
                );
                //на устройстве уже выбран город
            } else {
                setCurrentCity(value);
                setLoading(false);
            }
        });
    };
    useEffect(() => {
        navigation.setParams({detectCity: () => detectCity(true)});
        detectCity();
    }, []);
    useEffect(() => {
        if (forecast) {
            setLoading(false);
        }
    });
    return (
        <SafeAreaView style={pageContainer}>
            {loading ? (
                <Preloader />
            ) : (
                <CityWeather
                    city={currentCity}
                    forecast={forecast}
                    fetchForecast={fetchForecast}
                    updateTime={updateTime}
                />
            )}
        </SafeAreaView>
    );
};
HomeScreen.navigationOptions = ({navigation}) => {
    const detectCity = navigation.getParam('detectCity');
    return {
        headerLeft: (
            <TouchableOpacity
                onPress={() => detectCity()}
                style={{marginLeft: 5}}>
                <Text>Определить по геолокации</Text>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                style={{marginRight: 5}}>
                <Text>Выбрать город</Text>
            </TouchableOpacity>
        ),
    };
};
export default connect(
    state => ({
        currentCity: selectCurrentCity(state),
        forecast: selectForecast(state),
        updateTime: selectUpdateTime(state),
    }),
    dispatch => ({
        setCurrentCity: city => dispatch(setCurrentCityAction(city)),
        fetchForecast: city => dispatch(fetchForecast(city)),
    }),
)(HomeScreen);
