import { Wrapper, Status } from '@googlemaps/react-wrapper'
import Map from './Map'

const render = (status) => {
	switch (status) {
		case Status.LOADING:
			return <h2>Loading...</h2>
		case Status.FAILURE:
			return <h2>Map unavailable...</h2>
		case Status.SUCCESS:
			return <Map />
	}
}

const MapWrapper = () => {
	return <Wrapper apiKey={process.env.MAPS_API_KEY} render={render} />
}

export default MapWrapper
