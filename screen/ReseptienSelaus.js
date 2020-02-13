import React, { Component }from 'react';
import { StyleSheet, View, Text, Picker, Alert, AsyncStorage, ScrollView, Image, Dimensions, TouchableOpacity, TouchableHighlight, TextInput, ViewPagerAndroid, Platform, ImageBackground} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import RNFetchBlob from 'react-native-fetch-blob';
import Stars from 'react-native-stars';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import Iconc from 'react-native-vector-icons/MaterialCommunityIcons';
import PushNotification from 'react-native-push-notification';
import PushController from './PushController';

function BackButton(props){
      return(
  <Icon.Button 
                iconStyle={{marginRight: 0}}
                name="arrow-left"
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

const Mitta = (props) => {
  return (
    <Picker
      selectedValue={props.mit ? props.mit :''}
      style={{ height: 25, width: 93}}
      onValueChange={(itemValue, itemIndex) => props.upd(itemValue, props.index)}>
      {!global.engon ? <Picker.Item label="ml" value="ml" /> : <Picker.Item label="ml" value="ml" /> }
      {!global.engon ? <Picker.Item label="dl" value="dl" /> : <Picker.Item label="dl" value="dl" /> }
      {!global.engon ? <Picker.Item label="l" value="l" /> : <Picker.Item label="l" value="l" /> }
      {!global.engon ? <Picker.Item label="g" value="g" /> : <Picker.Item label="g" value="g" /> }
      {!global.engon ? <Picker.Item label="kg" value="kg" /> : <Picker.Item label="kg" value="kg" /> }
      {!global.engon ? <Picker.Item label="rkl" value="rkl" /> : <Picker.Item label="tbs" value="tbs" /> }
      {!global.engon ? <Picker.Item label="tl" value="tl" /> : <Picker.Item label="tsp" value="tsp" /> }
      {!global.engon ? <Picker.Item label="kpl" value="kpl" /> : <Picker.Item label="unit" value="unit" /> }
      {!global.engon ? <Picker.Item label="ps" value="ps" /> : <Picker.Item label="cup" value="cup" /> }
      <Picker.Item label="" value="" />
    </Picker>
      )
}

const Label = (props) => { 
  return (
  <TextInput   
      style={{ borderColor: 'gray', borderWidth: 1,fontSize: global.fsize,}}  
      onChangeText ={(texti) => props.upd(texti)}
      placeholder={props.lab }
      onEndEditing ={() => {props.updLabel(props.texti, props.index) }}
      placeholderTextColor ={'#000'}
      clearTextOnFocus = {false}
      defaultValue = {props.lab}
      multiline = {!props.lab ? false : JSON.stringify(props.lab).length > 13 && global.fsizeon || JSON.stringify(props.lab).length > 20 && !global.fsizeon ? true : false}
    />)
}
const Value = (props) => {
  
  try {
    
  return (
  <TextInput   
      style={{ borderColor: 'gray', borderWidth: 1,fontSize: global.fsize,}}  
      onChangeText ={(texti) => props.updv(texti)}
      placeholder={props.val === null ? '0' :JSON.stringify(props.val)}
      onEndEditing ={() => props.updValue(props.texti, props.index)}
      placeholderTextColor ={'#000'}
      keyboardType={Platform.Version < 24 ? 'default' : 'numeric' }
      clearTextOnFocus = {true}
      
    />)
  } catch (error){
    alert(error);
  }
  return
}
const Nimi = (props) => {
  return (<TouchableHighlight onPress={()=>{props.update(props.c, props.index)}}>
  <View style={{flexDirection: 'row'}}>
  
    <Text style={{fontSize:21}}>{props.kat.label}</Text>
    {props.edit(props.c, props.index)}
    
  </View></TouchableHighlight>
  )
}
_sort = (props) => {
  var taikinat = props.ss 
  if (props.mita==='min'){
    if (props.min){
      taikinat.sort((a,b) => b.label.toLowerCase().localeCompare(a.label.toLowerCase()) );
    } else {
      taikinat.sort((a,b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()) );
    } 
  }else if (props.mita==='pai'){
    if (props.pai){
      taikinat.sort((a,b) => b.stars-a.stars);
    } else {
      taikinat.sort((a,b) => a.stars-b.stars);
    } 
  }
  return(
    taikinat.map((c, index) =>
      
      <Row
        flexArr={[4,7]}
        key={index}
        data={[props.kuva(c,index), props.nimi(c,index)]}
                
                style={[styles.row, index%2 && {backgroundColor: 'rgba(191, 191, 191,0.3)',}]}
                textStyle={styles.text}
                onPress={()=>props.update(c,index)}
              />
    
    )
  )}
  _sortEka = (props) => {
    var taikinat = props.ss 
    
    return(
      taikinat.map((c, index) =>
      <TouchableOpacity
      key={index}
      style={styles.buttonEtu}
      disabled={false}
      
      onPress={() =>props.update(c, index)}>
      {c.label ? <Text style={styls.textEtu}>{c.label}</Text> : props.kategoria(c, index)}
      <View style={{flexDirection: 'row'}}>
      {props.edit(c, index)}
      <Text style={styls.textEtu}>{c.value.length}</Text>
      {props.poista(c)}</View>
    </TouchableOpacity>
       /* <Row
          flexArr={[6,1.5]}
          key={index}
          data={[c.label ? <Nimi edit={props.edit} kat = {c} ind={index} update={props.update} c={c} index={index}/> : props.kategoria(c, index), props.poista(c)]}
                  
                  style={[styles.row, index%2 && {backgroundColor: 'rgba(191, 191, 191,0.3)',}]}
                  textStyle={styles.text}
                  onPress={()=>props.update(c, index)}
                />
      */
      )
    )}
  _sortAine = (props) => {
    var aineet = props.ss 
    return(
      aineet.map((c, index) =>(
        <Row
          flexArr={[2.5,1,1.4,0.7]}
          key={index}
          data={[ <Label texti={props.texti} upd={props.upd} lab={c.label} index={index} updLabel={props.updLabel}/>, 
                  <Value texti={props.texti} updv={props.updv} val={c.value} index={index} updValue={props.updValue}/>, 
                  <Mitta mitta={props.mitta} upd={props.updMitta} mit={c.mitta} index={index}/>,props.poista(c)]}
                  
                  style={[styles.row, index%2 && {backgroundColor: 'rgba(191, 191, 191,0.3)',}]}
                  textStyle={{fontSize: global.fsize}}
                  onPress={()=>props.update(c, index)}
                />
  
      ))
    )}

class ReseptienSelaus extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      reseptinNimi: '',
      lisaa: false,
      lisaataikina: [],
      taikinat: [],
      tableHead: [['', '', '']],
      mita: 'min',
      min: false,
      pai: false,
      rek: false,
      poista: false,  
      ladattu: false, 
      poistettava: [],
      kaikki: [], 
      kategoria: [],
    }
  }
  
  componentWillUnmount(){
    AsyncStorage.setItem('taikinat', JSON.stringify(this.state.taikinat));
    AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki));
    
  }

  async componentDidMount(){
    try{
     if (global.alarm){
      this.setState({kategorianIndex: global.kategorianIndex});
      this.setState({kategoria: global.kategoria});
      this.setState({taikina: global.mikaTaikina});
      this.setState({index: global.taikinaIndex});
      global.alarm = false;
     }
      await AsyncStorage.getItem('kaikki')
      .then((data) => {
        
        const c = data ? JSON.parse(data) : [];
        c.map((item) => 
          this.setState({kaikki: [...this.state.kaikki, item]})
        );
        global.taikinat = this.state.kaikki; 
        AsyncStorage.setItem('original', JSON.stringify(global.taikinat));
      });
      
        if (this.state.kaikki.length ==0 && !global.first) {
        var jsonData = require('../data/reseptit.json');
        //alert('data')
        jsonData.map((c) =>
          global.taikinat = [...global.taikinat, c]        
          ); 
          this.setState({kaikki: global.taikinat});
          AsyncStorage.setItem('kaikki', JSON.stringify(global.taikinat));
          AsyncStorage.setItem('original', JSON.stringify(global.taikinat));
          global.first = true;
        }
        await AsyncStorage.getItem('asetukset')
                      .then((data) => {
                        const c = data ? JSON.parse(data) : [];
                        if (data){
                        global.staron = c.star;
                        global.fahron = c.fahr;
                        global.scaleon = c.scale;
                        global.commenton = c.comment;
                        global.fsizeon = c.fsize;
                        global.engon = c.eng;
                        }
                      })
        if (global.fsizeon){
          global.fsize = 26;
        } else {
          global.fsize = 16;
        }
  }catch(error){
  }
  return 
}

