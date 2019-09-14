import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {pageContainer} from '../constants/styles';
import {selectCurrentCity} from '../store/selectors';
import {setCurrentCityAction} from '../store/ac';
import SuggestionsInput from '../components/suggestions-input';
const SearchCityScreen = ({setCurrentCity}) => {
    // useEffect(() => {
    // });
    return (
        <SafeAreaView style={pageContainer}>
            <SuggestionsInput setCurrentCity={setCurrentCity}/>
        </SafeAreaView>
    );
};
SearchCityScreen.navigationOptions = ({navigation}) => ({
    // headerRight: (
    //     <TouchableOpacity style={{marginRight: 5}} onPress={() => AsyncStorage.removeItem('chosen_city').then(() => navigation.navigate('Home'))}>
    //         <Text>Определить по геопозиции</Text>
    //     </TouchableOpacity>
    // ),
    headerTitle: "Начните вводить название города",
    headerLeft: null,
    gesturesEnabled: false,
});
export default connect(
    state => ({
        currentCity: selectCurrentCity(state),
    }),
    dispatch => ({
        setCurrentCity: city => dispatch(setCurrentCityAction(city)),
    }),
)(SearchCityScreen);
