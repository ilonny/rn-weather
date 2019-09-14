import React, {useEffect, useState, Fragment} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    AsyncStorage,
} from 'react-native';
import Preloader from '../../components/preloader';
import {inputWrapper, cityListItem} from '../../constants/styles';
import {debounce} from '../../utils';
import {FlatList} from 'react-native-gesture-handler';
import NavigationService from '../../NavigationService';
const SuggestionsInput = ({setCurrentCity}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const getSuggestions = val => {
        console.log('getSuggestions', val);
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
                setSuggestions(res.suggestions.map(city => city.data.city));
                setLoading(false);
            });
    };
    useEffect(() => {
        console.log('sugg', suggestions);
        console.log('setCurrentCity', setCurrentCity);
    });
    const handlePressCity = city => {
        console.log('handlePressCity', city);
        AsyncStorage.setItem('chosen_city', city).then(() => {
            setCurrentCity(city);
            NavigationService.navigate('Home');
        });
    };
    const renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => {
                handlePressCity(item);
            }}
            key={item}>
            <View style={cityListItem}>
                <Text>{item}</Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <Fragment>
            <View style={inputWrapper}>
                <TextInput
                    autoFocus={true}
                    onChangeText={debounce(text => getSuggestions(text), 200)}
                />
            </View>
            {loading ? (
                <Preloader />
            ) : (
                <FlatList data={suggestions} renderItem={renderItem} />
            )}
        </Fragment>
    );
};

export default SuggestionsInput;
