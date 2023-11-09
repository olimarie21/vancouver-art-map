import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	MarkerClusterer,
	Circle,
} from '@react-google-maps/api'
import { useState, useEffect, useCallback } from 'react'
import styles from '../styles/mapStyles'
import axios from 'axios'
import mapClusterStyles from '../styles/mapClusterStyles'
import DetailModal from './DetailModal'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import { Button } from '@mui/material'
import styled from '@emotion/styled'
import Filter from './Filter'
import circleOptions from '../styles/circleOptions'

const Map = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.MAPS_API_KEY,
	})
	const [center, setCenter] = useState({ lat: 49.277691, lng: -123.117504 })
	const [zoom, setZoom] = useState(16)
	const [map, setMap] = useState(null)
	const [locations, setLocations] = useState([])
	const [showArt, setShowArt] = useState(false)
	const [artItem, setArtItem] = useState()
	const [showFilter, setShowFilter] = useState(false)
	const [filterItem, setFilterItem] = useState([])
	const [filteredData, setFilteredData] = useState([])
	const [userLocation, setUserLocation] = useState(null)
	const [bounds, setBounds] = useState([])

	const [containerStyle, setContainerStyle] = useState({
		width: '100vw',
		height: '95vh',
	})

	const onLoad = useCallback(function callback(map) {
		console.log('onLoad')
		setMap(map)

		const mapBounds = new window.google.maps.LatLngBounds(
			new google.maps.LatLng(49.17354181847458, -123.35199344091797), // south-west corner
			new google.maps.LatLng(49.31314301736694, -122.95612078745795) // north-east corner
		)

		setBounds(mapBounds)
	}, [])

	const onUnmount = useCallback(function callback(map) {
		console.log('unmounted')
		setMap(null)
	}, [])

	const artPopup = (art) => {
		setArtItem(art)
		setShowArt(true)
		setShowFilter(false)
	}

	const filterArt = (filters, applyFilter) => {
		filters.length > 0
			? setFilteredData(
					locations.filter((location) => filters.includes(location.type))
			  )
			: setFilteredData(locations)

		if (window.innerWidth < 600) {
			applyFilter ? setShowFilter(false) : null
		}
	}

	useEffect(() => {
		let isMounted = true
		axios.get(`${process.env.DB_URL}`).then((res) => {
			if (isMounted) {
				setLocations(res.data)
				setFilteredData(res.data)
			}
			console.log('mounted')
		})

		return () => {
			isMounted = false
		}
	}, [])

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setUserLocation({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				})

				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				})
			},
			(error) => console.error(error)
		)
	}, [])

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
					filteredData.map((location, index) => (
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
											url: 'https://res.cloudinary.com/scave2021/image/upload/v1699504361/art_icon_bg.png',
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
				<DetailModal
					userLocation={userLocation}
					showArt={showArt}
					art={artItem}
					setShowArt={setShowArt}
				/>
			) : null}
			<CustomFilterBtn
				onClick={() => {
					setShowFilter(!showFilter)
					showArt ? setShowArt(false) : null
				}}>
				{filterItem.length > 0 ? <FilterListIcon /> : <FilterListOffIcon />}
			</CustomFilterBtn>
			{showFilter ? (
				<Filter
					applyFilter={filterArt}
					filterItem={filterItem}
					setFilterItem={setFilterItem}
					showFilter={showFilter}
				/>
			) : null}
			{userLocation &&
				bounds.contains({
					lat: userLocation.lat,
					lng: userLocation.lng,
				}) && (
					<>
						<Marker
							position={userLocation}
							icon={{
								path: google.maps.SymbolPath.CIRCLE,
								scale: 4,
							}}
						/>
						<Circle center={userLocation} options={circleOptions} />
					</>
				)}
		</GoogleMap>
	) : (
		<></>
	)
}

const CustomFilterBtn = styled(Button)(
	({ theme }) => `
		position: fixed;
		left: 2.5rem;
		top: 10rem;
		z-index: 100;
		background: ${theme.palette.secondary.main};
		border-radius: 100px;
		width: 40px;
		height: 40px;
		padding: 0;
		margin: 0;
		min-width: 0;

		&:hover {
			background: ${theme.palette.primary.transparency};
		}

		@media screen and (min-width: 600px) {
			left: 3rem;
		}
	`
)

export default Map
