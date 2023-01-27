import '@testing-library/jest-dom'
import { cleanup, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import DetailModal from '../components/DetailModal'

afterEach(cleanup)

it('loads art location details', () => {
	const fakeArtLocation = {
		address: '123 Front Street',
		artDescription: 'This is a test piece of art.',
		artists: ['Anne Smith'],
		geolocation: {
			coordinates: [-123.117143, 49.224892],
			type: 'Point',
		},
		id: 123,
		image:
			'http://res.cloudinary.com/scave2021/image/upload/v1673824055/art-map/LPhoto_Session_sculpture_19dec2006.jpg',
		locationDetail: '',
		locationTitle: '',
		primaryMaterial: '',
		type: 'Sculpture',
		userImages: [],
	}

	act(() => {
		render(<DetailModal art={fakeArtLocation} showArt={true} />)
	})
})
