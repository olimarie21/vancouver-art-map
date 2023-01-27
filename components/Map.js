import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	MarkerClusterer,
} from '@react-google-maps/api'
import { useState, useEffect, useCallback } from 'react'
import styles from '../styles/mapStyles'
import axios from 'axios'
import mapClusterStyles from '../styles/mapClusterStyles'
import DetailModal from './DetailModal'

const Map = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.MAPS_API_KEY,
	})
	const [center, setCenter] = useState({ lat: 49.277691, lng: -123.117504 })
	const [zoom, setZoom] = useState(12)
	const [map, setMap] = useState(null)
	const [locations, setLocations] = useState([])
	const [showArt, setShowArt] = useState(false)
	const [artItem, setArtItem] = useState()

	const [containerStyle, setContainerStyle] = useState({
		width: '100vw',
		height: '100vh',
	})

	useEffect(() => {
		let isMounted = true
		axios.get(`${process.env.DB_URL}`).then((res) => {
			isMounted ? setLocations(res.data) : null
		})

		return () => {
			isMounted = false
		}
	}, [])

	const onLoad = useCallback(function callback(map) {
		setMap(map)
	}, [])

	const onUnmount = useCallback(function callback(map) {
		setMap(null)
	}, [])

	const artPopup = (art) => {
		setArtItem(art)
		setShowArt(true)
		// setCenter({
		// 	lat: art.geolocation.coordinates[1],
		// 	lng: art.geolocation.coordinates[0],
		// })
	}

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={zoom}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={{
				styles: styles,
				disableDefaultUI: true,
				clickableIcons: false,
				maxWidth: 350,
			}}>
			<MarkerClusterer
				options={{
					styles: mapClusterStyles,
				}}>
				{(clusterer) =>
					locations.map((location, index) => (
						<Marker
							key={index}
							position={{
								lat: location.geolocation.coordinates[1],
								lng: location.geolocation.coordinates[0],
							}}
							clusterer={clusterer}
							icon={
								location === artItem && showArt
									? {
											url: 'https://res.cloudinary.com/scave2021/image/upload/v1674620283/alt_art-icon.png',
											scaledSize: new google.maps.Size(46, 46),
									  }
									: {
											url: 'https://res.cloudinary.com/scave2021/image/upload/v1673306251/art_icon_bg_ruzuqa.png',
											scaledSize: new google.maps.Size(38, 38),
									  }
							}
							animation={
								location === artItem && showArt
									? google.maps.Animation.BOUNCE
									: null
							}
							onClick={() => {
								artPopup(location)
								zoom < 16 ? setZoom(16) : null
								map.panTo({
									lat: location.geolocation.coordinates[1],
									lng: location.geolocation.coordinates[0],
								})
							}}
						/>
					))
				}
			</MarkerClusterer>
			{showArt ? (
				<DetailModal showArt={showArt} art={artItem} setShowArt={setShowArt} />
			) : null}
		</GoogleMap>
	) : (
		<></>
	)
}

export default Map
