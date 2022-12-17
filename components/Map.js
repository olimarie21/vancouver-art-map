import React, { useEffect, useRef } from 'react'

function Map({ center, zoom, style, children }) {
	const ref = useRef()
	//   const [map, setMap] = useState(<google.maps.Map>);

	useEffect(() => {
		new window.google.maps.Map(ref.current, {
			center,
			zoom,
			style,
		})
	})

	return (
		<>
			<div ref={ref} id='map' style={style} />
			{React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					// set the map prop on the child component
					return React.cloneElement(child, { map })
				}
			})}
		</>
	)
}

export default Map
