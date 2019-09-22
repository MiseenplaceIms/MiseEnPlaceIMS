import React, {Component} from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";


import * as Font from 'expo-font'


export default class Landing extends Component {
    static navigationOptions = ({navigation})=>({
        header:null,
    })
    state = {
        loading: true
      }
      async componentDidMount(){
        await Font.loadAsync({
          'Six-Caps': require('../assets/fonts/SixCaps-Regular.ttf'),
          'Montserrat': require('../assets/fonts/Montserrat-MediumItalic.ttf')
        })
        this.setState({loading:false})
      }
    
      render(){
        if (this.state.loading){
          return (
            <View>
              <Text> Loading..... </Text>
            </View>
          )
        }
        return (
          <ImageBackground source={require('../Images/nativeBackground2.jpg')} style={{width:'100%', height:'100%'}} >
    
          <View style={{backgroundColor: 'black', height: '20%', marginTop: 155, width: '90%', alignItems: 'center', borderColor:'red', borderWidth:3, alignSelf:'center' }}>
            <Text style={{ color: "white" , fontSize:65, fontFamily:'Six-Caps', letterSpacing:3, marginTop:'10%', }}>
            Mise En Place
            </Text>
            <Text style={{color:'red', paddingBottom:60, marginLeft:80, fontSize:18, bottom:16, fontFamily: 'Montserrat'}}>
              Inventory Made Simple
            </Text>
          </View> 
          <View style={{backgroundColor:'black', width:'30%', alignSelf:'center', top: 30, borderRadius:50}}>
            <Button title={'get started'} style={{color: 'white'}}>
             
            </Button>
          </View>
        </ImageBackground>
        );  
      }
    }