import * as React from 'react'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { styled } from '@mui/material/styles'
import styles from '../styles/mapStyles'

const Map = ({ zoom, children }) => {
	const ref = useRef()
	const [center, setCenter] = useState({
		lat: 49.28452841265043,
		lng: -123.13040950170381,
	})
	const [map, setMap] = useState()
	const [locations, setLocations] = useState(null)
	const [artist, setArtist] = useState(null)

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
								url: 'https://res.cloudinary.com/scave2021/image/upload/v1672354802/art_icon_bg_ekpvcp.png',
								scaledSize: new google.maps.Size(34, 34),
							},
						})

						marker.addListener('click', (e) => {
							let infowindow
							console.log('location', location)
							// axios
							// 	.get(
							// 		`https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art-artists&q=&refine.artistid=${location.fields.artists}`
							// 	)
							// 	.then((res) => {
							// 		console.log(res.data.records)
							// 		res.data.records != []
							// 			? setArtist(
							// 					res.data.records[0].fields.firstname +
							// 						' ' +
							// 						res.data.records[0].fields.lastname
							// 			  )
							// 			: setArtist('Artist Unknown')
							// 		console.log(artist)
							// 	})
							// 	.then(() => {})
							// 	.catch((err) => console.log(err))
							infowindow = new google.maps.InfoWindow({
								content: `<div class='artModal'>
										<h2>${location.fields.sitename || 'Title Unknown'}</h2>
										<h3>Artist Name</h3>
										<h3>${location.fields.type}</h3>
										<p>${location.fields.descriptionofwork || 'Details not found.'}</p>
										<a href=${location.fields.url}>Learn more</a>
										</div>`,
							})
							infowindow.open({
								anchor: marker,
								map,
							})
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
									url: 'https://res.cloudinary.com/scave2021/image/upload/v1672355935/art-icon_cluster_x6thbq.png',
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
			<Container ref={ref} id='map'>
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child)) {
						// set the map prop on the child component
						return React.cloneElement(child, { map })
					}
				})}
			</Container>
		</>
	)
}

const Container = styled(Box)(
	({ theme }) => `
		margin: 0;
		height: 100vh;
		width: 100vw;
    	font-family: ${theme.typography.fontFamily};
`
)

export default Map

// title: artSelected.fields.sitename,
// 		artist: artSelected.fields.artists,
// 		address: artSelected.fields.siteaddress,
// 		description: artSelected.fields.descriptionofwork,
// 		yearInstalled: artSelected.fields.yearofinstallation,
// 		type: artSelected.fields.type,
// 		primaryMaterial: artSelected.fields.primarymaterial,
// 		link: artSelected.fields.url
