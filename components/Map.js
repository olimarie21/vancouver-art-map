import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Box } from '@mui/material'
import { Wrapper, Status } from '@googlemaps/react-wrapper'

const API_KEY = process.env.MAPS_API_KEY
const render = (status) => {
	switch (status) {
		case Status.LOADING:
			return <h2>Loading</h2>
		case Status.FAILURE:
			return console.log('error')
		case Status.SUCCESS:
			return <MyMapComponent />
	}
}

const Map = () => {
	const [locations, setLocations] = useState([])
	const [loaded, setLoaded] = useState(false)
	const [userLocation, setUserLocation] = useState({
		lat: 49.28452841265043,
		lng: -123.13040950170381,
	})

	return (
		<Box sx={{ margin: '0', height: '100vh', width: '100vw' }}>
			<Wrapper apiKey={API_KEY} render={render}>
				<MyMapComponent zoom={12} style={style} center={center} />
			</Wrapper>
		</Box>
	)
}

const center = {
	lat: 49.28452841265043,
	lng: -123.13040950170381,
}

const style = {
	width: '100%',
	height: '100%',
}

function MyMapComponent({ center, zoom, style }) {
	const ref = useRef()

	useEffect(() => {
		new window.google.maps.Map(ref.current, {
			center,
			zoom,
			style,
		})
	})

	return <div ref={ref} id='map' style={style} />
}

export default Map
