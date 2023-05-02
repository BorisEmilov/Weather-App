import React, { useState } from 'react'
import axios from 'axios'
import Day from '../assets/chuttersnap-TSgwbumanuE-unsplash.jpg'
import Night from '../assets/gregoire-jeanneau-R6DKrDa_wyQ-unsplash.jpg'
import GlassEfect from './GlassEfect'
import { BsFillCloudRainHeavyFill, BsMoonFill, BsSnow, BsThermometerHigh, BsThermometerSnow, BsThermometerSun } from 'react-icons/bs'
import { GiSunrise, GiSunset, GiWindsock } from 'react-icons/gi'
import { BiWind } from 'react-icons/bi'
import { AiFillCloud } from 'react-icons/ai'
import { WiHumidity } from 'react-icons/wi'
import { MdOutlineGpsFixed, MdOutlineVisibility } from 'react-icons/md'
import { Divider } from '@mui/material'
import Genbg from '../assets/noaa-UJsUJr3cgEM-unsplash.jpg'
import { RxCross1 } from 'react-icons/rx'
import { SiRainmeter } from 'react-icons/si'
import GeoWeather from './GeoWeather'


const Modal = ({ handle, content }) => {
    return (
        <div className='absolute z-30 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-sm bg-white/30'>
            <div className='h-[80%] w-[95%] max-w-[500px] flex flex-col items-center justify-start bg-slate-600  rounded-[20px] p-4 gap-8 z-40'>
                <div className='w-[100%] h-[5%] flex items-center justify-end' onClick={handle}>
                    <RxCross1 size={30} color='white' />
                </div>
                <div className='w-[100%] h-[90%] flex flex-col items-center justify-start gap-4'>
                    {content}
                </div>
            </div>
        </div>
    )
}





