import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'

const Map = ({ zoom, children }) => {
	const ref = useRef()
	const [center, setCenter] = useState({
		lat: 49.28452841265043,
		lng: -123.13040950170381,
	})
	const [map, setMap] = useState()

	useEffect(() => {
		const showPosition = (position) => {
			// setCenter({
			// 	lat: position.coords.latitude,
			// 	lng: position.coords.longitude,
			// })
		}

		const getLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition)
			} else {
				alert('Please enable device location to see the nearby art!')
			}
		}

		getLocation()
	}, [])

	useEffect(() => {
		setMap(
			new window.google.maps.Map(ref.current, {
				center,
				zoom,
				styles,
			})
		)
	}, [ref, center, zoom])

	return (
		<>
			<Box
				ref={ref}
				id='map'
				sx={{
					margin: '0',
					height: '100vh',
					width: '100vw',
				}}>
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child)) {
						// set the map prop on the child component
						return React.cloneElement(child, { map })
					}
				})}
			</Box>
		</>
	)
}

const styles = [
	{
		featureType: 'administrative',
		elementType: 'all',
		stylers: [
			{
				saturation: '-100',
			},
		],
	},
	{
		featureType: 'administrative.province',
		elementType: 'all',
		stylers: [
			{
				visibility: 'off',
			},
		],
	},
	{
		featureType: 'landscape',
		elementType: 'all',
		stylers: [
			{
				saturation: -100,
			},
			{
				lightness: 65,
			},
			{
				visibility: 'on',
			},
		],
	},
	{
		featureType: 'poi',
		elementType: 'all',
		stylers: [
			{
				saturation: -100,
			},
			{
				lightness: '50',
			},
			{
				visibility: 'simplified',
			},
		],
	},
	{
		featureType: 'road',
		elementType: 'all',
		stylers: [
			{
				saturation: '-100',
			},
		],
	},
	{
		featureType: 'road.highway',
		elementType: 'all',
		stylers: [
			{
				visibility: 'simplified',
			},
		],
	},
	{
		featureType: 'road.arterial',
		elementType: 'all',
		stylers: [
			{
				lightness: '30',
			},
		],
	},
	{
		featureType: 'road.local',
		elementType: 'all',
		stylers: [
			{
				lightness: '40',
			},
		],
	},
	{
		featureType: 'transit',
		elementType: 'all',
		stylers: [
			{
				saturation: -100,
			},
			{
				visibility: 'simplified',
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				hue: '#ffff00',
			},
			{
				lightness: -25,
			},
			{
				saturation: -97,
			},
		],
	},
	{
		featureType: 'water',
		elementType: 'labels',
		stylers: [
			{
				lightness: -25,
			},
			{
				saturation: -100,
			},
		],
	},
]

export default Map
