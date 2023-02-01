import Home from '../pages/index'
import '@testing-library/jest-dom'
import { cleanup, render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

afterEach(cleanup)

jest.mock('../components/Map', () => {
	return function DummyMap() {
		return <div data-testid='map'></div>
	}
})

describe('Home', () => {
	it('renders and header and a map', () => {
		act(() => {
			render(<Home />)
		})

		expect(screen.getByTestId('header')).toBeInTheDocument()
		expect(screen.getByTestId('map')).toBeInTheDocument()
	})
})
