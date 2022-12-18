import PaletteIcon from '@mui/icons-material/Palette'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'

const ArtMarker = (options) => {
	const [marker, setMarker] = useState()

	useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker({ icon: PaletteIcon }))
		}

		// // remove marker from map on unmount
		// return () => {
		// 	if (marker) {
		// 		marker.setMap(null)
		// 	}
		// }
	}, [marker])
	useEffect(() => {
		if (marker) {
			marker.setOptions(options)
		}
	}, [marker, options])

	return null
}

export default ArtMarker