updv(a){
  try {
    data = JSON.parse(a);
    this.setState({texti: data})
  }catch (err){
    this.setState({texti: ''})
   return
  }
  
}
upd(a){
  if (a!==''){
  this.setState({texti: a})
}else{
  this.setState({texti: ''})
}
}
remove = (e) =>{
  this.setState({poista: true})
  this.setState({poistettava: e})
}

async poista(e) {
  await this.setState({kaikki: this.state.kaikki.filter(function(taikina) { 
  return taikina !== e 
})});
if (this.state.muu){
await this.setState({kategoria: {label: this.state.kategoria.label, value: this.state.kategoria.value.filter(function(taikina) { 
  return taikina !== e 
})}});}
try {
  AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki));
  
}catch (err){

}
this.setState({poista: ''});
this.setState({poistettava: []});
}
poistaAine = (e) => {
 
  this.setState({lisaataikina: this.state.lisaataikina.filter(function(taikina) { 
    return taikina !== e 
  })});
  this.setState({poistaAine: ''})
  this.setState({poistettava: []})
  }
_switch = (c) =>{
  
  if (c==='min'){
    this.setState({
      min: !this.state.min
    })
    this.setState({
      mita: 'min'
    })
  }
  if (c==='pai'){
    this.setState({
      pai: !this.state.pai
    })
    this.setState({
      mita: 'pai'
    })
  }
  if (c==='rek'){
    this.setState({
      rek: !this.state.rek
    })
    this.setState({
      mita: 'rek'
    })
  }
}
updLabel(data, ind){
  if (data!==''){
  ainesosa = this.state.lisaataikina;
  ainesosa[ind].label = data;
  this.setState({label: data});
  this.setState({lisaataikina: ainesosa});
  this.setState({texti: ''})
  }else{

  }
}
updValue(data, ind){
  try{
    data = JSON.parse(data);
  }catch (err){
    return
  }
    ainesosa = this.state.lisaataikina;
    ainesosa[ind].value = data;
    this.setState({value: data});
    this.setState({lisaataikina: ainesosa});
    this.setState({texti: ''})
  }
  updMitta(a,i){
    ainesosa = this.state.lisaataikina;
    ainesosa[i].mitta = a;
    this.setState({mitta: a});
    this.setState({lisaataikina: ainesosa});
    
  }
  _updatestateEka(data, index){
    this.setState({kategorianIndex: index});
    this.setState({kategoria: data});
    this.setState({muu: true})
  
  
}
_updatestate(data, index){
  
    this.setState({lisaataikina: data.value});
    this.setState({reseptinNimi: data.label});
    this.setState({reseptinOhje: data.ohje});
    this.setState({ohje: data.ohje});
    this.setState({stars: data.stars});
    this.setState({korvattava: data});
    this.setState({kuva: data.kuva});
    this.setState({index: index});
    this.setState({taikina: data});
    this.setState({asteet: data.asteet});
    this.setState({aika: data.aika});
    this.setState({texti: ''});
    this.setState({aik: ''});
    this.setState({aste: ''});
    this.setState({nimi: ''});
}
renderImage(ee,index) {
 
  return (
     <TouchableHighlight onPress={() => this._updatestate(ee,index)} >
      <Image
        source={ee.kuva}
        resizeMode='cover'
        style={styles.preview}
      /></TouchableHighlight>
      
  );
}
renderPic(ee) {
 
  return (
    <View>   
      <Image
        source={ee}
        resizeMode='cover'
        style={styles.preview2}
      />
      </View>
  );
}
editKat(c, index){
  return(
    <View style={styls.addButtonEtu}>
    <Icon.Button  
    iconStyle={{marginRight: 0}}
    name="edit"
    size={20} 
    color='rgb(0, 153, 0)' 
    backgroundColor= 'rgb(255, 255, 153)' 
    borderRadius= {100}
    borderWidth= {1}
    onPress={() =>{c.label = ''
                   this.setState({kategoriaNimi: ''})
  }}
  >
  </Icon.Button>
  </View>
  )
}
kategoria(c, index){
  return (
    <View>
    <TextInput   
          style={{borderColor: 'gray', borderWidth: 1}}  
          onChangeText ={(texti) => this.setState({kategoriaNimi: texti.toLocaleUpperCase()})}  
          editable={c.edit}
          onEndEditing ={() => {this.tallennaKategoria(this.state.kategoriaNimi, index)}}
         
          placeholder={c.label ? c.label : '?'}
          placeholderTextColor ={'#000'}
        />
</View>
  )
}
nimi(c, index){
  return(<TouchableHighlight onPress={() => this._updatestate(c, index)}
  style={{ justifyContent: 'center', alignItems:'stretch'}}>
  <View>
  <View style={{ justifyContent: 'center', alignItems:'flex-start'}}>
  <Text>  {c.label}</Text>
  {global.staron && <Stars
              half={true}
              default={c ? c.stars :0}
              update={(val)=>{this._updatestate(c, index)}}
              spacing={1}
              starSize={10}
              count={5}
              fullStar={<Iconi  
                iconStyle={{marginRight: 0}}
                name="star"
                size={30} 
                color='rgb(255, 255, 0)' 
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
                
              />
              }
              emptyStar={<Iconi  
                iconStyle={{marginRight: 0}}
                name="star-border"
                size={30} 
                color='rgb(255, 255, 0)' 
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
                
              />
              }
              halfStar={<Iconi  
                iconStyle={{marginRight: 0}}
                name="star-half"
                size={30} 
                color='rgb(255, 255, 0)' 
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
                
              />
              }
              />}</View>
              <View  style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between'}}>
              <View style={{ alignItems: 'space-between'}}>
    {global.commenton && <TextInput   
          style={{borderColor: 'gray', borderWidth: 1}}  
          onChangeText ={(texti) => this.setState({textkom: texti})}  
          multiline = {true}
          onEndEditing ={() => {this.state.textkom !== '' ? this.tallennaKommentti(this.state.textkom, index) : ''}}
          defaultValue = {this.state.kommentti}
          placeholder={c.kommentti ? c.kommentti : 'kommentti'}
          placeholderTextColor ={'#000'}
        />}</View>
        <View style={{alignItems: 'flex-end' }}>
    <Icon.Button 
    iconStyle={{marginRight: 0}}
    name="trash"
    size={20} 
    color='rgb(204, 0, 0)' 
    backgroundColor= 'rgb(255, 255, 153)' 
    borderRadius= {100}
    borderWidth= {1}
    onPress={() =>this.remove(c)}
  >
  </Icon.Button>
  </View></View>
  </View>
  
  </TouchableHighlight>
  
  )
}

