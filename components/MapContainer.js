import axios from 'axios'
import { useState } from 'react'
import Map from './Map'
import DetailModal from './DetailModal'

const MapContainer = (props) => {
	const [showArt, setShowArt] = useState(false)
	const [artItem, setArtItem] = useState()
	const [artistName, setArtistName] = useState([])

	const closeModal = () => {
		setShowArt(false)
	}

	const getArtists = (artists) => {
		const artistArr = artists.split(';')
		console.log(artistArr)
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
						if (
							res.data.records[0].fields.firstname != undefined &&
							res.data.records[0].fields.lastname != undefined
						) {
							names.push(
								res.data.records[0].fields.firstname +
									' ' +
									res.data.records[0].fields.lastname
							)
						} else if (
							res.data.records[0].fields.firstname != undefined &&
							res.data.records[0].fields.lastname == undefined
						) {
							names.push(res.data.records[0].fields.firstname)
						} else if (
							res.data.records[0].fields.lastname != undefined &&
							res.data.records[0].fields.firstname == undefined
						) {
							names.push(res.data.records[0].fields.lastname)
						} else {
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
		<Map artPopup={artPopup}>
			{showArt ? (
				<DetailModal
					art={artItem}
					artistName={artistName}
					closeModal={closeModal}
				/>
			) : null}
		</Map>
	)
}

export default MapContainer
