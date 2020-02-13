import React, { Component }from 'react';
import { StyleSheet, View, Text, Picker, Switch, Alert, AsyncStorage, ScrollView, Image, Dimensions, TouchableOpacity, TouchableHighlight, TextInput, ViewPagerAndroid, ImageBackground} from 'react-native';
import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob';
import { Table, Row } from 'react-native-table-component';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconi from 'react-native-vector-icons/MaterialIcons';
import Iconc from 'react-native-vector-icons/MaterialCommunityIcons';
import Icono from 'react-native-vector-icons/Octicons';

var Mailer = require('NativeModules').RNMail;

_sortEka2 = (props) => {
  var taikinat = props.ss 
  
  return(
    taikinat.map((c, index) =>
      
      <Row
        flexArr={[4,0.8,0.9]}
        key={index}
        data={[c.label,c.value.length, props.poista(c)]}
                
                style={[styles.row, index%2 && {backgroundColor: 'rgba(191, 191, 191,0.3)',}]}
                textStyle={{fontSize: global.fsize}}
                onPress={()=>props.update(c, index)}
              />
    
    )
  )}

class Asetukset extends React.Component { 
    constructor(props){
      super (props);
      
      const asianro = () => (
        <TouchableOpacity onPress={() => this._switch('min')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Resepti</Text>
          </View>
        </TouchableOpacity>
      );
      const paivays = () => (
        <TouchableOpacity onPress={() =>this._switch('pai')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Arvostelu</Text>
          </View>
        </TouchableOpacity>
      );

      this.state = {
        files: [],
        aika: null,     
        dlzkaikki: [],   
        kaikki: [],
        dlz: false,
        tableHead: [['', asianro(), paivays(),'']],
        lisaatableHead: [['Ainesosa', 'Määrä', '', '']],
        ladattu: false,
        kansio: null,
        asetukset: [],
        emailName: false,
        emailFileName: !global.engon ? 'RESEPTIT' : 'RECEPTS',
      };
      
    }
    async componentWillMount(){ 
      this.gettime();
        try{
          const dirs = RNFetchBlob.fs.dirs ;
          const file_pat = dirs.DCIMDir + '/reseptit/reseptit.json';
          RNFetchBlob.fs.exists(file_pat)
                      .then((exist) => {this.setState({
                                                    tiedot: exist,
                                                    })
                      })
                      await AsyncStorage.getItem('kaikki')
                      .then((data) => {
                        const c = data ? JSON.parse(data) : [];
                        c.map((item) => 
                          this.setState({kaikki: [...this.state.kaikki, item]})
                        );
                        //global.taikinat = this.state.taikinat; 
                        //AsyncStorage.setItem('original', JSON.stringify(global.taikinat));
                      });
                      
                    
            
        }catch (error){
          
        }
        //this.saveEmailFile();
        
      }
    
    gettime = () => {
      this.setState({aika: moment(new Date()).format("HH:mm:ss - DD.MM.YYYY ")})
    }
   
    componentWillUnmount()
      {
          clearInterval(this.timer);
          AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki))
          try{
            const dirs = RNFetchBlob.fs.dirs ;
                const file_path = dirs.DCIMDir + '/reseptit.json';
                RNFetchBlob.fs.unlink(file_path)             ////POISTA ALKUPERÄINEN KUVA
                .then(() => { })
                .catch((err) => alert(err.message)) 
                

                
        }catch(err){
  
        }
      }
      
