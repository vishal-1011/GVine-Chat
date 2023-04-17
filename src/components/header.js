/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    Image, StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Menu from '../asset/svg/menu'
import BackArrow from '../asset/svg/backArrow'
import Logout from '../asset/svg/logOut';
import { style } from '../constants/constants';

const Header = ({ isBackArrowVisible, isMenuVisible, onPressBackArrow, isLogoImageVisible, title }) => {
    return (
        <View style={{ height: 70, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderBottomColor: 'white', borderBottomWidth: 0.5, }}>
            <View style={{ marginLeft: isMenuVisible?-5:-30, position:'relative' }} >

                {isMenuVisible ? <Menu /> : null}
                {isBackArrowVisible ? <TouchableOpacity onPress={() => onPressBackArrow()}>
                    <BackArrow />
                </TouchableOpacity> : null}
            </View>
            {isLogoImageVisible ?
                <Image
                    source={require('../asset/logo.png')}
                    style={{
                        width: 150,
                        height: 100,
                        resizeMode: 'contain',
                        margin: 30,
                    }}
                /> : <View >
                    <Text style={{ color: style.THEMECOLOR, fontSize: 19, fontWeight: 600, fontFamily: 'fantasy' }}>{title}</Text>
                </View>}
            <View />
            {/* <Text style={{color:'white'}}>fffff</Text> */}
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Header;
