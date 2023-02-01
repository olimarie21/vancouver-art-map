import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import FilterItem from '../components/FilterItem'
import MockTheme from './utils/provideTheme'

afterEach(cleanup)

it('becomes checked when selected', () => {
	const type = ['Mosaic']
	const filterItem = ['Mosaic']
	const handleChange = jest.fn()

	const { getByLabelText } = render(
		<MockTheme>
			<FilterItem
				type={type}
				filterItem={filterItem}
				handleChange={handleChange}
			/>
		</MockTheme>
	)

	const checkbox = getByLabelText(type)

	expect(checkbox).toBeTruthy()
	fireEvent.click(checkbox)
	expect(checkbox).not.toBe(true)
})