    async componentDidMount () {
      this.timer = setInterval(() =>
          {
              this.gettime();
          }, 1000);
          this._checkBackup();
      try {
        this._checkDlzdir();
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
      } catch (error){
    
      }
      
        return
      }
      osuko(a,b){
        for (ii=0;ii<b.length;ii++){

          if (b[ii].label === a){
            return true;
          }
        }
        return false;
      }
      osukoo(a,b){
        for (iii=0;iii<b.length;iii++){

          if (b[iii].label === a.label && b[iii].asteet === a.asteet && b[iii].aika === a.aika && 
            b[iii].ohje === a.ohje && b[iii].value.length === a.value.length && b[iii].kuva.uri === a.kuva.uri){
            
              let tt = this.osukooo(a.value, b[iii].value);
            
            if (tt){
              return true;
            }
          }
        }
        return false;
      }
      osukooo(a,b){
        for(ss=0; ss<a.length; ss++){
          if (!(a[ss].label === b[ss].label && a[ss].value === b[ss].value && a[ss].mitta === b[ss].mitta)){
            return false
        }
      }
        return true;
      }
      liita(){
        
        let a = this.state.dlzkaikki;
        let b = this.state.kaikki;
         
        for (i=0;i<a.length;i++){
         let s = this.osuko(a[i].label,b);

          if (!s){
            b=[...b,a[i]]
          }
          else {
            for (ii=0;ii<b.length;ii++){
              
              if (b[ii].label === a[i].label){
                a[i].value.map ((c) => {
                let t = this.osukoo(c, b[ii].value);

                if (!t)
                b[ii].value = [...b[ii].value, c]
              })
              }
            }
          } 
        }
       
       this.setState({kaikki: b})     
       this.setState({getdlz: false})
      }

      liitayksi(d,ind){
        ind-=1;
        let b = this.state.kaikki;
        b[ind].value=[...b[ind].value,d]
       
       this.setState({kaikki: b});     
       this.poista(d);
       }

      _updatestateEka(data, index){
        this.setState({kategorianIndex: index});
        this.setState({kategoria: data});
        this.setState({swipe: true})
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
        this.setState({swipe:true})
        this.setState({mail:''})
      }

