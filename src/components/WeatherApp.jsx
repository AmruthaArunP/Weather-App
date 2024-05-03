import React, { useEffect, useState } from 'react';
import searchIcon from '../assets/search.png';
import clearIcon from '../assets/clear.png';
import cloudIcon from '../assets/cloud.png';
import dizzleIcon from '../assets/drizzle.png';
import rainIcon from '../assets/rain.png';
import windIcon from '../assets/wind.png';
import snowIcon from '../assets/snow.png';
import humidityIcon from '../assets/humidity.png';

function WeatherApp() {

    const [search , setSearch] = useState('')
    const [celcius , setCelcius] = useState(10)
    const [humidity , setHumidity] = useState(10)
    const [wind , setWind] = useState(2)
    const [image, setImage] = useState(cloudIcon)
    const [city, setCity] = useState('London');
    const [error, setError] = useState('')

    let api_key = "14e3c62af49b1844260c818cdbbb2ebe"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${api_key}`
    

    const handleClick = () => {
      if (search !== '') {
        fetch(url)
          .then(response => {
            if (!response.ok) {
              setError('Invalid city name')
              throw new Error('Network response was not ok');
            }
            return response.json()
          })
          .then(data => {
            let imagePath = ''
            if(data.weather[0].main === 'Clouds'){
                imagePath = cloudIcon
            }else if(data.weather[0].main === 'Clear' ){
                imagePath = clearIcon
            }else if(data.weather[0].main === 'Rain' ){
                imagePath = rainIcon
            }else if(data.weather[0].main === 'Drizzle' ){
                imagePath = dizzleIcon
            }else if(data.weather[0].main === 'Mist' ){
                imagePath = snowIcon
            }else{
                imagePath = cloudIcon
            }
            console.log("response = ",data);
            setCelcius(data.main.temp);
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setCity(data.name); 
            setImage(imagePath)
            setError('')
          })
          .catch(error => {
            console.log(error);
            console.error('There was a problem fetching the weather data:', error);
          });
      }
    }

  return (
    <div className='bg-gradient-to-r from-blue-200 to-purple-400 min-h-screen flex justify-center items-center'>
      <div className='bg-blue-500 rounded-lg shadow-lg p-8 w-full max-w-lg'>
        <div className='relative flex'>
          <input
            type='text'
            placeholder='Enter location'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='border border-gray-300 rounded-full py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
          <button onClick={handleClick}>
          <img
            src={searchIcon}
            alt=''
            className='absolute right-3 top-2 cursor-pointer'
            
          />
          </button>

        </div><br/>
        <div className=''>
        <p className='text-white font-bold  '>{error}</p>
        </div>
        <div className='flex flex-col justify-center items-center '>
          <div>
          <img src={image} alt='' className='h-26 w-26' />
          </div>
          <div className='text-4xl font-bold ml-4 text-white'>{celcius}°C</div>
        </div>
        <div className='text-center text-xl font-semibold mb-4 ml-4 text-white'>{city}</div>
        <div className='grid grid-cols-2 gap-4 p-6 '>
          <div className='flex items-center'>
            <img src={humidityIcon} alt='' className='h-10 w-10 mr-2' />
            <div>
              <div className='text-lg font-bold text-white'>{humidity}%</div>
              <div className='text-white'>Humidity</div>
            </div>
          </div>
          <div className='flex items-center'>
            <img src={windIcon} alt='' className='h-10 w-10 mr-2' />
            <div>
              <div className='text-lg font-bold text-white'>{wind} km/h</div>
              <div className='text-white'>Wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
