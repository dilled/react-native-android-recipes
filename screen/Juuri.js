import React, { Component }from 'react';
import { StyleSheet, View, Text, AsyncStorage, ScrollView, Image, Dimensions, TouchableOpacity, Picker, AppState, Platform, Alert, TextInput} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';
import NavigationService from '../screen/NavigationService';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
class Juuri extends Component {
  constructor(props) {
    super(props);
   // this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      ruis: [],
      seconds: 0,
      tableHead: [['Aine', 'Gramma', '-', '+']],
      mita: 'min',
      min: false,
      pai: false,
      rek: false,
      poista: false,   
      poistettava: [], 
      
    }
  }
  
  async componentDidMount(){
    //AppState.addEventListener('change', this.handleAppStateChange);
    try{
/*
      var merkitData = require('../data/taikinat.json');
      global.ruis  = merkitData.merkit.map(function(item) {
        return {
          key: item.key,
          label: item.label,
          value: item.value
        };
      });*/
      this.setState({ruis: global.taikinat})
      this.setState({rui: global.taikinat})
      
  }catch(error){
  }
  return 
}
async reset () {
  try{/*
    var merkitData = require('../data/reseptit.json');
    global.taikinat  = merkitData.taikinat.map(function(item) {
      return {
        key: item.key,
        label: item.label,
        value: item.value
      };
    });
    this.setState({ruis: global.taikinat})
    */
}catch(error){
}
return 

}
componentWillUnmount() {
 // AppState.removeEventListener('change', this.handleAppStateChange);
}

handleAppStateChange(appState) {
  //if (appState === 'active') {
    let date = new Date(Date.now() + (this.state.seconds * 1000));

    if (Platform.OS === 'ios') {
      date = date.toISOString();
    }

    PushNotification.localNotificationSchedule({
      message: "Juuri kaipaa huomiota!",
      date,
    });
  }//}

  rendermuu() {
   
    return (

      <View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.itm2}
            onPress={() => this.setState({vaihe1: true,
              vaihe2: false,
              vaihe3: false,
              seconds: (6)})}
          ><Text style={styles.text2}>Vaihe 1</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.itm2}
            onPress={() => this.setState({vaihe2: true,
              vaihe1: false,
              vaihe3: false,
              seconds: (60*60*24)})}
          ><Text style={styles.text2}>Vaihe 2</Text></TouchableOpacity>
          <TouchableOpacity
            style={styles.itm2}
            onPress={() => this.setState({vaihe3: true,
              vaihe2: false,
              vaihe1: false,
              seconds: (60*60*24)})}
          ><Text style={styles.text2}>Vaihe 3</Text></TouchableOpacity>
        </View>
        
        <PushController />
        <View style={styles.container2}>
           { this.state.vaihe1 ? this.rendervaihe1() : this.state.vaihe2 ? this.rendervaihe2() : this.state.vaihe3 ? this.rendervaihe3() : this.rendervaihe1()} 
          <TouchableOpacity 
              style={styles.button}
              onPress={() => {let date = new Date(Date.now() + (this.state.seconds * 1000));
                this.setState({muistutus: date});
                PushNotification.localNotificationSchedule({
                message: "Juuri kaipaa huomiota!",
                date,
              })
               // this.props.navigation.goBack()
              }}
            ><Text>Aseta muistutus</Text></TouchableOpacity>
            </View>
            <Text>{JSON.stringify(this.state.muistutus)}</Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => this.props.navigation.goBack()}
          ><Text>    Takaisin  </Text></TouchableOpacity>
      </View>
    )
  }
  rendervaihe1(){
    return (
      <View>
      <TouchableOpacity
              style={styles.button}
              disabled={true}
              onPress={() => this.props.navigation.navigate('Atiedot')}>
              <Text style={styles.text4}>
                1. päivä {'\n'}
                2dl
                ruisjauhoja{'\n'}
                2dl
                kädenlämpöistä vettä
              </Text>
            </TouchableOpacity>
            <Text style={styles.text4}>
          Sekoita jauhot ja kädenlämpöinen vesi keskenään kulhossa. Peitä astia kelmulla ja anna seistä lämpimässä paikassa 
          (esim. lattialämmityksen päällä tai lieden reunassa) 2 vuorokautta. Sekoita muutaman kerran. Juuri alkaa hiljalleen kuplia.
        </Text>
        </View>
    )
  }
  rendervaihe2(){
    return (
      <View>
      <TouchableOpacity
              style={styles.button}
              disabled={true}
              onPress={() => this.props.navigation.navigate('Atiedot')}>
              <Text style={styles.text4}>
                3. päivä {'\n'}
                1dl
                ruisjauhoja{'\n'}
                3/4dl
                kädenlämpöistä vettä
              </Text>
            </TouchableOpacity>
            <Text style={styles.text4}>
          3. päivänä vatkaa joukkoon jauhot ja vesi ja jätä taas kelmun alle lämpimään paikkaan. 
        </Text>
        </View>
    )
  }
  rendervaihe3(){
    return (
      <View>
      <TouchableOpacity
              style={styles.button}
              disabled={true}
              onPress={() => this.props.navigation.navigate('Atiedot')}>
              <Text style={styles.text4}>
                4. päivä {'\n'}
                1dl
                ruisjauhoja{'\n'}
                3/4dl
                kädenlämpöistä vettä
              </Text>
            </TouchableOpacity>
            <Text style={styles.text4}>
          4. päivänä vatkaa joukkoon jauhot ja vesi ja
          Jätä vuorokaudeksi lämpimään kelmun alle. Seuraavana päivänä juuren tulisi olla kuohkeaa ja happaman tuoksuista.
        </Text>
        </View>
    )
  }
  render() {
      
    return (
      <View style={styles.container}>
        {this.rendermuu()}
      </View>
    );
  }
}
  const styls = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });
  
const styles = StyleSheet.create(
  { 
    container: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      paddingHorizontal: 10
    },
    container2: {
      flexDirection: 'column',
      flex: 5,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingHorizontal: 10
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'lightgrey',
      padding: 10,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
    },
    textStyle:
    {
      fontSize: 18,
      textAlign: 'center',
      color: '#000',
    },
    kuvanappi: {
      margin: 2,
      padding: 5,
      borderWidth: 1
    },
    text2: {
  
      fontWeight: '300',
      fontSize: 30,
      color: 'red'
},
    text3: {
  
      fontWeight: '300',
      fontSize: 30,
  
},
text4: {
  
  fontWeight: '300',
  fontSize: 20,

},
    itm2: {
     flexDirection: 'row',
     justifyContent: 'flex-start',
     alignItems: 'center',
     padding: 4,
     margin: 4,
     borderColor: '#2a4944',
     borderWidth: 1,
     backgroundColor: 'lightgrey',
     
  },
  itm3: {
     flexDirection: 'column',
     justifyContent: 'flex-start',
     alignItems: 'flex-end',
     padding: 2,
     margin: 2,
     borderColor: '#2a4944',
     borderWidth: 1,
     backgroundColor: '#d2f7f1'
  },
  itm4: {
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   padding: 2,
   margin: 2,
   marginTop: 65,
   borderColor: '#2a4944',
   borderWidth: 1,
   backgroundColor: '#d2f7f1'
 },
 itm5: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'center',
   padding: 40,
   margin: 40,
   
   
 },
 welcome: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
},
picker: {
  width: 100,
},
preview: {
  flex: 0,
  justifyContent: 'flex-end',
  alignItems: 'center',
  height: (Dimensions.get('window').height-250),
  width: (Dimensions.get('window').width-20)
},
  }
);

  export default Juuri;