      async poista(e) {
        
        try {
         // AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki));
         await this.setState({dlzkaikki: this.state.dlzkaikki.filter(function(taikina) { 
          return taikina !== e 
        })});
        if (this.state.swipe){
        await this.setState({kategoria: {value: this.state.kategoria.value.filter(function(taikina) { 
          return taikina !== e 
        })}});
          if (this.state.kategoria.value.length == 0){
            this._backFromSwipe()
          }}
        }catch (err){
        
        }
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
      stars(c){
        return(<TouchableHighlight onPress={() => this._updatestate(c)}
        style={{width: 120, height: 130,  justifyContent: 'center', alignItems:'center'}}>
          <Stars
          
          half={true}
          default={c ? c.stars :0}
          update={(val)=>{this._updatestate(c)}}
          spacing={2}
          starSize={20}
          count={5}
          fullStar={<Iconi  
            iconStyle={{marginRight: 0}}
            name="star"
            size={40} 
            color='rgb(255, 255, 0)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._addKansio()}
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
            onPress={() =>this._addKansio()}
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
            onPress={() =>this._addKansio()}
          />
          }
          />
          
      </TouchableHighlight>
        )
      }
      poist(c){
        return(
          <View style={styls.addButton}>
          <Icon.Button  
          iconStyle={{marginRight: 0}}
          name="trash"
          size={20} 
          color='rgb(204, 0, 0)' 
          backgroundColor= 'rgb(255, 255, 153)' 
          borderRadius= {100}
          borderWidth= {3}
          onPress={() =>this.poista(c)}>
        
        </Icon.Button>
        </View>
        )}
      
      nimi(c, index){
        return(<TouchableHighlight onPress={() => this._updatestate(c, index)}
        style={{width: 120, height: 130, justifyContent: 'center', alignItems:'center'}}>
        <View>
        <Text>{c.label}</Text>
        <Stars
          
          half={true}
          default={c ? c.stars :0}
          update={(val)=>{this._updatestate(c, index)}}
          spacing={2}
          starSize={20}
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
          />
          </View>
        </TouchableHighlight>
        )
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
      async saveEmailFile(efname) {
        const dirs = RNFetchBlob.fs.dirs ;
        const file_path = dirs.DCIMDir + '/' + efname +'_reseptit.json';
                    await RNFetchBlob.fs.writeFile(file_path, JSON.stringify(this.state.kaikki, undefined, 2) , 'utf8')
                      .then(() => {})
                      .catch((err) => { })
      }
      _sendEmail(efname, sub){
        
        this.saveEmailFile(efname);
        const dirs = RNFetchBlob.fs.dirs ;
        const file_path = dirs.DCIMDir + '/' + efname +'_reseptit.json';
       
        Mailer.mail({
          subject: efname,
          recipients: [sub],
          body: '',
          attachment: {
            path: file_path,  // The absolute path of the file from which to read data.
            type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
            name: '',   // Optional: Custom filename for attachment
          }
        }, (error, event) => {
            if(error) {
              AlertIOS.alert('Error', 'Could not send mail. Please send a mail to support@example.com');
            }
        });
        this._backFromEFN();
      }
      renderEmailFileName (){
        return (
          <ImageBackground source={require('../data/wood.jpg')} style={{width: '100%', height: '100%',justifyContent: 'center',
              }}>
              <View style={styls.container}>
        <View>
          <View  style={styles.itm44}>
          <TextInput   
          style={{ borderColor: 'gray', borderWidth: 1, fontSize: 24,}}  
          autoCapitalize='characters'
          onChangeText ={(texti) =>{texti !== '' ? this.setState({emailFileName: texti.toLocaleUpperCase()}) : '' }}   
          
          placeholder={this.state.emailFileName ? this.state.emailFileName : '?'}
          defaultValue={this.state.emailFileName}
          placeholderTextColor ={'#000'}
          clearTextOnFocus = {true}
          
        />
          </View>
          <View style={styles.itm5}>
          <TouchableOpacity
              style={styles.button}
              
              onPress={() =>{ 
                this._sendEmail(this.state.emailFileName, "");
                
              }}>
              {!global.engon ? <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Lähetä</Text> : <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Send</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              
              onPress={() =>{ 
                //this.setState({mailsub: "dillesoft@gmail.com"});
                this._sendEmail(this.state.emailFileName, "dillesoft@gmail.com");
                
              }}>
              {!global.engon ? <Text style={{fontSize: global.fsizeon ? 26 : 16}}>dillesoft@</Text> : <Text style={{fontSize: global.fsizeon ? 26 : 16}}>dillesoft@</Text>}
            </TouchableOpacity>
        </View>
        <View style={styles.itm5}>
          
                          
        </View>
        
        </View>
        
        </View>
        <View style={styls.backButton}>
        <BackButton nav={this._backFromEFN.bind(this)}/>
        </View>
        </ImageBackground>
        )
      }
      _backFromEFN(){
        this.setState({emailName:''})
      }
      delDlz(){
        try{
          const dirs = RNFetchBlob.fs.dirs ;
              const file_path = dirs.DownloadDir + '/' + this.state.delDlzFile;
              RNFetchBlob.fs.unlink(file_path)             ////POISTA ALKUPERÄINEN KUVA
              .then(() => {this.setState({poistettu: true,
                                          tiedot: false,
                                          ladattu: false,
                                          })
                                          AsyncStorage.removeItem('taikinat')})
              .catch((err) => alert(err.message)) 
              //global.taikinat =[]
              this._checkBackup();
      }catch(err){

      }
      }
      _getDlz(f){
        this.setState({dlzkaikki:[]});
        this.setState({delDlzFile: f});
        try{
          const file = this.state.files[this.state.files.length-1];
          const dirs = RNFetchBlob.fs.dirs ;
          const file_path = dirs.DownloadDir + '/' + f;
          RNFetchBlob.fs.readFile(file_path, 'utf8')
              .then((data) => {             
                  const c = data ? JSON.parse(data) : [];
                  c.map((item) => 
                  this.setState({dlzkaikki: [...this.state.dlzkaikki, item]})
                  );
                  this.setState({getdlz: true});
                  //alert('blob')
                  //global.taikinat = this.state.taikinat; 
                  //AsyncStorage.setItem('taikinat', JSON.stringify(global.taikinat));
              })              
                  .catch((err) => { })
          }catch(err){
  
          }
      }
      _checkDlzdir(){
        const dirs = RNFetchBlob.fs.dirs ;
        const file_path = dirs.DownloadDir ;
        let a=[];
        var b='_reseptit';
        var d='.json';
        RNFetchBlob.fs.ls(file_path)
      // files will an array contains filenames
      .then((files) => { 
          files.map((c)=> {
            if (c.indexOf(b) !== -1 ){
              if (c.indexOf(d) !== -1 ){
                a=[...a,c]
              }
            }else{            
            }
            this.setState({files: a})     
            }) 
            if (this.state.files.length !==0){
              this.setState({dlz: true})
            }
      })
      
     
    }
      _checkDlz(){
        const dirs = RNFetchBlob.fs.dirs ;
        const file_path = dirs.DownloadDir + '/_reseptit.json';
        RNFetchBlob.fs.exists(file_path)
                      .then((exist) => {
                        this.setState({dlz: exist,
                                                    })});
      }
      _checkBackup(){
        const dirs = RNFetchBlob.fs.dirs ;
        const file_path = dirs.DCIMDir + '/reseptit/reseptit.json';
        RNFetchBlob.fs.exists(file_path)
                      .then((exist) => {this.setState({ladattavissa: exist,
                                                    })});
        
      }
    _delBackup(){
        try{
            const dirs = RNFetchBlob.fs.dirs ;
                const file_path = dirs.DCIMDir + '/reseptit/reseptit.json';
                RNFetchBlob.fs.unlink(file_path)             ////POISTA ALKUPERÄINEN KUVA
                .then(() => {this.setState({poistettu: true,
                                            tiedot: false,
                                            ladattu: false,
                                            })
                                            AsyncStorage.removeItem('taikinat')})
                .catch((err) => alert(err.message)) 
                //global.taikinat =[]
                this._checkBackup();
        }catch(err){

        }
    }
    _GetBackup(){
      this.setState({kaikki:[]})
      try{
        const dirs = RNFetchBlob.fs.dirs ;
        const file_path = dirs.DCIMDir + '/reseptit/reseptit.json';
        RNFetchBlob.fs.readFile(file_path, 'utf8')
            .then((data) => {             
                data ? this.setState({ladattu: true}) : this.setState({ladattu: false})
                const c = data ? JSON.parse(data) : [];
                c.map((item) => 
                this.setState({kaikki: [...this.state.kaikki, item]})
                );
                //alert('blob')
                //global.taikinat = this.state.taikinat; 
                AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki));
            })              
                .catch((err) => { })
        }catch(err){

        }
    }
    _backup(){
        try {
            
          const dirs = RNFetchBlob.fs.dirs ;
                    RNFetchBlob.fs.mkdir(dirs.DCIMDir + '/reseptit')    //LISÄÄ KANSIO
                      .then(() => {})
                      .catch((err) => { })
                    const file_path = dirs.DCIMDir + '/reseptit/reseptit.json';
                    RNFetchBlob.fs.writeFile(file_path, JSON.stringify(this.state.kaikki, undefined, 2) , 'utf8')
                      .then(() => {})
                      RNFetchBlob.fs.exists(file_path)
                      .then((exist) => {this.setState({ladattavissa: exist,
                                                    tiedot: true,
                                                    ladattu: false,
                                                    poistettu: false,
                                                    backup: true})
        })
                      .catch((err) => { })
                      //AsyncStorage.removeItem('sakot');          // POISTAA SAKOT}
          } catch {}    
        
    }
    render (){
        return (
          this.state.swipe ? this.renderSwipe() : this.state.getdlz ? this.renderdlzkaikki() : this.state.emailName ? this.renderEmailFileName() : this.renderAsetukset()
        )
    }
    
async SaveData() {
  
let domain = global.domain;
let url = domain+'/tiedot.php';
//let url = domain+'/server.js'
fetch(url, {
  method: 'POST',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },

  body: JSON.stringify(this.state.kaikki)
  }).then((response) => response.json())

  .then((responseData) => { 
    
})

  .catch((err) => { alert("err: " + err);});
 
 
}
    renderdlzkaikki() {
    
      const state = this.state;
      return (
        <ImageBackground source={require('../data/desk.jpg')} style={{width: '101%', height: '100%',justifyContent: 'center',
        paddingLeft: 0, paddingRight: 0}}>
        <View style={styls.container}>
          
          <ScrollView>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          
  
          <_sortEka2  nimi={this.nimi.bind(this)} kuva={this.renderImage.bind(this)} stars={this.stars.bind(this)} poista={this.poist.bind(this)}ss={this.state.dlzkaikki}
           min={this.state.min} pai={this.state.pai} rek={this.state.rek} 
                  mita={this.state.mita} update={this._updatestateEka.bind(this)}/>
          </Table>
          </ScrollView>   
          <TouchableOpacity
             style={styles.button}
             onPress={()=>{this.liita();
                }}
          >
              {!global.engon ? <Text style={styles.textStyle2}>Lisää kaikki</Text> : <Text style={styles.textStyle2}>Add all</Text>}
  
          </TouchableOpacity>
          <TouchableOpacity
             style={styles.button}
             onPress={()=>{this.delDlz();
                }}
          >
              {!global.engon ? <Text style={styles.textStyle2}>Poista {this.split(this.state.delDlzFile)} ladatuista</Text> : 
              <Text style={styles.textStyle2}>Delete {this.split(this.state.delDlzFile)} from downloads</Text>}
  
          </TouchableOpacity>
          <View style={styls.backButton}>
        <BackButton nav={this._backFromDlz.bind(this)}/>
        </View>
        </View>
        </ImageBackground>
      )
    }
    
