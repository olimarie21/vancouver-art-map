import * as React from 'react'
import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { styled } from '@mui/material/styles'
import styles from '../styles/mapStyles'
import getDistance from '../utils/calculateDistance'
import GoogleMapReact from 'google-map-react'
import DetailModal from './DetailModal'
import Marker from 'google-map-react'

const Map = () => {
	const mapRef = useRef()
	const defaultProps = {
		center: {
			lat: 49.277691,
			lng: -123.117504,
		},
		zoom: 16,
	}
	const [locations, setLocations] = useState()
	const [showArt, setShowArt] = useState(false)
	const [artItem, setArtItem] = useState()
	const [artistName, setArtistName] = useState([])
	const [center, setCenter] = useState()

	// get user location, set as center if within range of City
	useEffect(() => {
		const showPosition = (position) => {
			const distance = getDistance(
				{
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				},
				defaultProps.center
			)

			if (distance < 10) {
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				})
			} else {
				alert(
					'It appears that you are outside of the City of Vancouver, currently this map only shows public art within city limits. Feel free to explore the map and visit soon!'
				)
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				})
			}
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

	const getArt = (map) => {
		mapRef.current = map
		axios
			.get(
				'https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art&q=&rows=500&refine.status=In+place&refine.fields=geom'
			)
			.then((res) => {
				let results = res.data.records.filter(
					(local) => local.fields.geom !== undefined
				)

				setLocations(results)

				const markers = results.map((location, idx) => {
					const marker = new google.maps.Marker({
						key: idx,
						animation: google.maps.Animation.DROP,
						position: {
							lat: location.fields.geom.coordinates[1],
							lng: location.fields.geom.coordinates[0],
						},
						icon: {
							url: 'https://res.cloudinary.com/scave2021/image/upload/v1673306251/art_icon_bg_ruzuqa.png',
							scaledSize: new google.maps.Size(34, 34),
						},
					})
					marker.addListener('click', () => {
						map.panTo(marker.getPosition())

						window.setTimeout(() => {
							artPopup(location)
						}, 300)
					})

					return marker
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
								fontFamily: 'Montserrat',
							},
							animation: google.maps.Animation.DROP,
							position,
							icon: {
								url: 'https://res.cloudinary.com/scave2021/image/upload/v1673306251/art-icon_cluster_frwdp0.png',
								scaledSize: new google.maps.Size(40, 40),
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
		console.log('art loaded')
	}

	useEffect(() => {
		getArt(mapRef.current)
	}, [mapRef.current])

	const getArtists = (artists) => {
		const artistArr = artists.split(';')
		return artistArr
	}

	const artPopup = (art) => {
		setArtItem(art)

		const artists = getArtists(art.fields.artists)
		const names = []

		for (let i = 0; i < artists.length; i++) {
			axios
				.get(
					`https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art-artists&q=&refine.artistid=${artists[i]}`
				)
				.then((res) => {
					if (res.data.records != []) {
						const name =
							res.data.records[0].fields.firstname +
							' ' +
							res.data.records[0].fields.lastname

						switch (true) {
							case !name.includes('undefined'):
								names.push(
									res.data.records[0].fields.firstname +
										' ' +
										res.data.records[0].fields.lastname
								)
								break
							case name.includes('undefined'):
								names.push(name.replace('undefined', ''))

								break
							default:
								setArtistName(['Artist Name Unavailable'])
						}
					}

					setShowArt(true)
					setArtistName(names)
				})
				.catch((err) => {
					setArtistName(['Artist Name Unavailable'])
					setShowArt(true)

					console.log(err)
				})
		}
	}

	return (
		<Container style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.MAPS_API_KEY }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				center={center}
				options={{
					styles: styles,
					clickableIcons: false,
					disableDefaultUI: true,
					draggable: true,
				}}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map }) => {
					mapRef.current = map
				}}>
				{showArt ? (
					<DetailModal
						lat={artItem.fields.geom.coordinates[1]}
						lng={artItem.fields.geom.coordinates[0]}
						art={artItem}
						artistName={artistName}
						setShowArt={setShowArt}
					/>
				) : null}
			</GoogleMapReact>
		</Container>
	)
}

const Container = styled(Box)(
	({ theme }) => `
		margin: 0;
		height: 100vh;
		width: 100%;
    	font-family: ${theme.typography.fontFamily};
`
)

export default Map
