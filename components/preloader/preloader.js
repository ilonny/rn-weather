import React, {useEffect, useState} from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

import { preloaderStyles } from "../../constants/styles"

const Preloader = () => (
    <View style={preloaderStyles}>
        <ActivityIndicator />
    </View>
)

export default Preloader;