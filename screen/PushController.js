import React, { Component } from 'react';
import PushNotification from 'react-native-push-notification';
import NavigationService from '../screen/NavigationService';

export default class PushController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
          global.alarm = true;
        NavigationService.navigate('ReseptienSelaus');
        
      },
    });
  }

  render() {
    return null;
  }
}