    renderAsetukset() {
      

      return (
        <ImageBackground source={require('../data/desk.jpg')} style={{width: '100%', height: '100%',justifyContent: 'center',
        }}>
          <ScrollView>
          
          <Text style={styles.textStyle}>{this.state.aika}</Text>
          
          <View style={styles.container}>
            
          
            <TouchableOpacity
              style={styles.button}
              disabled={false}
              onPress={() => {this._backup()
                              this._checkBackup()}}>
             {!global.engon ? <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Tallenna varmuuskopio</Text> : <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Save backup</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity
                style={this.state.ladattavissa ? styles.button : styles.buttonoff}
                disabled={this.state.ladattavissa ? false : true}
                onPress={() => this._GetBackup()}>
                {!global.engon ? <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Lataa varmuuskopio</Text> : <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Load backup</Text>}
            </TouchableOpacity>

            <TouchableOpacity
              style={this.state.ladattavissa ? styles.button : styles.buttonoff}
              disabled={this.state.ladattavissa ? false : true}
              onPress={() => this._delBackup()}>
              {!global.engon ? <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Poista varmuuskopio</Text> : <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Delete backup</Text>}
            </TouchableOpacity>
              
            <TouchableOpacity
              style={styles.button} 
              onPress={() => this.setState({emailName: true})}>
              {!global.engon ? <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Lähetä sähköpostiin</Text> : <Text style={{fontSize: global.fsizeon ? 26 : 16}}>Send E-mail</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={this.state.dlz ? styles.button : styles.buttonoff}
              disabled={this.state.dlz ? false : true}>

              <Picker
                mode={"dialog"}
                selectedValue={this.state.mika}
                style={{ height: 40, width: 220, }}
                onValueChange={(itemValue, itemIndex) => {this.setState({mika:itemValue})
                this._getDlz(itemValue)}  
              }>
                {!global.engon ? <Picker.Item label={this.state.dlz ? 'Ladatut reseptit '+this.state.files.length+'kpl' : 'Ei ladattuja reseptejä'} value={null} /> :
                <Picker.Item label={this.state.dlz ? 'Loaded recepts '+this.state.files.length+'pcs' : 'No loaded recepts'} value={null} />}
                {this.state.files.map((c, itemIndex)=>
                //csplit = c.split('_')
                
                (
                <Picker.Item key={itemIndex} label={this.split(c)} value={c} />
                ))}
              </Picker></TouchableOpacity>
        </View>
        <View style={styls.switch}>
          <View style={{flexDirection: 'row'}}>
            <Iconi  
                iconStyle={{marginRight: 0}}
                name="star"
                size={40} 
                color={global.staron ? 'rgb(255, 255, 0)' : 'rgb(166, 166, 166)' }
                backgroundColor= 'rgb(255, 255, 153)' 
                borderRadius= {100}
                borderWidth= {3}
            />
            <Switch thumbColor = 'rgb(166, 166, 166)'
              onValueChange={(itemValue) => {global.staron= itemValue}}
              value = {global.staron}/>
            
          </View>

        <View style={{flexDirection: 'row'}}>
        <Iconc  
            iconStyle={{marginRight: 0}}
            name="temperature-celsius"
            size={30} 
            color={!global.fahron ? 'rgb(255, 255, 0)' : 'rgb(166, 166, 166)' }
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            
          >
          </Iconc>
          <Switch thumbColor = 'rgb(166, 166, 166)'
            onValueChange={(itemValue) => {global.fahron=itemValue}}
            value = {global.fahron}/>
          <Iconc  
            iconStyle={{marginRight: 0}}
            name="temperature-fahrenheit"
            size={30} 
            color={global.fahron ? 'rgb(255, 255, 0)' : 'rgb(166, 166, 166)' }
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            
          >
          </Iconc>
        </View></View>
        <View style={styls.switch}>
          <View style={{flexDirection: 'row'}}>
          <Icon  
            iconStyle={{marginRight: 0}}
            name="balance-scale"
            size={40} 
            color={global.scaleon ? 'rgb(255, 255, 0)' : 'rgb(166, 166, 166)' }
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            onPress={() =>this._scale(d)}
          >
          </Icon>
            <Switch thumbColor = 'rgb(166, 166, 166)'
              onValueChange={(itemValue) => {global.scaleon=itemValue}}
              value = {global.scaleon}/>
            
          </View>

        <View style={{flexDirection: 'row'}}>
        <Icon  
            iconStyle={{marginRight: 0}}
            name="comment-o"
            size={30} 
            color={global.commenton ? 'rgb(255, 255, 0)' : 'rgb(166, 166, 166)' }
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            
          >
          </Icon>
          <Switch thumbColor = 'rgb(166, 166, 166)'
            onValueChange={(itemValue) => {
          global.commenton=itemValue}}
            value = {global.commenton}/>
          
        </View></View>
        <View style={styls.switch}>
          <View style={{flexDirection: 'row'}}>
          <Icono  
            iconStyle={{marginRight: 0}}
            name="text-size"
            size={40} 
            color='rgb(166, 166, 166)' 
            backgroundColor= 'rgb(255, 255, 153)' 
            borderRadius= {100}
            borderWidth= {3}
            
          >
          </Icono>
            <Switch thumbColor = 'rgb(166, 166, 166)'
              onValueChange={(itemValue) => {global.fsizeon=itemValue}}
              value = {global.fsizeon}/> 
        
          </View>
          <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize:24,  color: !global.engon ? 'rgb(255, 255, 0)' : 'rgb(166, 166, 166)'}}>FI</Text>
            <Switch thumbColor = 'rgb(166, 166, 166)'
              onValueChange={(itemValue) => {global.engon=itemValue}}
              value = {global.engon}/>
            <Text style={{fontSize:24, color: global.engon ? 'rgb(255, 255, 0)' : 'rgb(166, 166, 166)' }}>EN</Text>
          </View></View>
        </ScrollView>
        <View style={styls.backButton}>
        <BackButton nav={this._back.bind(this)}/>
        </View>
        
        </ImageBackground>
      );
    }
    split(c){
      var csplit = c.split('_')
      
      return csplit[csplit.length-2];
    }
    _backFromSwipe() {
      AsyncStorage.setItem('kaikki', JSON.stringify(this.state.kaikki))
      this.setState({swipe: ''})
    }
      _backFromDlz() {
      this.setState({getdlz:'',
                      mika:''})
                      this.props.navigation.navigate('Home');
                      this.props.navigation.navigate('Asetukset');
    }
    _backFromMail() {
      this.setState({mail:'',
                    dlz:'',
                    files:[]})
    }
    
