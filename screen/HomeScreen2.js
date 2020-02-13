import React, { Component }from 'react';
import { StyleSheet, View, Text, Linking, AsyncStorage, TouchableOpacity, Alert, PermissionsAndroid, ImageBackground} from 'react-native';
import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../screen/NavigationService';

BackButton = (props) => {
  return (
  <Icon.Button name="arrow-left"
                size={40} 
                color='rgb(255, 0, 0)' 
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
                onPress={props.nav}
  >
    
  </Icon.Button>
  )
}

async function requestCameraPermission() 
{
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': '',
        'message': ' '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
     // alert("You can use the save/load")
      
    } else {
      alert("camera permission denied") 
      
    }
  } catch (err) {
    Alert(err) 
  }
}

class HomeScreen extends React.Component { 
    constructor(props){
      super (props);
      
      
      
      global.noti =1;
      global.taikinat = [];
      this.state = {
                    aika: null,     
                    taikinat: [],   
                    version: 1.07,
                  };
      
    }
    async componentWillMount(){ 
      this.gettime();
        try{
          await requestCameraPermission()
          
                      
        }catch (error){
          
        }
        global.staron = true ; 
        global.scaleon = true ;
        global.commenton = true ;
        if (global.fsizeon){
          global.fsize = 26;
        } else {
          global.fsize = 16;
        }
        return //alert(global.scaleon)
      }
    
    gettime = () => {
      this.setState({aika: moment(new Date()).format("HH:mm:ss - DD.MM.YYYY ")})
    }
    componentWillUnmount()
      {
          clearInterval(this.timer);
      }
    async componentDidMount () {
      this.timer = setInterval(() =>
          {
              this.gettime();
          }, 1000);
      try {
        await AsyncStorage.getItem('asetukset')
                      .then((data) => {
                        const c = data ? JSON.parse(data) : [];
                        global.staron = c.star;
                        global.fahron = c.fahr;
                        global.scaleon = c.scale;
                        global.commenton = c.comment;
                        global.fsizeon = c.fsize;
                        global.engon = c.eng;
                      })
        
      } catch (error){
    
      }
      
        return //alert(JSON.stringify(this.state.asetukset))
      }
      async test_connection(){

        //let domain ="http://www.elisanet.fi/~eq7405266/Munreseptit";
        let domain = "http://192.168.10.44/munreseptit";
        //let domain = global.domain;
        let url = domain+'/version.json';
        global.domain = domain;

        fetch(url, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },

          }).then((response) => response.json())
          .then((jsonData) => { 
            
            global.version  = jsonData.version.map(function(item) {
              return {
                key: item.key,
                label: item.label,
                value: item.value
              };
            });  
         
            alert('Yhteydenluonti onnistui! \n('+domain+'). \n Versio '+global.version[0].value);
          
            

        }).catch((err) => { alert("Yhteydenluonti epäonnistui. Tarkista onko osoite kirjoitettu oikein."); });

    }
    render() {
      

      return (
        
          <ImageBackground source={require('../data/food1.jpeg')} style={{width: '110%', height: '100%',alignItems: 'center',justifyContent: 'center',
        paddingHorizontal: 10}}>
          <Text style={styles.textStyle}></Text>
          <View style={styles.container}>
          <View style={styles.container2}>
          <Icon.Button  name="book" 
                        size={40} 
                        color='rgb(166, 166, 166)' 
                        backgroundColor= 'rgb(255, 255, 153)' 
                        borderRadius= {20}
                        borderWidth= {3}
              onPress={() => this.props.navigation.navigate('ReseptienSelaus')}>
              {!global.engon ? <Text style={styles.textStyle2}>Reseptit</Text> : <Text style={styles.textStyle2}>Recipes</Text>}
              </Icon.Button></View><View style={styles.container2}>
              <Icon.Button  name="internet-explorer" 
                        size={40} 
                        color='rgb(166, 166, 166)' 
                        backgroundColor= 'rgb(255, 255, 153)' 
                        borderRadius= {20}
                        borderWidth= {3}
              onPress={() => { Linking.openURL('http://www.elisanet.fi/~eq7405266/Munreseptit/')}}>
              {!global.engon ? <Text style={styles.textStyle2}>WWW</Text> : <Text style={styles.textStyle2}>WWW</Text>}
              </Icon.Button></View><View style={styles.container2}>
            <Icon.Button name="cogs" 
                         size={40} 
                         color='rgb(166, 166, 166)' 
                         backgroundColor= 'rgb(255, 255, 153)' 
                         borderRadius= {20}
                         borderWidth= {3}
            
              
              disabled={false}
              onPress={() => this.props.navigation.navigate('Asetukset')}>
              {!global.engon ? <Text style={styles.textStyle2}>Asetukset</Text> : <Text style={styles.textStyle2}>Settings</Text>}
           
            </Icon.Button></View>
            
            </View>
            <View>
              <Text style={styles.textStyle}>V {this.state.version}</Text>
            </View>
        </ImageBackground>
      );
    }
}
  
const styles = StyleSheet.create(
    { 
      container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 10,
        padding: 80,
      },
      container2: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        
      },
      
    button: {
        
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(191, 191, 191,0.1)',
        padding: 20,
        margin: 20,
        borderColor: '#2a4944',
        
        
      },
      buttonoff: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgrey',
        padding: 10
      },
        
    textStyle:
    { 
      margin: 16,
      fontSize: 30,
      textAlign: 'center',
      color: 'rgb(128, 128, 128)',
    },
    textStyle2:
    {
      fontSize: 20,
      color: '#000',
    },
    textStyle3:
    {
      marginTop: 5,
      fontSize: 12,
      color: '#70f',
    },
})
    export default HomeScreen;