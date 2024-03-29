import React, {useEffect, useState, Fragment} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    AsyncStorage,
    FlatList,
} from 'react-native';
import Preloader from '../../components/preloader';
import {inputWrapper, cityListItem, inputStyle} from '../../constants/styles';
import {debounce} from '../../utils';
import NavigationService from '../../NavigationService';
const SuggestionsInput = ({setCurrentCity}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const getSuggestions = val => {
        setLoading(true);
        fetch(
            `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address?`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization:
                        'Token eadbc452286d23c7163b38989884d5ae40d08ade',
                },
                body: JSON.stringify({
                    count: 10,
                    query: val,
                    from_bound: {value: 'city'},
                    to_bound: {value: 'city'},
                }),
            },
        )
            .then(res => res.json())
            .then(res => {
                setSuggestions(
                    res.suggestions.map(city => ({
                        value: city.data.city,
                        f_id: city.data.city_fias_id,
                    })),
                );
                setLoading(false);
            });
    };
    const handlePressCity = city => {
        AsyncStorage.setItem('chosen_city', city).then(() => {
            setCurrentCity(city);
            NavigationService.navigate('Home');
        });
    };
    const renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => {
                handlePressCity(item.value);
            }}>
            <View style={cityListItem}>
                <Text>{item.value}</Text>
            </View>
        </TouchableOpacity>
    );
    //тут могут попадаться города с одинаковым началом названия, поэтому могут возникнуть одинаковые ключи.. тк апи упрощенное
    _keyExtractor = item => item.f_id;
    return (
        <Fragment>
            <View style={inputWrapper}>
                <TextInput
                    autoFocus={true}
                    onChangeText={debounce(text => getSuggestions(text), 200)}
                    style={inputStyle}
                />
            </View>
            {loading ? (
                <Preloader />
            ) : (
                <FlatList
                    data={suggestions}
                    renderItem={renderItem}
                    keyExtractor={_keyExtractor}
                />
            )}
        </Fragment>
    );
};

export default SuggestionsInput;
