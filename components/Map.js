import * as React from 'react'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { MarkerClusterer } from '@googlemaps/markerclusterer'

const Map = ({ zoom, children }) => {
	const ref = useRef()
	const [center, setCenter] = useState({
		lat: 49.28452841265043,
		lng: -123.13040950170381,
	})
	const [map, setMap] = useState()
	const [locations, setLocations] = useState(null)

	useEffect(() => {
		const showPosition = (position) => {
			setCenter({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			})
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
		const getArt = () => {
			axios
				.get(
					'https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art&q=&rows=200&refine.status=In+place&refine.fields=geom'
				)
				.then((res) => {
					let results = res.data.records.filter(
						(local) => local.fields.geom !== undefined
					)
					setLocations(results)

					const markers = results.map((location, idx) => {
						return new google.maps.Marker({
							key: idx,
							position: {
								lat: location.fields.geom.coordinates[1],
								lng: location.fields.geom.coordinates[0],
							},
							icon: {
								url: 'https://res.cloudinary.com/scave2021/image/upload/v1671313452/art_icon_hqhooz.png',
								scaledSize: new google.maps.Size(24, 24),
							},
						})
					})

					const renderer = {
						render: ({ count, position }) =>
							new google.maps.Marker({
								label: {
									text: String(count),
									color: 'white',
									fontSize: '12px',
									className: 'marker-label',
									fontWeight: 'bold',
								},
								position,
								icon: {
									url: 'https://res.cloudinary.com/scave2021/image/upload/v1672347825/art_icon_purple_pnqntp.png',
									scaledSize: new google.maps.Size(35, 35),
								},
							}),
					}

					new MarkerClusterer({
						map,
						markers,
						renderer,
					})
				})
				.catch((err) => {
					console.log('err', err)
				})
		}

		getArt()
		console.log('art loaded')
	}, [map])

	useEffect(() => {
		setMap(
			new window.google.maps.Map(ref.current, {
				center,
				zoom: 14,
				styles,
			})
		)
		console.log('map loaded')
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
