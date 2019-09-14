import React, {Fragment} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import store from './store';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NavigationService from './NavigationService';

import HomeScreen from './screens/HomeScreen';
import SearchCityScreen from './screens/SearchCityScreen';

const MainStack = createStackNavigator({
    Home: {screen: HomeScreen},
    Search: {screen: SearchCityScreen},
});

const Navigation = createAppContainer(MainStack);
const App = () => (
    <Provider store={store}>
        <Navigation
            ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
            }}
        />
    </Provider>
);
export default App;