poist(c){
  return(
    <View style={styls.addButton2Etu}>
    <Icon.Button  
    iconStyle={{marginRight: 0}}
    name="trash"
    size={20} 
    color='rgb(204, 0, 0)' 
    backgroundColor= 'rgb(255, 255, 153)' 
    borderRadius= {100}
    borderWidth= {1}
    onPress={() =>this.remove(c)}
  >
  </Icon.Button>
  </View>
  )}
poistAine(c){
  return(
    <View style={styls.addButton2}>
    <Icon.Button  
    iconStyle={{marginRight: 0}}
    name="trash"
    size={20} 
    color='rgb(204, 0, 0)' 
    backgroundColor= 'rgb(255, 255, 153)' 
    borderRadius= {100}
    borderWidth= {3}
    onPress={() =>this.poistaAine(c)}
  >
  </Icon.Button>
  </View>
  )}
  

renderPoista (e){
  return (
    <ImageBackground source={require('../data/wood.jpg')} style={{width: '100%', height: '100%',justifyContent: 'center',
        }}>
  <View>
    <View  style={styles.itm4}>
    <Icon name="trash" size={50} color="#900" />
    <Text  style={styles.text2}>{'\n'+e.label}</Text>
    </View>
    <View style={styles.itm5}>
    <Icon.Button  
            iconStyle={{marginRight: 0}}
            name="thumbs-up"
            size={40} 
            color='rgb(0, 153, 0)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this.poista(e)}
          >
          </Icon.Button>
    
          <Icon.Button  
            iconStyle={{marginRight: 0}}
            name="thumbs-down"
            size={40} 
            color='rgb(204, 0, 0)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this.setState({poista:''})}
          >
          </Icon.Button>
  </View></View>
  </ImageBackground>
  )
}
async tallennaKategoria(c,ind){
  let taik = this.state.kaikki;
  taik[ind].label = c;
  this.setState({kaikki: taik});
}
async tallennaKommentti(c,ind){
  let taik = this.state.kategoria;
  taik.value[ind].kommentti= c;
  this.setState({kategoria: taik,
                textkom: ''});
}

