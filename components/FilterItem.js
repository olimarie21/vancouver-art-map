import { Checkbox, FormControlLabel } from '@mui/material'
import styled from '@emotion/styled'

const FilterItem = (props) => {
	const { type, filterItem, handleChange } = props

	return (
		<CustomFormLabel
			label={type}
			key={type}
			control={
				<Checkbox
					className='filterCheckbox'
					color={'secondary'}
					checked={filterItem.includes(type)}
					onChange={handleChange}
					inputProps={{ 'aria-label': type }}
				/>
			}></CustomFormLabel>
	)
}

const CustomFormLabel = styled(FormControlLabel)(
	({ theme }) => `
        height: 1.7rem;
        color: ${theme.palette.text.light};
       .MuiCheckbox-root {
            color: ${theme.palette.secondary.main};
        }
    `
)

export default FilterItem
