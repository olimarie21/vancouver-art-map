import axios from 'axios'
import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { Map, Marker } from 'pigeon-maps'
import { stamenToner } from 'pigeon-maps/providers'
import ArtMarker from './ArtMarker'
import PaletteIcon from '@mui/icons-material/Palette'

const MapDisplay = () => {
	const [locations, setLocations] = useState()
	const [loaded, setLoaded] = useState(false)
	const [center, setCenter] = useState([49.28452841265043, -123.13040950170381])
	const [hue, setHue] = useState(0)

	useEffect(() => {
		const showPosition = (position) => {
			console.log(position)
			setCenter([position.coords.latitude, position.coords.longitude])
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
					'https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art&q=&rows=4&refine.status=In+place&refine.fields=geom'
				)
				.then((res) => {
					let results = res.data.records

					setLocations(
						results.filter((local) => local.fields.geom !== undefined)
					)

					setLoaded(true)
				})
				.catch((err) => {
					console.log('err', err)
				})
		}
		getArt()
	}, [loaded])

	return (
		<Box
			sx={{
				margin: '0',
				height: '100vh',
				width: '100vw',
				position: 'relative',
			}}>
			<Map
				height={'100vh'}
				center={center}
				defaultCenter={center}
				defaultZoom={16}
				provider={stamenToner}
				dprs={[1, 2]}>
				<Marker
					width={50}
					color={'black'}
					anchor={center}
					onClick={() => console.log('click')}
				/>
				{loaded
					? locations.map((location, idx) => (
							<Marker
								onClick={() => console.log(location)}
								key={idx}
								width={40}
								height={40}
								color={'#000'}
								payload={1}
								anchor={[
									location.fields.geom.coordinates[1],
									location.fields.geom.coordinates[0],
								]}>
								<ArtMarker />
							</Marker>
					  ))
					: null}
			</Map>
		</Box>
	)
}

export default MapDisplay
