import axios from 'axios'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { Map, Marker } from 'pigeon-maps'
import { stamenToner } from 'pigeon-maps/providers'

const MapDisplay = () => {
	const [locations, setLocations] = useState()
	const [loaded, setLoaded] = useState(false)
	const [center, setCenter] = useState([49.28452841265043, -123.13040950170381])

	useEffect(() => {
		const getArt = () => {
			axios
				.get(
					'https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art&q=&rows=400&refine.status=In+place&refine.fields=geom'
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
				height={'100%'}
				center={center}
				defaultCenter={center}
				defaultZoom={13}
				provider={stamenToner}
				dprs={[1, 2]}>
				{loaded
					? locations.map((location, idx) => (
							<Marker
								key={idx}
								width={50}
								color={'#000'}
								anchor={[
									location.fields.geom.coordinates[1],
									location.fields.geom.coordinates[0],
								]}
							/>
					  ))
					: null}
			</Map>
		</Box>
	)
}

export default MapDisplay
