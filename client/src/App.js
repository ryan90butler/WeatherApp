import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(){
    super()
      this.state={
        state: "",
        city: "",
        weatherForecast: [],
        searches: []
      }
      this.handleChange = this.handleChange.bind(this)
      this.getWeather = this.getWeather.bind(this)
      this.capFirst = this.capFirst.bind(this)

  }
componentWillMount(){
  axios.get(`//localhost:8000/api/places`)
  .then(response =>{
    this.setState({
      searches: response.data.searches
    })
  })
}
  getWeather(e){
    e.preventDefault();
    axios
      .post(`//localhost:8000/api/places?state=${this.state.state}&city=${this.state.city}`)
    .then(response => {
      console.log(response)
      this.setState({
        weatherForecast: response.data.weather.forecast.simpleforecast.forecastday,
        searches: response.data.searches
      })
    })
      .catch(error => {
        console.warn(error)
      })
  }

 capFirst(string)
  {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  handleChange(e){
    const name = e.target.name
    const value = this.capFirst(e.target.value)
    this.setState({
    [name]: value,
    });
  }


  render() {

    const weather = this.state.weatherForecast.slice(0,5).map((forecast,i)=>(
      <div className="weatherBox" key ={i}>
     <ul className ="weatherList">
      {forecast.date.weekday}
      </ul>
      <ul className ="weatherList">
      {forecast.conditions}
      </ul>
      <ul className ="weatherList">
      High {forecast.high.fahrenheit}
      </ul>
      <ul className ="weatherList">
      Low {forecast.low.fahrenheit}
      </ul>
      <ul className ="weatherList">
      <img src={forecast.icon_url} alt={'logo'}/>
      </ul>
      </div>
    ))

    return (
      <div className="App">
        <header className="">
        <h1>&lt;DevWeather /></h1>
        </header>
        <form onSubmit={this.getWeather}>

        <input name ='city' placeholder="City" value={this.state.city} onChange={this.handleChange} />
        <br/>
        <select name='state' value={this.state.state} onChange={this.handleChange}>
          <option></option>
	        <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
	        <option value="AZ">Arizona</option>
	        <option value="AR">Arkansas</option>
        	<option value="CA">California</option>
        	<option value="CO">Colorado</option>
        	<option value="CT">Connecticut</option>
        	<option value="DE">Delaware</option>
        	<option value="DC">District Of Columbia</option>
        	<option value="FL">Florida</option>
        	<option value="GA">Georgia</option>
        	<option value="HI">Hawaii</option>
        	<option value="ID">Idaho</option>
        	<option value="IL">Illinois</option>
        	<option value="IN">Indiana</option>
        	<option value="IA">Iowa</option>
        	<option value="KS">Kansas</option>
        	<option value="KY">Kentucky</option>
        	<option value="LA">Louisiana</option>
        	<option value="ME">Maine</option>
        	<option value="MD">Maryland</option>
        	<option value="MA">Massachusetts</option>
        	<option value="MI">Michigan</option>
	        <option value="MN">Minnesota</option>
        	<option value="MS">Mississippi</option>
        	<option value="MO">Missouri</option>
        	<option value="MT">Montana</option>
        	<option value="NE">Nebraska</option>
        	<option value="NV">Nevada</option>
        	<option value="NH">New Hampshire</option>
        	<option value="NJ">New Jersey</option>
        	<option value="NM">New Mexico</option>
        	<option value="NY">New York</option>
        	<option value="NC">North Carolina</option>
        	<option value="ND">North Dakota</option>
        	<option value="OH">Ohio</option>
        	<option value="OK">Oklahoma</option>
        	<option value="OR">Oregon</option>
        	<option value="PA">Pennsylvania</option>
        	<option value="RI">Rhode Island</option>
	        <option value="SC">South Carolina</option>
        	<option value="SD">South Dakota</option>
	        <option value="TN">Tennessee</option>
	        <option value="TX">Texas</option>
	        <option value="UT">Utah</option>
      	  <option value="VT">Vermont</option>
	        <option value="VA">Virginia</option>
	        <option value="WA">Washington</option>
	        <option value="WV">West Virginia</option>
	        <option value="WI">Wisconsin</option>
  	      <option value="WY">Wyoming</option>
        </select>
        <br/>
        <button className="getWeatherButton">Get Weather</button>
        </form>
       <br />

      <div className ="fiveDayForecast-container">
      {this.state.weatherForecast.length <1 ? <h3>Enter City</h3> : <h3>5 Day Forecast</h3>}
      </div>
      <div className='weather-cards'>
        {weather}
      </div>

      <div className="recent-searches">Recent Searches</div>
      <div className="recent-cities">
  {this.state.searches[this.state.searches.length -3]} {this.state.searches[this.state.searches.length -2]}    {this.state.searches[this.state.searches.length -1]}
      </div>

      </div>
    );
  }
}

export default App;
