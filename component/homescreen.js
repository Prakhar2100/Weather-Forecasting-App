import * as React from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Card, Title} from 'react-native-paper';
import MyHeader from './myheader'
import { LinearGradient } from 'expo-linear-gradient';

export default class HomeScreen extends React.Component {

//Initialize the state that is later displayed as the contents of 
//weather forecasting card on the home screen

  state = {
    info: {
      name: "loading!!",
      temp: "loaging!!",
      humidity: "loading!!",
      desc: "loading!!",
      icon: "loading!!"
    }
  }

//Fetch the api that provides all information about weather of searched city
//Source : https://community-open-weather-map.p.rapidapi.com
//It's free for a limited time period , provide one search per minute in it's basic plan

  async getWeather() {
    city = await AsyncStorage.getItem("mycity")
    if(!city){
      var city = this.props.route.params.city
    }

    console.log(city)

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&id=2172797`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "e2196bdc15msh97d37010cd7da53p16ef96jsn227a10643473",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    })
      .then(data => data.json())
      .then(data2 => {
        console.log(data2)
        this.setState({
          info: {
            name: data2.name,
            temp: (data2.main.temp - 273).toFixed(2),
            humidity: data2.main.humidity,
            desc: data2.weather[0].description,
            icon: data2.weather[0].icon
          }
        })
      })
  }

//oh remember this right? , if not then think what will happen when you restart the application!!
  componentDidMount() {
    this.getWeather()
  }

  render() {

    //After searching another city our parameters will change
    //This will ensure re-running of homescreen with updated parameters
    if(this.props.route.params.city){
      this.getWeather()
    }

    return (
      
      <View style={styles.container}>
        <MyHeader title="Live Status" />
        <View style={{flex: 1 , justifyContent: 'center'}}>
          <Card style={{ margin: 20, padding: 25 , height: 330 }}>
            <LinearGradient
              colors={["#283c86","#45a247"]}
              style={styles.background}
            >
              <View style={{ alignItems: 'center' }}>
                <Title style={styles.title}>{this.state.info.name}</Title>
                <Image style={{ width: 150, height: 150 }}
                  source={{ uri: 'http://openweathermap.org/img/w/' + this.state.info.icon + ".png" }}
                />
                <Title style={styles.title}>Discription: {this.state.info.desc}</Title>
                <Title style={styles.title}>Temperature: {this.state.info.temp} °C</Title>
                <Title style={styles.title}>Humidity: {this.state.info.humidity}</Title>
              </View>
            </LinearGradient>
          </Card>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  title: {
    textAlign: 'center',
    color: "white",

  }
})