async tallenna(uusi){
  if (this.state.uusi || uusi) {
    await this.setState({kategoria: { label: this.state.kategoria.label, 
                        value: [...this.state.kategoria.value, 
                      {label: this.state.reseptinNimi, 
                        ohje: this.state.reseptinOhje,
                        asteet: this.state.asteet,
                        aika: this.state.aika,
                        stars: this.state.stars,
                        kuva: this.state.kuva,
                        value: this.state.lisaataikina,}]}
                      }) ;                                            
           // this.setState({korvattava: this.state.taikinat[this.state.taikinat.length-1]})
           // AsyncStorage.setItem('taikinat', JSON.stringify(this.state.taikinat));
           // AsyncStorage.setItem('original', JSON.stringify(this.state.taikinat));
  }else{
           await this.setState({lis: {label: this.state.reseptinNimi, 
              ohje: this.state.reseptinOhje,
              asteet: this.state.asteet,
              aika: this.state.aika,
              stars: this.state.stars,
              kuva: this.state.kuva,
              value: this.state.lisaataikina}})
            let tai = this.state.kategoria;
                      tai.value[this.state.index] = this.state.lis;
                      this.setState({kategoria: tai})
           // AsyncStorage.setItem('taikinat', JSON.stringify(this.state.taikinat));
           // AsyncStorage.setItem('original', JSON.stringify(this.state.taikinat));
           }
           if (uusi){
           this.setState({index: this.state.kategoria.value.length-1})
           }
            let kaikki = this.state.kaikki;
            kaikki[this.state.kategorianIndex].value = this.state.kategoria.value;
            this.setState({kaikki: kaikki});
            AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki))
           this._backFromLisaa()
          }
async reset (a) {
  try{
    
    await AsyncStorage.getItem('taikina')
      .then((dat) => {
      
        const data = dat ? JSON.parse(dat) : [];
        let aa = this.state.kategoria;
      aa.value[this.state.swipeind] = data
      this.setState({kategoria: aa})
   
        
      });
      
}catch(error){
}
return 

}
  renderLisaa() {
    //alert(JSON.stringify(e))
    const state = this.state;
    //e ? '' : e = this.state.lisaataikina;
    return (
      <ImageBackground source={require('../data/wood.jpg')} style={{width: '101%', height: '100%',justifyContent: 'center',
    paddingLeft: 0, paddingRight: 0}}>
      <View style={styls.container}>
      
        <TextInput   
          style={{ borderColor: 'gray', borderWidth: 1, fontSize: 24,}}  
          autoCapitalize='characters'
          onChangeText ={(texti) =>{texti !== '' ? this.setState({nimi: texti.toLocaleUpperCase()}) : '' }}   
          onEndEditing ={() => {this.state.nimi !== '' ? this.setState({reseptinNimi: this.state.nimi}) : ''}}   
          placeholder={this.state.reseptinNimi ? this.state.reseptinNimi : '?'}
          defaultValue={this.state.reseptinNimi}
          placeholderTextColor ={'#000'}
          clearTextOnFocus = {true}
          multiline = {!this.state.reseptinNimi ? false : JSON.stringify(this.state.reseptinNimi).length > 18 ? true : false}
        />
        <ScrollView>
        <View style={{alignItems:'center', justifyContent:'flex-start'}}>
        {this.renderPic(this.state.kuva)}
        {global.staron && <Stars
            half={true}
            default={this.state.stars ? this.state.stars :0}
            update={(val)=>{this.setState({stars: val})}}
            spacing={4}
            starSize={30}
            count={5}
            fullStar={<Iconi  
              iconStyle={{marginRight: 0}}
              name="star"
              size={40} 
              color='rgb(255, 255, 0)' 
              backgroundColor= 'rgb(255, 255, 153)' 
              borderRadius= {100}
              borderWidth= {3}
              
            />
            }
            emptyStar={<Iconi  
              iconStyle={{marginRight: 0}}
              name="star-border"
              size={40} 
              color='rgb(255, 255, 0)' 
              backgroundColor= 'rgb(255, 255, 153)' 
              borderRadius= {100}
              borderWidth= {3}
              
            />
            }
            halfStar={<Iconi  
              iconStyle={{marginRight: 0}}
              name="star-half"
              size={40} 
              color='rgb(255, 255, 0)' 
              backgroundColor= 'rgb(255, 255, 153)' 
              borderRadius= {100}
              borderWidth= {3}
              
            />
            }
            />}
        
        {this._temp(this.state.asteet, this.state.aika)}
            </View>
            
            
        
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <_sortAine  texti={this.state.texti} poista={this.poistAine.bind(this)} 
          ss={this.state.lisaataikina} 
          updLabel={this.updLabel.bind(this)} upd={this.upd.bind(this)} updv={this.updv.bind(this)}
          updValue={this.updValue.bind(this)} updMitta={this.updMitta.bind(this)}
          mitta={this.state.mitta}/>
        
     </Table>
     <View style={styls.backButton2}>
     <Icon.Button  
            iconStyle={{marginRight: 0}}
            name="plus-circle"
            size={30} 
            color='rgb(0, 153, 0)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._addAine()}
          >
     </Icon.Button>
     
     </View>
     <TextInput   
          style={{borderColor: 'gray', borderWidth: 1,  fontSize: global.fsize}}  
          onChangeText ={(texti) => this.setState({reseptinOhje: texti})}  
          
          multiline = {true}
          defaultValue = {this.state.reseptinOhje}
          placeholder={this.state.reseptinOhje ? this.state.reseptinOhje : 'Ohje'}
          placeholderTextColor ={'#000'}
        />
        
        </ScrollView>   
        
        <View style={{flexDirection: 'row'}}>
        <View style={styls.backButton}>
        <BackButton nav={this._backFromLisaaReset.bind(this)}/>
        </View>
         
        <View style={styls.camButton}>     
          <Icon.Button  
            iconStyle={{marginRight: 0}}
            name="camera"
            size={40} 
            color='rgb(166, 166, 166)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._pickImage('image')}
          >
          </Icon.Button>
          </View>
          {!this.state.uusi && this._saveas()}
          
          <View style={styls.saveButton}>     
          <Icon.Button  
            iconStyle={{marginRight: 0}}
            name="save"
            size={40} 
            color='rgb(166, 166, 166)' 
            backgroundColor= {this.state.reseptinNimi =='' || this.state.lisaataikina.length < 2  ?  'rgba(191, 191, 191,0.5)' : 'rgb(255, 255, 153)'} 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>{this.tallenna()}}
            disabled={this.state.reseptinNimi =='' || this.state.lisaataikina.length < 2  ? true : false}
          >
          </Icon.Button>
          
          </View>
          </View>
      </View>
      </ImageBackground>
    )
  }
