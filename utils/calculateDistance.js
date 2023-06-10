const degToRadius = (deg) => {
	return deg * (Math.PI / 180)
}

const getDistance = (userLocation, location) => {
	const earthRadius = 6371.071 // Radius of the Earth in km

	const degLat = degToRadius(location.lat - userLocation.lat)
	const degLong = degToRadius(location.lng - userLocation.lng)

	const a =
		Math.sin(degLat / 2) * Math.sin(degLat / 2) +
		Math.cos(degToRadius(userLocation.lat)) *
			Math.cos(degToRadius(location.lat)) *
			Math.sin(degLong / 2) *
			Math.sin(degLong / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distance = earthRadius * c

	return distance.toFixed(1)
}

export default getDistance
