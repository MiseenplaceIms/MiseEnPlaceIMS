import React, {Component} from "react";
import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import { Scene, Router, Actions, Stack } from "react-native-router-flux";

import * as Font from 'expo-font'



export default class App extends Component {
  state = {
    loading: true
  }
  async componentDidMount(){
    await Font.loadAsync({
      'Six-Caps': require('./assets/fonts/SixCaps-Regular.ttf')
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
      <ImageBackground source={require('./Images/nativeBackground2.jpg')} style={{width:'100%', height:'100%'}} >

      <View style={{backgroundColor: 'black', height: '20%', marginTop: 100, width: '90%', alignItems: 'center', borderColor:'red', borderWidth:3, alignSelf:'center' }}>
        <Text style={{ color: "white" , fontSize:65, fontFamily:'Six-Caps', letterSpacing:3 }}>
        Mise En Place
        </Text>
        <Text style={{color:'red', paddingBottom:60, marginLeft:80, fontSize:18}}>
          Inventory Made Simple
        </Text>
      </View> 
      <View>

      </View>
    </ImageBackground>
    );  
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    height: '20%',
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center"
  }
});