const Home = () => {
    const [apiData, seData] = useState([])
    const [location, setLocation] = useState('')

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const handleOpen = () => {
        setOpen(!open)
    }
    const handleClose = () => {
        setValue('')
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${location}&days=5&aqi=no&alerts=no`

    const Serch = (event) => {
        if (event.key === 'Enter') {
            axios.get(url)
                .then((response) => {
                    seData(response.data)
                })
            setLocation('')
        }
    }

    const refresh = () => window.location.reload(true)


    return (
        <div className='absolute w-[100vw] h-[100vh] flex flex-col items-center justify-center z-20 overflow-auto'>
            {
                apiData.forecast &&
                <>
                    {
                        value === apiData.forecast.forecastday[0].date ? <Modal handle={handleClose} content={
                            <>
                                <div className='flex items-center justify-center gap-4 text-white'>
                                    <BsMoonFill size={30} color='white' />
                                    <p><b>{apiData.forecast.forecastday[0].astro.moon_phase}</b></p>
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-10 mt-4'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunrise size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[0].astro.sunrise}</b></p>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunset size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[0].astro.sunset}</b></p>
                                    </div>
                                </div>
                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-start gap-3 mt-4 overflow-auto'>
                                    {
                                        apiData.forecast.forecastday[0].hour.map((elem) => (
                                            <>
                                                <Divider sx={{ width: '90%' }} />
                                                <div className='w-[100%] flex items-center justify-center gap-2'>
                                                    <div className='h-[100%] flex items-center justify-center'>
                                                        <img className='h-[50%] w-[100%]' src={elem.condition.icon} alt='/' />
                                                    </div>
                                                    <div className='w-[100%] h-[100%] flex flex-col items-center justify-center text-white gap-4'>
                                                        <div className='text-green-300'>
                                                            {elem.time}
                                                        </div>
                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsThermometerHigh />
                                                                <p><b>{elem.temp_c}</b>C</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <AiFillCloud />
                                                                <p><b>{elem.cloud}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BiWind />
                                                                <p><b>{elem.wind_kph}</b>Kmh</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <p><b>UV</b></p>
                                                                <p><b>{elem.uv}</b></p>
                                                            </div>
                                                        </div>

                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsFillCloudRainHeavyFill />
                                                                <p><b>{elem.chance_of_rain}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <SiRainmeter />
                                                                <p><b>{elem.precip_mm}</b>mm</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsSnow />
                                                                <p><b>{elem.chance_of_snow}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <WiHumidity />
                                                                <p><b>{elem.humidity}</b>%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </>
                        }
                        />
                            :
                            null
                    }

                    {/* second */}
                    {
                        value === apiData.forecast.forecastday[1].date ? <Modal handle={handleClose} content={
                            <>
                                <div className='flex items-center justify-center gap-4 text-white'>
                                    <BsMoonFill size={30} color='white' />
                                    <p><b>{apiData.forecast.forecastday[1].astro.moon_phase}</b></p>
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-10 mt-4'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunrise size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[1].astro.sunrise}</b></p>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunset size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[1].astro.sunset}</b></p>
                                    </div>
                                </div>
                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-start gap-3 mt-4 overflow-scroll'>
                                    {
                                        apiData.forecast.forecastday[1].hour.map((elem) => (
                                            <>
                                                <Divider sx={{ width: '90%' }} />
                                                <div className='w-[100%] flex items-center justify-center gap-2'>
                                                    <div className='h-[100%] flex items-center justify-center'>
                                                        <img className='h-[50%] w-[100%]' src={elem.condition.icon} alt='/' />
                                                    </div>
                                                    <div className='w-[100%] h-[100%] flex flex-col items-center justify-center text-white gap-4'>
                                                        <div className='text-green-300'>
                                                            {elem.time}
                                                        </div>
                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsThermometerHigh />
                                                                <p><b>{elem.temp_c}</b>C</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <AiFillCloud />
                                                                <p><b>{elem.cloud}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BiWind />
                                                                <p><b>{elem.wind_kph}</b>Kmh</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <p><b>UV</b></p>
                                                                <p><b>{elem.uv}</b></p>
                                                            </div>
                                                        </div>

                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsFillCloudRainHeavyFill />
                                                                <p><b>{elem.chance_of_rain}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <SiRainmeter />
                                                                <p><b>{elem.precip_mm}</b>mm</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsSnow />
                                                                <p><b>{elem.chance_of_snow}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <WiHumidity />
                                                                <p><b>{elem.humidity}</b>%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </>
                        }
                        />
                            :
                            null
                    }


                    {/* third */}
                    {
                        value === apiData.forecast.forecastday[2].date ? <Modal handle={handleClose} content={
                            <>
                                <div className='flex items-center justify-center gap-4 text-white'>
                                    <BsMoonFill size={30} color='white' />
                                    <p><b>{apiData.forecast.forecastday[2].astro.moon_phase}</b></p>
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-10 mt-4'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunrise size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[2].astro.sunrise}</b></p>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunset size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[2].astro.sunset}</b></p>
                                    </div>
                                </div>
                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-start gap-3 mt-4 overflow-scroll'>
                                    {
                                        apiData.forecast.forecastday[2].hour.map((elem) => (
                                            <>
                                                <Divider sx={{ width: '90%' }} />
                                                <div className='w-[100%] flex items-center justify-center gap-2'>
                                                    <div className='h-[100%] flex items-center justify-center'>
                                                        <img className='h-[50%] w-[100%]' src={elem.condition.icon} alt='/' />
                                                    </div>
                                                    <div className='w-[100%] h-[100%] flex flex-col items-center justify-center text-white gap-4'>
                                                        <div className='text-green-300'>
                                                            {elem.time}
                                                        </div>
                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsThermometerHigh />
                                                                <p><b>{elem.temp_c}</b>C</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <AiFillCloud />
                                                                <p><b>{elem.cloud}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BiWind />
                                                                <p><b>{elem.wind_kph}</b>Kmh</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <p><b>UV</b></p>
                                                                <p><b>{elem.uv}</b></p>
                                                            </div>
                                                        </div>

                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsFillCloudRainHeavyFill />
                                                                <p><b>{elem.chance_of_rain}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <SiRainmeter />
                                                                <p><b>{elem.precip_mm}</b>mm</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsSnow />
                                                                <p><b>{elem.chance_of_snow}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <WiHumidity />
                                                                <p><b>{elem.humidity}</b>%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </>
                        }
                        />
                            :
                            null
                    }


                    {/* fouth */}
                    {
                        value === apiData.forecast.forecastday[3].date ? <Modal handle={handleClose} content={
                            <>
                                <div className='flex items-center justify-center gap-4 text-white'>
                                    <BsMoonFill size={30} color='white' />
                                    <p><b>{apiData.forecast.forecastday[3].astro.moon_phase}</b></p>
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-10 mt-4'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunrise size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[3].astro.sunrise}</b></p>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunset size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[3].astro.sunset}</b></p>
                                    </div>
                                </div>
                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-start gap-3 mt-4 overflow-scroll'>
                                    {
                                        apiData.forecast.forecastday[3].hour.map((elem) => (
                                            <>
                                                <Divider sx={{ width: '90%' }} />
                                                <div className='w-[100%] flex items-center justify-center gap-2'>
                                                    <div className='h-[100%] flex items-center justify-center'>
                                                        <img className='h-[50%] w-[100%]' src={elem.condition.icon} alt='/' />
                                                    </div>
                                                    <div className='w-[100%] h-[100%] flex flex-col items-center justify-center text-white gap-4'>
                                                        <div className='text-green-300'>
                                                            {elem.time}
                                                        </div>
                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsThermometerHigh />
                                                                <p><b>{elem.temp_c}</b>C</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <AiFillCloud />
                                                                <p><b>{elem.cloud}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BiWind />
                                                                <p><b>{elem.wind_kph}</b>Kmh</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <p><b>UV</b></p>
                                                                <p><b>{elem.uv}</b></p>
                                                            </div>
                                                        </div>

                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsFillCloudRainHeavyFill />
                                                                <p><b>{elem.chance_of_rain}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <SiRainmeter />
                                                                <p><b>{elem.precip_mm}</b>mm</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsSnow />
                                                                <p><b>{elem.chance_of_snow}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <WiHumidity />
                                                                <p><b>{elem.humidity}</b>%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </>
                        }
                        />
                            :
                            null
                    }


                    {/* fifth */}
                    {
                        value === apiData.forecast.forecastday[4].date ? <Modal handle={handleClose} content={
                            <>
                                <div className='flex items-center justify-center gap-4 text-white'>
                                    <BsMoonFill size={30} color='white' />
                                    <p><b>{apiData.forecast.forecastday[4].astro.moon_phase}</b></p>
                                </div>
                                <div className='w-[100%] flex items-center justify-center gap-10 mt-4'>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunrise size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[4].astro.sunrise}</b></p>
                                    </div>
                                    <div className='flex items-center justify-center gap-2'>
                                        <GiSunset size={30} color='white' />
                                        <p className='text-white'><b>{apiData.forecast.forecastday[4].astro.sunset}</b></p>
                                    </div>
                                </div>
                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-start gap-3 mt-4 overflow-scroll'>
                                    {
                                        apiData.forecast.forecastday[4].hour.map((elem) => (
                                            <>
                                                <Divider sx={{ width: '90%' }} />
                                                <div className='w-[100%] flex items-center justify-center gap-2'>
                                                    <div className='h-[100%] flex items-center justify-center'>
                                                        <img className='h-[50%] w-[100%]' src={elem.condition.icon} alt='/' />
                                                    </div>
                                                    <div className='w-[100%] h-[100%] flex flex-col items-center justify-center text-white gap-4'>
                                                        <div className='text-green-300'>
                                                            {elem.time}
                                                        </div>
                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsThermometerHigh />
                                                                <p><b>{elem.temp_c}</b>C</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <AiFillCloud />
                                                                <p><b>{elem.cloud}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BiWind />
                                                                <p><b>{elem.wind_kph}</b>Kmh</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <p><b>UV</b></p>
                                                                <p><b>{elem.uv}</b></p>
                                                            </div>
                                                        </div>

                                                        <div className='w-[100%] h-[50%] flex items-center justify-center gap-4 sm:gap-8'>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsFillCloudRainHeavyFill />
                                                                <p><b>{elem.chance_of_rain}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <SiRainmeter />
                                                                <p><b>{elem.precip_mm}</b>mm</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <BsSnow />
                                                                <p><b>{elem.chance_of_snow}</b>%</p>
                                                            </div>
                                                            <div className='flex items-center justify-center gap-1'>
                                                                <WiHumidity />
                                                                <p><b>{elem.humidity}</b>%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </>
                        }
                        />
                            :
                            null
                    }

                </>
            }

            <div className='absolute w-[100%] h-[100%] flex flex-col items-center justify-start z-10 gap-6'>
                <div className='w-[100%] mt-4 flex items-center justify-center z-50'>
                    <input type='text' value={location} onChange={event => setLocation(event.target.value)} onKeyPress={Serch} placeholder='Search...' className='w-[80%] h-[40px] md:w-[60%] text-center rounded-[20px] border-solid border-[2px] border-blue-500' />
                </div>
                <div onClick={refresh} className='flex items-center justify-center p-2 backdrop-blur-md bg-white/30 rounded-[50%] cursor-pointer'>
                    <MdOutlineGpsFixed size={30} />
                </div>

                {
                    apiData.current ?

                        <div className='w-[100%] flex flex-col items-center justify-start overflow-auto'>
                            <GlassEfect content={
                                <>
                                    <p className='md:text-2xl text-[20px] mt-2'><b>{apiData.location.country} - {apiData.location.name}</b></p>
                                    <div className='w-[100%] flex items-center justify-center gap-8'>
                                        <img src={apiData.current.condition.icon} className='w-[120px]' alt='/' />

                                        <div className='flex items-center justify-center gap-2'>
                                            <BsThermometerHigh size={30} />
                                            <p className='text-[20px] md:text-2xl'><b>{apiData.current.temp_c} ºC</b></p>
                                        </div>

                                    </div>
                                    <div className='w-[100%] flex items-center justify-center gap-6'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <BsFillCloudRainHeavyFill size={25} />
                                            <p className='text-[16px] md:text-xl'><b>{apiData.current.precip_mm} mm</b></p>
                                        </div>
                                        <div className='flex items-center justify-center gap-2'>
                                            <GiWindsock size={25} />
                                            <p className='text-[16px] md:text-xl'><b>{apiData.current.wind_kph} Kmh</b></p>
                                        </div>
                                    </div>
                                    <div className='w-[100%] flex items-center justify-center gap-3 md:gap-10 text-xl mt-4'>
                                        <div className='flex items-center justify-center gap-1'>
                                            <AiFillCloud />
                                            <p className='text-[16px] md:text-xl'><b>{apiData.current.cloud}</b></p>
                                        </div>
                                        <div className='flex items-center justify-center gap-1'>
                                            <WiHumidity />
                                            <p className='text-[16px] md:text-xl'><b>{apiData.current.humidity}%</b></p>
                                        </div>
                                        <div className='flex items-center justify-center gap-1'>
                                            <MdOutlineVisibility />
                                            <p className='text-[16px] md:text-xl'><b>{apiData.current.vis_km}km</b></p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-center justify-center p-1 mt-1'>
                                        <p className='text-[16px] md:text-xl'><b>last update:</b></p>
                                        <p>{apiData.current.last_updated}</p>
                                    </div>
                                </>
                            } />
                            {
                                apiData.forecast &&
                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-start gap-4 overflow-auto mt-10'>

                                    <div className='w-[98%] max-w-[500px] h-[100%] flex flex-col items-center justify-start overflow-auto gap-4'>

                                        <div className='w-[100%] text-[14px] md:text-xl' onClick={() => setValue(apiData.forecast.forecastday[0].date)}>
                                            <div onClick={handleOpen} className='w-[100%] flex items-center justify-between bg-[#778da9] rounded-[20px] p-2 cursor-pointer text-white'>
                                                <div className='h-[100%] flex flex-col items-center justify-center'>
                                                    <img src={apiData.forecast.forecastday[0].day.condition.icon} alt='/' />
                                                </div>
                                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-center gap-2'>
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-6'>
                                                        <p className='text-green-300 text-center'>{apiData.forecast.forecastday[0].date}</p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSun size={20} />
                                                            <p><b>{apiData.forecast.forecastday[0].day.maxtemp_c} ºC</b></p>
                                                        </div>
                                                        <p><b>-</b></p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSnow size={20} />
                                                            <p><b>{apiData.forecast.forecastday[0].day.mintemp_c} ºC</b></p>
                                                        </div>
                                                    </div>
                                                    <Divider sx={{ width: '90%' }} />
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-8 md:gap-16'>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsFillCloudRainHeavyFill />
                                                            <p><b>{apiData.forecast.forecastday[0].day.daily_chance_of_rain}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsSnow />
                                                            <p><b>{apiData.forecast.forecastday[0].day.daily_chance_of_snow}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BiWind />
                                                            <p><b>{apiData.forecast.forecastday[0].day.maxwind_kph} Kmh</b></p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* second */}
                                        <div className='w-[100%] text-[14px] md:text-xl' onClick={() => setValue(apiData.forecast.forecastday[1].date)}>
                                            <div onClick={handleOpen} className='w-[100%] flex items-center justify-between bg-[#778da9] rounded-[20px] p-2 cursor-pointer text-white'>
                                                <div className='h-[100%] flex flex-col items-center justify-center'>
                                                    <img src={apiData.forecast.forecastday[1].day.condition.icon} alt='/' />
                                                </div>
                                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-center gap-2'>
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-6'>
                                                        <p className='text-green-300 text-center'>{apiData.forecast.forecastday[1].date}</p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSun size={20} />
                                                            <p><b>{apiData.forecast.forecastday[1].day.maxtemp_c} ºC</b></p>
                                                        </div>
                                                        <p><b>-</b></p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSnow size={20} />
                                                            <p><b>{apiData.forecast.forecastday[1].day.mintemp_c} ºC</b></p>
                                                        </div>
                                                    </div>
                                                    <Divider sx={{ width: '90%' }} />
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-8 md:gap-16'>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsFillCloudRainHeavyFill />
                                                            <p><b>{apiData.forecast.forecastday[1].day.daily_chance_of_rain}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsSnow />
                                                            <p><b>{apiData.forecast.forecastday[1].day.daily_chance_of_snow}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BiWind />
                                                            <p><b>{apiData.forecast.forecastday[1].day.maxwind_kph} Kmh</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* third */}
                                        <div className='w-[100%] text-[14px] md:text-xl' onClick={() => setValue(apiData.forecast.forecastday[2].date)}>
                                            <div onClick={handleOpen} className='w-[100%] flex items-center justify-between bg-[#778da9] rounded-[20px] p-2 cursor-pointer text-white'>
                                                <div className='h-[100%] flex flex-col items-center justify-center'>
                                                    <img src={apiData.forecast.forecastday[2].day.condition.icon} alt='/' />
                                                </div>
                                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-center gap-2'>
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-6'>
                                                        <p className='text-green-300 text-center'>{apiData.forecast.forecastday[2].date}</p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSun size={20} />
                                                            <p><b>{apiData.forecast.forecastday[2].day.maxtemp_c} ºC</b></p>
                                                        </div>
                                                        <p><b>-</b></p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSnow size={20} />
                                                            <p><b>{apiData.forecast.forecastday[2].day.mintemp_c} ºC</b></p>
                                                        </div>
                                                    </div>
                                                    <Divider sx={{ width: '90%' }} />
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-8 md:gap-16'>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsFillCloudRainHeavyFill />
                                                            <p><b>{apiData.forecast.forecastday[2].day.daily_chance_of_rain}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsSnow />
                                                            <p><b>{apiData.forecast.forecastday[2].day.daily_chance_of_snow}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BiWind />
                                                            <p><b>{apiData.forecast.forecastday[2].day.maxwind_kph} Kmh</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* fourth */}
                                        <div className='w-[100%] text-[14px] md:text-xl' onClick={() => setValue(apiData.forecast.forecastday[3].date)}>
                                            <div onClick={handleOpen} className='w-[100%] flex items-center justify-between bg-[#778da9] rounded-[20px] p-2 cursor-pointer text-white'>
                                                <div className='h-[100%] flex flex-col items-center justify-center'>
                                                    <img src={apiData.forecast.forecastday[3].day.condition.icon} alt='/' />
                                                </div>
                                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-center gap-2'>
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-6'>
                                                        <p className='text-green-300 text-center'>{apiData.forecast.forecastday[3].date}</p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSun size={20} />
                                                            <p><b>{apiData.forecast.forecastday[3].day.maxtemp_c} ºC</b></p>
                                                        </div>
                                                        <p><b>-</b></p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSnow size={20} />
                                                            <p><b>{apiData.forecast.forecastday[3].day.mintemp_c} ºC</b></p>
                                                        </div>
                                                    </div>
                                                    <Divider sx={{ width: '90%' }} />
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-8 md:gap-16'>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsFillCloudRainHeavyFill />
                                                            <p><b>{apiData.forecast.forecastday[3].day.daily_chance_of_rain}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsSnow />
                                                            <p><b>{apiData.forecast.forecastday[3].day.daily_chance_of_snow}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BiWind />
                                                            <p><b>{apiData.forecast.forecastday[3].day.maxwind_kph} Kmh</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* fifth */}
                                        <div className='w-[100%] text-[14px] md:text-xl' onClick={() => setValue(apiData.forecast.forecastday[4].date)}>
                                            <div onClick={handleOpen} className='w-[100%] flex items-center justify-between bg-[#778da9] rounded-[20px] p-2 cursor-pointer text-white'>
                                                <div className='h-[100%] flex flex-col items-center justify-center'>
                                                    <img src={apiData.forecast.forecastday[4].day.condition.icon} alt='/' />
                                                </div>
                                                <div className='w-[100%] h-[100%] flex flex-col items-center justify-center gap-2'>
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-6'>
                                                        <p className='text-green-300 text-center'>{apiData.forecast.forecastday[4].date}</p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSun size={20} />
                                                            <p><b>{apiData.forecast.forecastday[4].day.maxtemp_c} ºC</b></p>
                                                        </div>
                                                        <p><b>-</b></p>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsThermometerSnow size={20} />
                                                            <p><b>{apiData.forecast.forecastday[4].day.mintemp_c} ºC</b></p>
                                                        </div>
                                                    </div>
                                                    <Divider sx={{ width: '90%' }} />
                                                    <div className='w-[100%] h-[50%] flex items-center justify-center gap-8 md:gap-16'>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsFillCloudRainHeavyFill />
                                                            <p><b>{apiData.forecast.forecastday[4].day.daily_chance_of_rain}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BsSnow />
                                                            <p><b>{apiData.forecast.forecastday[4].day.daily_chance_of_snow}%</b></p>
                                                        </div>
                                                        <div className='flex items-center justify-center gap-1'>
                                                            <BiWind />
                                                            <p><b>{apiData.forecast.forecastday[4].day.maxwind_kph} Kmh</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <GeoWeather />
                }
            </div>


            {/* <img src={Genbg} alt='/' className='w-[100%] h-[100%] object-cover' /> */}
            <div className='relative w-[100%] h-[100%] flex items-center justify-center'>
                {
                    apiData.current ?
                        apiData.current.is_day === 1 ?
                            <img src={Day} alt='/' className='w-[100%] h-[100%] object-cover' />
                            :
                            <img src={Night} alt='/' className='w-[100%] h-[100%] object-cover' />
                        :
                        null

                }
            </div>
        </div>
    )
}

export default Home