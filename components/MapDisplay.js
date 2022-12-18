import axios from 'axios'
import { useState, useEffect } from 'react'
import ArtMarker from './ArtMarker'
import Map from './Map'
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded'

const MapDisplay = () => {
	const [locations, setLocations] = useState()
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const getArt = () => {
			axios
				.get(
					'https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art&q=&rows=200&refine.status=In+place&refine.fields=geom'
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
		<Map zoom={12}>
			{loaded
				? locations.map((location, idx) => (
						<ArtMarker
							key={idx}
							position={{
								lat: location.fields.geom.coordinates[1],
								lng: location.fields.geom.coordinates[0],
							}}
							icon={{
								url: 'https://res.cloudinary.com/scave2021/image/upload/v1671313452/art_icon_hqhooz.png',
								scaledSize: new google.maps.Size(37, 37),
							}}
						/>
				  ))
				: null}
		</Map>
	)
}

export default MapDisplay
