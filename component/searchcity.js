import * as React from 'react';
import { StyleSheet, View, ScrollView,} from 'react-native';
import { TextInput, Card, Button, List} from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import MyHeader from './myheader'


export default class SearchCity extends React.Component{

//Here comes the best part

//Basically what we are gonna do here is : While searching for a city from input text box
//we'll provide suggestions as well , clicking on that suggestion or hitting the button , both 
//will navigate the screen to home screen with updated parameters

//Let's see how it's one

//As usual initialize the state 
  state = {
    text: '',
    cities : []
  }

//Another API in use , well this one is free 
//Soure: https://api.weather.com/v3/location/search
//Well this API provides us with all cities name starting with the text
//currently present on text box while searching

  fetchCities(text){
    this.setState({text:text})

    fetch(`https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`)
    .then(data => data.json())
    .then(data2 => {
      this.setState({
        cities: data2.location.address.slice(0,10)
      })
    })
  }

//As the button is clicked navigation to home screen occurs , with parameter passing
  async buttonClick(){
    this.props.navigation.navigate('Home' , {city : this.state.text })
    await AsyncStorage.setItem("mycity", this.state.text)
  }

  async list(cityname){
    this.setState({
      text: cityname  
    })
    await AsyncStorage.setItem("mycity", this.state.text)
    this.props.navigation.navigate('Home' , {city : this.state.text })
  }

  render(){

    //Normal logic of displaying using maps
    var renderCity = <Card style={styles.card}><List.Item title="None"/></Card>
    if(this.state.cities.length > 0){
      renderCity = this.state.cities.map(city=> {
        return(
          <Card style={styles.card} key={city.id} onPress={() => this.list(city)}>
            <List.Item title={city}/>
          </Card>
        )
      })
    }
    
    return(
      <View style={styles.container}>
        <MyHeader title="Select City"/>
        <View style={styles.view}>
          <TextInput
            label="Enter City"
            value={this.state.text}
            onChangeText={text => this.fetchCities(text)}
            style={{width:300}}
          />
          <Button
            mode="contained"
            onPress = {() => this.buttonClick()}
            style = {{backgroundColor:"#008b8b",width:3 , textAlign:'center'}}
            icon = "login"
          >
          </Button>
        </View>
        <ScrollView>{renderCity}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#f4f4f4"
  },
  card: {
    margin: 2,
    borderBottomWidth: 2, 
    borderBottomColor: "lightgrey"
  },
  view: {
    flexDirection: "row",
  }
})
