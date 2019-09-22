import React, {Component} from "react";
import { StyleSheet, Text, View, Button, ImageBackground, TouchableOpacity } from "react-native";
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Landing from './Components/mainScreen'
import Form from './Components/Login/Form'
import * as Font from 'expo-font'



// const NavStack = createStackNavigator({
//   Landing:{
//     screen: Landing
//   }
// })

// const App = createAppContainer(NavStack)

export default class App extends Component {
  state = {
    loading: true
  }
  async componentDidMount(){
    await Font.loadAsync({
      'Six-Caps': require('./assets/fonts/SixCaps-Regular.ttf'),
      'Montserrat': require('./assets/fonts/Montserrat-MediumItalic.ttf')
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
      <ImageBackground source={require('./Images/QR.png')} style={{width:'100%', height:'100%'}} >

      {/* <View style={{backgroundColor: 'black', height: '20%', marginTop: 155, width: '90%', alignItems: 'center', borderColor:'red', borderWidth:3, alignSelf:'center' }}>
        <Text style={{ color: "white" , fontSize:65, fontFamily:'Six-Caps', letterSpacing:3, marginTop:'10%', }}>
        Mise En Place
        </Text>
        <Text style={{color:'red', paddingBottom:60, marginLeft:80, fontSize:18, bottom:16, fontFamily: 'Montserrat'}}>
          Inventory Made Simple
        </Text>
      </View> 
      <Form/> */}
      {/* <View style={{backgroundColor:'black', width:'30%', alignSelf:'center', top: 45, borderRadius:50, borderColor:'red', borderWidth:2, height:35, justifyContent:'center'}}>
        <Button title={'get started'} style={{color: 'white'}}>
         <Text style={{ color:'red', fontFamily:'Montserrat', alignSelf:'center'}}>
           get started
         </Text>
        </Button>
      </View> */}
    </ImageBackground>
    );  
  }
}