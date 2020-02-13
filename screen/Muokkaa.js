import React, { Component }from 'react';
import { StyleSheet, View, Text, AsyncStorage, ScrollView, Image, Dimensions, TouchableOpacity, Alert, TextInput, Platform, ImageBackground} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';

function Lask(num, precision = 2) {
  //alert(num)
  // half epsilon to correct edge cases.
  if (num ==null){
    return null
  }
	var c = 0.5 * Number.EPSILON * num;
//	var p = Math.pow(10, precision); //slow
	var p = 1; while (precision--> 0) p *= 10;
	if (num < 0)
		p *= -1;
	return Math.round((num + c) * p) / p; 
}
const Gramma = (props) => {
  
  try {
    return (
      
  <TextInput 
  
  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
  
  onChangeText ={(texti) => props.upd(texti)}
  onSubmitEditing ={() => props.update(props.index, props.texti)}
  placeholder={props.val === null ? '' :JSON.stringify(props.val)}
  placeholderTextColor ={'#000'}
  keyboardType={Platform.Version < 24 ? 'default' : 'numeric' }
  clearTextOnFocus={false}
/>)
  } catch (error){
    alert(error);
  }
  return
  /*<TouchableOpacity onPress={() => this._switch('rek')}>
    <View style={styles.btn}>
      <Text style={styles.btnText}>{a}</Text>
    </View>
  </TouchableOpacity>*/
};
class Muokkaa extends Component {
  constructor(props) {
    super(props);
    global.ruis = []
    
    const asianro = () => (
      <TouchableOpacity onPress={() => this._switch('min')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Asianumero</Text>
        </View>
      </TouchableOpacity>
    );
    const paivays = () => (
      <TouchableOpacity onPress={() =>this._switch('pai')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Päivämäärä</Text>
        </View>
      </TouchableOpacity>
    );
    const gramma = () => (
      <TouchableOpacity onPress={() => this._switch('rek')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Rekisteri</Text>
        </View>
      </TouchableOpacity>
    );
    
    this.state = {
      ruis: [],
      sakot: [],
      tableHead: [['Aine', 'Määrä', '', '-', '+']],
      mita: 'min',
      min: false,
      pai: false,
      rek: false,
      poista: false,   
      poistettava: [], 
      taikina: [],
      taikin:[],
      
    }
  }
  componentWillUnmount(){
    
    AsyncStorage.removeItem('taikina'); 
  }
  async componentDidMount(){
    try{
      //AsyncStorage.setItem('taikina', JSON.stringify(global.taikina));
      await AsyncStorage.getItem('taikina')
      .then((data) => {
        
        const c = data ? JSON.parse(data) : [];
         
        global.taikina = c;
          this.setState({taikina: c})
        
        //global.taikina = this.state.taikina; 
        //alert(JSON.stringify(this.state.taikina))
      });
      this.setState({ruis: global.taikina.value})
      this.setState({rui: global.taikina.value})
      global.ruis = global.taikina.value;
      global.rui = global.taikina.value;
      
  }catch(error){
  }
  return 
}
async reset (a) {
  try{
    await AsyncStorage.getItem('taikina')
      .then((data) => {
      //alert(data)
        const c = data ? JSON.parse(data) : [];
        
          this.setState({taikin: c})
       
        //global.taikina = this.state.taikin; 
        //alert('async')
      });
    //this.setState({ruis: this.state.taikin.value});
    //this.setState({rui: this.state.taikin.value})
   
      global.ruis = this.state.taikin.value;
      global.rui = this.state.taikin.value;
      if (a){
        global.taikina = this.state.taikin;
      this.setState({ruis: this.state.taikin.value});
    }
}catch(error){
}
return 

}
upd(a){
  this.setState({texti: a})
}
_updatestate(a,b){
  try{
  this.reset()
  
  ruis=global.ruis;
  rui=global.ruis;
  muutos = b
 //alert(JSON.stringify(rui[1].value));
  for (var i=0;i<ruis.length;i++){
     //rui[i].value = (rui[i].value/rui[a].value)*(rui[a].value+b)
     if(a==i){
     
    //ruis[i].value = (ruis[i].value/c.value)*(c.value+b).toFixed(2)
    
  }else {
    ruis[i].value = (ruis[i].value/rui[a].value)*(muutos)
    
  }
  };
  
  ruis[a].value = (ruis[a].value/rui[a].value)*(muutos)
    
  //global.merkit = ruis;
  this.setState({ruis: ruis})
}catch (err){
  alert(err)
}
}
poist(c,i){
  
   
  
  return(
      <TouchableOpacity onPress={() => {this.laske(c,i,false)}}
                        style={c.value == null ? styles.buttonoff : styles.button}
                        disabled={c.value == null ? true :false}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>-</Text>
        </View>
      </TouchableOpacity>
  )}
  
  lisaa(c,i){
   
       return(
        <TouchableOpacity onPress={() =>{this.laske(c,i,true)}}
                          style={c.value == null ? styles.buttonoff : styles.button}
                          disabled={c.value == null ? true :false}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>+</Text>
          </View>
        </TouchableOpacity>
    )}
    laske(c,a,d){
      c.value <= 0.1 ? b=0.05 : c.value <= 2 && c.value > 0.1 ? b=0.10 : c.value <= 5 && c.value > 2 ? b=0.25 : c.value <= 10 && c.value > 5 ?
       b = 0.5 : c.value <= 15 && c.value > 9 ? b = 2.5 : c.value <= 60 && c.value > 15 ? b=10 : c.value <= 100 && c.value > 60 ? b = 20 : c.value >= 100 ? b = 50 : b = 0;
      if (!d){
      b*=-1
      }
      c.value+b <=0 ? muutos = 0 : muutos = c.value+b
      //alert(c.value+b)
      this.reset()
      ruis=global.ruis;
      rui=global.ruis;
      //muutos = rui[a].value+b;
      for (var i=0;i<ruis.length;i++){
         //rui[i].value = (rui[i].value/rui[a].value)*(rui[a].value+b)
         if(a==i){
         
        //ruis[i].value = (ruis[i].value/c.value)*(c.value+b).toFixed(2)
        
      }else {
        //ruis[i].value = (ruis[i].value/rui[a].value)*muutos
        if (!ruis[i].value == 0 ){
        ruis[i].value = (Lask(ruis[i].value,4)/Lask(rui[a].value,4)*Lask(muutos,4))
        rui[i].value = (Lask(ruis[i].value,2))
      }}
      };
      //ruis[a].value = (ruis[a].value/rui[a].value)*muutos
      ruis[a].value = (Lask(ruis[a].value,4)/Lask(rui[a].value,4)*Lask(muutos,4))
        rui[a].value = (Lask(ruis[a].value,2))
      
      this.setState({ruis: ruis})
      //alert(JSON.stringify(muutos+'  '+b));
     
    }

  rendermuu(w) {
   
    const state = this.state;
    return (
      <ImageBackground source={require('../data/wood.jpg')} style={{width: '101%', height: '100%',justifyContent: 'center',
    paddingLeft: 0, paddingRight: 0}}>
      
      <View style={styls.container}>
        <TextInput   
          style={{ borderColor: 'gray', borderWidth: 1, fontSize: 21,}}  
          autoCapitalize='characters'
          placeholder={global.taikina.label}
          editable={false}
          placeholderTextColor ={'#000'}
          clearTextOnFocus = {true}
          multiline = {true}
        />
        
        <ScrollView>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        {this.state.ruis.map((c, index) => (
        <Row
       
        key={index}
        data={[c.label, <Gramma texti={this.state.texti} upd={this.upd.bind(this)} index={index} val={c.value} 
          mika={this.state.ruis} update={this._updatestate.bind(this)}/>,c.mitta, this.poist(c,index), this.lisaa(c,index)]}
                
          flexArr={[2,0.9,0.7,0.6,0.6]}
                textStyle={styles.text}
                
              />)
        )}

     </Table>       
     <TextInput   
          style={{borderColor: 'gray', borderWidth: 1, fontSize: global.fsize,}}  
          editable={false}
          multiline = {true}
          placeholder={global.taikina.ohje}
          placeholderTextColor ={'#000'}
        />
        </ScrollView>   
        
        <View style={styls.backButton}>
        <BackButton nav={this._back.bind(this)}/>
        </View>
      </View>
      </ImageBackground>
    )
  }
  _back() {
      
    this.props.navigation.goBack()
  
}
  render() {
      
    return (
      
         this.state.poista ? this.renderPoista(this.state.poistettava) :this.state.path ? this.renderImage(this.state.path) :
           this.state.sakko ? this.renderSakko(this.state.sakko) : this.rendermuu(this.state.ruis)
      
    );
  }
}
const styls = StyleSheet.create({
  backButton: { 
    flex: 0, 
    alignItems: 'flex-start',
    padding: 1, 
    paddingTop: 3, 
    backgroundColor: 'rgba(191, 191, 191,0.1)',
  },
  container: { 
    flex: 1, 
    alignItems: 'stretch',
    marginRight: 0,
    marginLeft: 0,
    paddingRight: 20, 
    paddingLeft: 20, 
    paddingTop: 30, 
    backgroundColor: 'rgba(191, 191, 191,0.5)',
  },
  container2: { 
    flex: 0, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 1, 
    paddingTop: 3, 
    backgroundColor: '#fff' 
  },
  head: { 
    height: 40, 
    backgroundColor: 'lightgrey' 
  },
  text: {
     margin: 6 
    }
});

const styles = StyleSheet.create(
{ 
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'lightgrey',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(191, 191, 191,0.5)',
    padding: 10,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
  },
  buttonoff: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    padding: 10
  },
  textStyle:
  {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  btnText:
  {
    fontSize: 24,
    textAlign: 'center',
    color: 'red',
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
text: {
  margin: 5,
  fontSize: 18 
 },
  itm2: {
   flexDirection: 'row',
   justifyContent: 'flex-start',
   alignItems: 'center',
   padding: 4,
   margin: 4,
   borderColor: '#2a4944',
   borderWidth: 1,
   backgroundColor: '#d2f7f1',
   
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
preview: {
flex: 1,
justifyContent: 'flex-start',
alignItems: 'flex-start',
height: (Dimensions.get('window').height*0.20),
width: (Dimensions.get('window').width*0.28)
},
preview2: {
flex: 0,
justifyContent: 'flex-start',
alignItems: 'flex-start',
height: (Dimensions.get('window').height*0.40),
width: (Dimensions.get('window').width*0.80)
},
}
);

  export default Muokkaa;