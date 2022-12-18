import { Wrapper, Status } from '@googlemaps/react-wrapper'
import MapDisplay from './MapDisplay'

const render = (status) => {
	switch (status) {
		case Status.LOADING:
			return <h2>Loading...</h2>
		case Status.FAILURE:
			return <h2>Map unavailable...</h2>
		case Status.SUCCESS:
			return <MapDisplay />
	}
}

const MapWrapper = () => {
	return <Wrapper apiKey={process.env.MAPS_API_KEY} render={render} />
}

export default MapWrapper