_saveas(){
  return(
  <View style={styls.saveButton}><Iconc.Button  
            iconStyle={{marginRight: 0}}
            name="content-save-all"
            size={40} 
            color= 'rgb(166, 166, 166)' 
            backgroundColor= 'rgb(255, 255, 153)'
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>{this.tallenna(true)}}
            disabled={this.state.reseptinNimi =='' || this.state.lisaataikina.length < 2 || this.state.uusi ? true : false}
          ></Iconc.Button></View>)
}
_addAine(){
  this.setState({lisaataikina: [...this.state.lisaataikina, {label: null, value:null, mitta:'dl'}]})
}
  async _setTaikina(d, ind){
    global.taikina = d;
    try {
    
    await AsyncStorage.setItem('taikina', JSON.stringify(d));
    this.setState({swipeind: ind})
  }catch (err){

  }
}
  renderSwipe() {
    //alert(JSON.stringify(e))
    const state = this.state;
    //e ? '' : e = this.state.lisaataikina;
    return (<ImageBackground source={require('../data/wood.jpg')} style={{width: '101%', height: '100%',justifyContent: 'center',
    paddingLeft: 0, paddingRight: 0}}>

    <ViewPagerAndroid initialPage={this.state.index} style={{flex: 1}}>
    {this.state.kategoria.value.map((d,ind) => 
      
      <View style={styls.container} key={ind}>
       
        <Text style={{fontSize: 26,}}> {d.label}</Text>
        <ScrollView>
        <View style={{alignItems:'center', justifyContent:'flex-start'}}>
        {this.renderPic(d.kuva)}
         {global.staron && <Stars
            disabled={true}
            half={true}
            default={d.stars}
            update={(val)=>{''}}
            spacing={4}
            starSize={30}
            count={5}
            fullStar={<Iconi  
              iconStyle={{marginRight: 0}}
              name="star"
              size={40} 
              color='rgb(255, 255, 0)' 
              backgroundColor= 'rgb(255, 255, 153)' 
              borderRadius= {100}
              borderWidth= {3}
              
            />
            }
            emptyStar={<Iconi  
              iconStyle={{marginRight: 0}}
              name="star-border"
              size={40} 
              color='rgb(255, 255, 0)' 
              backgroundColor= 'rgb(255, 255, 153)' 
              borderRadius= {100}
              borderWidth= {3}
              
            />
            }
            halfStar={<Iconi  
              iconStyle={{marginRight: 0}}
              name="star-half"
              size={40} 
              color='rgb(255, 255, 0)' 
              backgroundColor= 'rgb(255, 255, 153)' 
              borderRadius= {100}
              borderWidth= {3}
              
            />
            }
            />}
        
       
            </View>
            <PushController />
        <Table borderStyle={{borderWidth: 0, borderColor: 'rgba(191, 191, 191,0.1)'}}>
        <Row 
        flexArr={[1.5,1.5,1]}
        
        data={['',  this._temp(d.asteet, d.aika), this._kello(d.aika,ind)]}
                
        style={[styles.row, {backgroundColor: 'rgba(191, 191, 191,0.1)',}]}
                textStyle={{fontSize: global.fsize}}
                onPress={()=>''}
              />
        </Table>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        {d.value.map((e,i) =>
        <Row 
          flexArr={[5.8,1.8,1.4]}
          key={i}
          data={[ e.label, e.value, e.mitta]}
                  
          style={[styles.row, i%2 && {backgroundColor: 'rgba(191, 191, 191,0.3)',}]}
                  textStyle={{fontSize: global.fsize}}
                  onPress={()=>''}
                />
  
      )}
     </Table>
     <TextInput   
          style={{borderColor: 'gray', borderWidth: 1, fontSize: global.fsize,}}  
          editable={false}
          multiline = {true}
          placeholder={d.ohje}
          placeholderTextColor ={'#000'}
        />
        
        </ScrollView>   
                 
        <View style={{flexDirection: 'row'}}>
        <View style={styls.backButton}>
        <BackButton nav={this._backFromSwipe.bind(this)}/>
        </View>
        <View style={styls.camButton}>     
        {global.scaleon &&<Icon.Button  
            iconStyle={{marginRight: 0}}
            name="balance-scale"
            size={40} 
            color='rgb(166, 166, 166)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._scale(d)}
          >
          </Icon.Button>}
          </View>
          <View style={styls.saveButton}>     
          <Icon.Button  
            iconStyle={{marginRight: 0}}
            name="edit"
            size={40} 
            color='rgb(166, 166, 166)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._edit(d,ind)}
          >
          </Icon.Button>
          </View>
        </View> 
      </View>
      )}
      </ViewPagerAndroid>
      </ImageBackground>
    )
  }
  _time(d){
    return (
      <View style={styls.saveButton}>     
          <Iconi.Button  
            iconStyle={{marginRight: 0}}
            name="access-time"
            size={30} 
            color='rgb(166, 166, 166)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            
          >
          <TextInput   
            editable={this.state.lisaa || this.state.muokkaa ? true : false}
            style={{height: 50, width: 60, borderColor: 'gray', borderWidth: 1,fontSize: global.fsize,}}  
            onChangeText ={(texti) => {texti !== '' ? this.setState({aik: texti}) : ''}}
            placeholder={d}
            onEndEditing ={() => {this.state.aik !=='' ? this.setState({aika: this.state.aik}) : ''}}
            placeholderTextColor ={'#000'}
            keyboardType={Platform.Version < 24 ? 'default' : 'numeric' }
            clearTextOnFocus = {true}
      
    />
          </Iconi.Button>
          </View>
    )
  }
  _temp(d, c){
    return (
      <View style={styls.saveButton}>     
          <Iconc.Button  
            iconStyle={{marginRight: 0}}
            name={!global.fahron ? "temperature-celsius" :  "temperature-fahrenheit"}
            size={30} 
            color='rgb(166, 166, 166)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
          >
          <TextInput   
            editable={this.state.lisaa || this.state.muokkaa ? true : false}
            style={{height: 50, width: 60, borderColor: 'gray', borderWidth: 1,fontSize: global.fsize,}}  
            onChangeText ={(texti) => {texti !== '' ? this.setState({aste: texti}) : ''}}
            placeholder={d}
            onEndEditing ={() => {this.state.aste !== '' ? this.setState({asteet: this.state.aste}) : ''}}
            placeholderTextColor ={'#000'}
            keyboardType={Platform.Version < 24 ? 'default' : 'numeric' }
            clearTextOnFocus = {true}
          
        /><Iconi.Button  
        iconStyle={{marginRight: 0}}
        name="access-time"
        size={30} 
        color='rgb(166, 166, 166)' 
        backgroundColor= 'rgb(255, 255, 153)' 
        borderRadius= {100}
        borderWidth= {0}
        
      >
      <TextInput   
        editable={this.state.lisaa || this.state.muokkaa ? true : false}
        style={{height: 50, width: 60, borderColor: 'gray', borderWidth: 1,fontSize: global.fsize,}}  
        onChangeText ={(texti) => {texti !== '' ? this.setState({aik: texti}) : ''}}
        placeholder={c}
        onEndEditing ={() => {this.state.aik !=='' ? this.setState({aika: this.state.aik}) : ''}}
        placeholderTextColor ={'#000'}
        keyboardType={Platform.Version < 24 ? 'default' : 'numeric' }
        clearTextOnFocus = {true}
  
/>
      </Iconi.Button>
          </Iconc.Button>
          
          </View>
    )
  }
  _kello(d, ind){
    return (
      <View style={styls.saveButton}>     
          <Iconc.Button  
            iconStyle={{marginRight: 0}}
            name="alarm"
            size={30} 
            color='rgb(166, 166, 166)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._setalarm(d, ind)}
          >
          </Iconc.Button>
          </View>
    )
  }
  _setalarm(d, ind){
    let date = new Date(Date.now() + (d * 60 * 1000));
                PushNotification.localNotificationSchedule({
                message: "UUNI!!",
                date,
              })
              global.kategorianIndex =this.state.kategorianIndex;
              global.kategoria = this.state.kategoria;
              global.mikaTaikina = this.state.taikina;
              global.taikinaIndex = ind;
             
  }

  _edit(d,ind) {
    this._setTaikina(d,ind);
    this._updatestate(d, ind)
    this.setState({muokkaa: true})
  }
  _scale(d) {
    this._setTaikina(d);
    this.props.navigation.navigate('Muokkaa');
  }
  _resepti(){
    return(
    <TouchableOpacity onPress={() => this._switch('min')}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{!this.state.min ? 'A -> Z' :'Z -> A'}</Text>
      </View>
    </TouchableOpacity>
    )  
}
  _arvostelu(){
    return(
    <TouchableOpacity onPress={() => this._switch('pai')}>
      <View style={styles.btn}>
      <Iconi  
              iconStyle={{marginRight: 0}}
              name="star"
              size={20} 
              color='rgb(255, 255, 0)' 
              backgroundColor= 'rgb(255, 255, 153)' 
              borderRadius= {100}
              borderWidth= {3}
              >
              <Iconi  
                iconStyle={{marginRight: 0}}
                name={this.state.pai ? "star" : 'star-border'}
                size={20} 
                color='rgb(255, 255, 0)' 
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
              />
              <Iconi  
                iconStyle={{marginRight: 0}}
                name={this.state.pai ? "star" : 'star-border'}
                size={20} 
                color='rgb(255, 255, 0)' 
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
              />
      </Iconi>
      
      </View>
    </TouchableOpacity>
    )  
}
  rendermuu() {
    
    const state = this.state;
    return (
      <ImageBackground source={require('../data/rst.jpg')} style={{width: '100%', height: '100%',justifyContent: 'center',
        }}>
      <View style={styls.container}>
      <View style={styls.containerMuu}>
      <TouchableOpacity
      
      style={styles.buttonEtu}
      disabled={true}>
      <Text style={styls.textEtu}>{this.state.kategoria.label}</Text>
      
      
    </TouchableOpacity></View>
        <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
          {global.staron ?
          <Row data={[this._resepti(), this._arvostelu()]} flexArr={[2,2]} onPress={() => this._switch()} style={styls.head} textStyle={styls.text}/>      
            :
          <Row data={[this._resepti(), '']} flexArr={[2,2]} onPress={() => this._switch()} style={styls.head} textStyle={styls.text}/>      
          }
        </Table>
        <ScrollView>
        <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
        

        <_sort  nimi={this.nimi.bind(this)} kuva={this.renderImage.bind(this)} 
        poista={this.poist.bind(this)}ss={this.state.kategoria.value} min={this.state.min} pai={this.state.pai} rek={this.state.rek} 
                mita={this.state.mita} remove={this.remove.bind(this)} update={this._updatestate.bind(this)}/>
        </Table>
        </ScrollView>   
        
        <View style={{flexDirection: 'row'}}>
        <View style={styls.backButton}>
        <Icon.Button 
                iconStyle={{marginRight: 0}}
                name="arrow-left"
                size={40} 
                color='rgb(255, 0, 0)' 
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
                onPress={()=>this._backFromMuu()}
  >
  </Icon.Button>
        </View>
        <View style={styls.addButton}>
        <Icon.Button  
            iconStyle={{marginRight: 0}}
            name="plus-circle"
            size={40} 
            color='rgb(0, 153, 0)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._add()}
            
          >
          {!global.engon ? <Text style={styles.textStyle2}>Lisää resepti</Text> : <Text style={styles.textStyle2}>Add recipe</Text>}
          </Icon.Button>
          </View></View>
      </View>
      </ImageBackground>
    )
  }
  renderetu() {
    
    const state = this.state;
    return (
      <ImageBackground source={require('../data/food2.jpg')} style={{width: '100%', height: '100%',justifyContent: 'center',
        }}>
      <View style={styls.containerEtu}>
      <ScrollView>
      <View style={styls.containerEtu2}>
      
      
        

        <_sortEka  edit={this.editKat.bind(this)} kategoria={this.kategoria.bind(this)} kuva={this.renderImage.bind(this)} 
        poista={this.poist.bind(this)}ss={this.state.kaikki} min={this.state.min} pai={this.state.pai} rek={this.state.rek} 
                mita={this.state.mita} remove={this.remove.bind(this)} update={this._updatestateEka.bind(this)}/>
      
      </View>
      </ScrollView>
        <View style={{flexDirection: 'row'}}>
        <View style={styls.backButton}>
        <Icon.Button 
                iconStyle={{marginRight: 0}}
                name="arrow-left"
                size={40} 
                color='rgb(255, 0, 0)' 
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
                onPress={()=>this._backFromEtu()}
        >
        </Icon.Button>
        </View>
        <View style={styls.addButton}>
        <Icon.Button  
            iconStyle={{marginRight: 0}}
            name="plus-circle"
            size={40} 
            color='rgb(0, 153, 0)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._addKansio()}
          >
          {!global.engon ? <Text style={styles.textStyle2}>Lisää kansio</Text> : <Text style={styles.textStyle2}>Add folder</Text>}
          </Icon.Button>
          </View></View>
      
     
      </View>
      </ImageBackground>
    )
  }
  async _addKansio(){
    await this.setState({kaikki: [...this.state.kaikki, {label: '', value: []}]})
    AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki))
  }
  _add(){
    this.setState({lisaataikina: [...this.state.lisaataikina, {label: null, value: null, mitta:'dl'}]})
                         this.setState({lisaa: true});
                        this.setState({uusi: true}) 
                      this.setState({kuva: {
                        "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAADMCAMAAACY78UPAAAAM1BMVEW8vsDn6Onq6+y5u73CxMbIycvh4uPW2NnR09Tc3d/AwsTk5ebU1dfg4eK9v8HBw8XMzc+TddevAAADGElEQVR4nO3c63KqMBRAYZINKiLo+z/tEblIMKng8cJO1venMx1xWEOKQUKzDAAAAAAAAAAAAAAAAAASJ9IUhcivd+Pb5FDZq7pIq7yprbmxp5TCZWcGKYXLyZp7ePHr3fkaMVP7ZA54YZ3wZLoPTrfNf70/3zLrPv56f74l1XHeJHpeS/VzLJMquXlLV5ncPFX6zv66pOyvS46HuPOltJc+XLKi6I9+JvXw6zhds6/nsYfC23kujze8zTaP4d3p3UYb3mU/fHLJvv91pOFj9nyiInXM4eNhfZyfxRwul2B2G24iDZf+GiwwTxm+iYgtfDzaoelZE2X4k6Pduod/c8c+65rd+Wsy3pjuNSai8Kb/uWQMN83z1wDAtxSftN3zvFT2g7b7vevkNucH0L01dNNNN910x9f9rtmKsu5T/ia1qm77rvt8UtJN98bQPe+Wm1feUnV3c6qryuzP6/dcc7cUxr46+jV35+PkY/1qDs3d5m71XSDF3Zfpqsy1O6+3e7LnrXS6q2m2f/FxuCiWbuO96xe+T6q42xnnlW+VRxlem6u32zmv+b78b9dCVMG31NvtDHTPMD/awGqf28Z6u5/MW7qNQiNdc7fk1a3cGl/2sAbfX6W5u/0TLo0tD75thsEQmLvr7u4vRH2bjH/8/ims9u7QFpMPOd9HXFTdk1P99Ikq7yqviLqlGkd08/TBwYi6d+PSPKmNwzPSo+nulmPfwsV9XtI70mPpHlaht+HnWbZvpEfSLeNkPZ89BR4Y6XF037OvhfuHw+0Z6XF055NU97I8NNKj6D56U1272Q2HGLoXZD/M7PV3L1wN4X4Dp7978SIQZ6Sr7/aevv0H3Ll2V969PNsd6cq75bI82xnpurvXZQe+hVbYveSD2wkfR7rq7vPK7MlI19wt/inpnwd82F5x90urN+2531htt5Qvrc+spd9aa/ewmGmtflvF3f/1lnTTvTV0p9pt3tata919ss9ZfADdW0M33XTTTXck3Yn+X4vs/K6nQn2S+bfZAAAAAAAAAAAAAAAAAAAAAAAAAAAAANL0D2K5KQJNX8MVAAAAAElFTkSuQmCC"
                      }})
  }
  _backFromEtu() {
    AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki))
    this.props.navigation.navigate('Home');
  
}
_backFromMuu() {
  let kaikki = this.state.kaikki;
  kaikki[this.state.kategorianIndex].value = this.state.kategoria.value;
  this.setState({kaikki: kaikki});
  AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki))
  this.setState({muu:''})

}
  _back() {
      
    this.props.navigation.navigate('Home');
  
}
_backFromLisaaReset() {
  //this.reset(true);                ??????????
  this._backFromLisaa();
}
  _backFromLisaa() {
    
                           this.setState({nimi: '',
                                          uusi: false,
                                          lisaa:'',
                                          lisaataikina: [],
                                          reseptinNimi: '',
                                          reseptinOhje: '',
                                          ohje: '',
                                          mitta: '',
                                          kuva: null,
                                          muokkaa: '',
                                          aika: '',
                                          asteet: '',
                                          stars: 0})
  }
  _backFromSwipe() {
    this.setState({taikina: '',
                                          lisaa:'',
                                          lisaataikina: [],
                                          reseptinNimi: '',
                                          reseptinOhje: '',
                                          ohje: '',
                                          kuva: null,
                                          korvattava: '',
                                          index: '',
                                          stars: 0})
  }
  _pickImage = (type) => {
    let options = {
      title: 'title',
      takePhotoButtonTitle: 'camera',
      chooseFromLibraryButtonTitle: 'gallery',
      cancelButtonTitle: 'cancel',
      quality: 0.5,
      mediaType: 'photo',
      maxWidth: 2000,
      noData: false,
      maxHeight: 2000,
      dateFormat: 'yyyy-MM-dd HH:mm:ss',
      storageOptions: {
        skipBackup: true,
        CameraRoll: true
      },
      allowsEditing: false
    }
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error)
      } else if (response.customButton) {
           // this.showCamera();
      } else {
           // You can display the image using either:
            const uri = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        //const uri = response.uri
        //const dat = response.content
        
        if (type === 'image') {
          this.setState({
            kuva: uri
          })
          //this.setState({daa: dat})
         
        }
      }
    })
    
    
  }
  
  render() {
      
    return (
      
         this.state.korvaa ? this.renderKorvaa(this.state.korvattava) : this.state.poista ? 
        this.renderPoista(this.state.poistettava) :this.state.path ? 
          this.renderImage(this.state.path) : this.state.muokkaa ? this.renderLisaa() :
           this.state.taikina ? this.renderSwipe() :
           this.state.lisaa ? this.renderLisaa() : this.state.muu ? this.rendermuu() : this.renderetu()
      
    );
  }
}
  const styls = StyleSheet.create({
    camButton: { 
      flex: 1, 
      
      alignItems: 'center',
      padding: 1, 
      paddingTop: 3, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
    },
    addButton: { 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'flex-end',
      padding: 1, 
      paddingTop: 3, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
    },
    addButtonMuu: { 
      flex: 1, 
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      padding: 1, 
      paddingTop: 3, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
    },
    addButtonEtu: { 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 10, 
      paddingTop: 3, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
    },
    addButton2Etu: { 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: 10, 
      paddingTop: 3, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
    },
    addButton2: { 
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1, 
      paddingTop: 3, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
    },
    saveButton: { 
      flex: 0, 
      
      alignItems: 'flex-end',
      padding: 1, 
      paddingTop: 3, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
    },
    backButton: { 
      flex: 0, 
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      padding: 1, 
      paddingTop: 3, 
    },
    backButton2: { 
      flexDirection: 'row',
      flex: 0, 
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 10, 
      paddingTop: 3, 
    },
    container: { 
      flex: 1, 
      alignItems: 'stretch',
      marginRight: 0,
      marginLeft: 0,
      paddingRight: 20, 
      paddingLeft: 20, 
      paddingTop: 30, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
      
    },
    containerMuu: { 
      flex: 0, 
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(191, 191, 191,0.0)',
      
    },
    containerEtu: { 
      flex: 1, 
      alignItems: 'stretch',
      marginRight: 0,
      marginLeft: 0,
      paddingRight: 20, 
      paddingLeft: 20, 
      paddingTop: 30, 
      backgroundColor: 'rgba(191, 191, 191,0.1)',
      
    },
    containerEtu2: { 
      flex: 1, 
      alignItems: 'center',
      
      marginRight: 0,
      marginLeft: 0,
      paddingRight: 20, 
      paddingLeft: 20, 
      paddingTop: 30, 
      padding: 30, 
      backgroundColor: 'rgba(191, 191, 191,0.0)',
      
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
      backgroundColor: 'rgba(191, 191, 191,0.5)',
    },
    text: {
       margin: 5,
       fontSize: 21 
    },
    textEtu: {
      fontFamily: 'sans-serif-light',
      margin: 5,
      fontSize: 26 
    }
  });
  
const styles = StyleSheet.create(
  { 
    row: {
      backgroundColor: 'rgba(191, 191, 191,0.6)',
      
    },
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
      backgroundColor: 'lightgrey',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      
    },
    buttonEtu: {
      width: 200,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      padding: 5,
      margin: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#2a4944',
      borderWidth: 1,
      borderRadius: 50,
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
    btnText2:
    {
      fontSize: 21,
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
    text: {
      
      fontWeight: '300',
      fontSize: global.fsize,
  
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
   backgroundColor: 'rgba(191, 191, 191,0.5)',
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

  export default ReseptienSelaus;