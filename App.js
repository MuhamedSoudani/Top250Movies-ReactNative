import React, { useState, useEffect,Component } from "react";
import {StyleSheet, Text, View, ActivityIndicator,Image} from 'react-native';
export default class App extends Component{

  constructor(props){
    super(props);
    this.state={
      isLoading:true,
      dataSource:null,
    }
  }

  componentDidMount(){

    return fetch('https://imdb-api.com/en/API/Top250Movies/k_2t9mwap8')
    .then((response)=>response.json())
    .then((responseJson)=> {

      this.setState({
        isLoading:false,
        dataSource:responseJson.items,
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  render (){
    if(this.state.isLoading){

      return(
        <View  style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }
    else {
      let Top250Movies=this.state.dataSource.map((val,key)=>{
        return <View key={key} style={styles.item}>
        <Text>{val.rank}</Text>
        <Text>{val.fullTitle}</Text>
        <Text>{val.crew}</Text>
        <Image
              style={{ height: 100, width: 100,margin:10, borderRadius: 10 }}
              source={{uri:val.image}}
            />
        </View>
      });

      return(
        <View>
          {Top250Movies}
        </View>
      )

    }
  }
}
const styles=StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center',
  },
  item: {
    flex :1,
    alignItems:'center',
    alignSelf: 'stretch',
    margin: 'center',
    justifyContent:'center',
    borderBottomWidth:1,
    borderBottomColor:'#eee'
  }
});