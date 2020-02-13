import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import NavigationService from './screen/NavigationService';

import HomeScreen from './screen/HomeScreen2';
import ReseptienSelaus from './screen/ReseptienSelaus';
import Juuri from './screen/Juuri';
import Muokkaa from './screen/Muokkaa';
import Asetukset from './screen/Asetukset';

//const AppContainer = createAppContainer(TopLevelNavigator);

const RootStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    ReseptienSelaus: {screen: ReseptienSelaus},
    Juuri: {screen: Juuri},
    Muokkaa: {screen: Muokkaa},
    Asetukset: {screen: Asetukset},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
        
      }
    }
  
);
const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
    return (<AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />);
  }
}