    async _back() {
      await this.setState({asetukset: {star: global.staron,
        fahr: global.fahron,
        scale: global.scaleon,
        fsize: global.fsizeon,
        eng: global.engon,
        comment: global.commenton}})
        AsyncStorage.setItem('asetukset', JSON.stringify(this.state.asetukset))   
      this.props.navigation.navigate('Home');
    
  }
    renderSwipe() {
      //alert(JSON.stringify(e))
      const state = this.state;
      //e ? '' : e = this.state.lisaataikina;
      return (
        <ImageBackground source={require('../data/desk.jpg')} style={{width: '101%', height: '100%',justifyContent: 'center',
        paddingLeft: 0, paddingRight: 0}}>
      <ViewPagerAndroid initialPage={this.state.index} style={{flex: 1}}>
      
      {this.state.kategoria.value.map((d,ind) => 
        <View style={styls.container} key={ind}>
          <Text style={{fontSize: 26,}}> {d.label}</Text>
          
          <ScrollView>
          <View style={{alignItems:'center', justifyContent:'flex-start'}}>
          {this.renderPic(d.kuva)}
            <Stars
              
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
                onPress={() =>this._addKansio()}
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
                onPress={() =>this._addKansio()}
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
                onPress={() =>this._addKansio()}
              />
              }
              />
          
                
              </View>
          
          
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          
          {d.value.map((e,i) =>
          <Row
            flexArr={[3,2,1,1]}
            key={i}
            data={[ e.label, e.value, e.mitta, '']}
                    
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
          <View style={styls.container2}>
          
          <TouchableOpacity
                style={styles.button}
                disabled={this.state.kansio !== null ? false : true}
                onPress={() => {
                  this.liitayksi(d,this.state.kansioIndex);
                  
                
          }}><Picker
          selectedValue={this.state.kansio}
          style={{ height: 40, width: 220 }}
          onValueChange={(itemValue, itemIndex) => this.setState({kansio: itemValue,
                                                                  kansioIndex: itemIndex})}>
          {!global.engon ? <Picker.Item label={'VALITSE KANSIO'} value={null} /> :
          <Picker.Item label={'CHOOSE FOLDER'} value={null} />}
          {this.state.kaikki.map((c, itemIndex)=>(
          <Picker.Item key={itemIndex} label={c.label !== null ? c.label : ''} value={c.label} />
          ))}
        </Picker>
                {!global.engon ? <Text style={styles.text2}>Lisää {this.state.kansio} kansioon</Text> :
                <Text style={styles.text2}>Add to {this.state.kansio} folder</Text>}
              </TouchableOpacity>

             
            </View>
            
          
          
        </View>
        )}
        </ViewPagerAndroid>
        <View style={styls.backButton}>
        <BackButton nav={this._backFromSwipe.bind(this)}/>
        </View>
        </ImageBackground>
      )
    }
}
const styls = StyleSheet.create({
  switch: { 
    flex: 0, 
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 50, 
    paddingTop: 3, 
  },
  backButton: { 
    flex: 0, 
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 1, 
    paddingTop: 3, 
  },
  addButton: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'flex-end',
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
    backgroundColor: 'rgba(191, 191, 191,0.1)',
  },
  container2: { 
    flex: 0, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 1, 
    paddingTop: 3, 
    backgroundColor: 'rgba(191, 191, 191,0.0)'
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
  row: {
    backgroundColor: 'rgba(191, 191, 191,0.6)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    
  },
  button: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(191, 191, 191,0.5)',
    padding: 10,
    margin: 10,
    borderColor: '#2a4944',
    borderWidth: 1,
  },
  buttonoff: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(191, 191, 191,0.2)',
    padding: 10,
    margin: 15,
    borderColor: '#2a4944',
    borderWidth: 1,
  },
  textStyle:
  {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  textStyle2:
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
  text3: {

    fontWeight: '300',
    fontSize: 30,

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
 borderWidth: 0,
 backgroundColor: 'rgba(191, 191, 191,0.1)'
},
itm44: {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
  margin: 2,
  marginTop: 65,
  borderColor: '#2a4944',
  borderWidth: 0,
  backgroundColor: 'rgba(191, 191, 191,0.3)'
 },
itm5: {
 flexDirection: 'column',
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

    export default Asetukset;