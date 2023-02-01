import styled from '@emotion/styled'
import { Stack, Typography } from '@mui/material'
import { PrimaryButton, SecondaryButton } from './Buttons'
import FilterItem from './FilterItem'

const artTypes = [
	'Sculpture',
	'Mural',
	'Site-integrated work',
	'Two-dimensional artwork',
	'Media work',
	'Memorial or monument',
	'Totem pole',
	'Fountain or water feature',
	'Mosaic',
	'Relief',
	'Figurative',
	'Socially engaged art',
	'Gateway',
	'Welcome figure',
	'Other',
]

const Filter = (props) => {
	const { applyFilter, filterItem, setFilterItem } = props

	const handleChange = (event) => {
		filterItem.includes(event.target.ariaLabel)
			? setFilterItem(
					filterItem.filter((item) => item !== event.target.ariaLabel)
			  )
			: setFilterItem([...filterItem, event.target.ariaLabel])
	}

	const handleClearFilter = () => {
		applyFilter([], false)
		setFilterItem([])
	}

	return (
		<FilterContainer>
			<Typography variant='h3' mb={'.5rem'}>
				Filter Art
			</Typography>
			{artTypes.map((type) => (
				<FilterItem
					key={type}
					handleChange={handleChange}
					filterItem={filterItem}
					type={type}
				/>
			))}
			<Stack flexDirection={'row'} gap={2}>
				<PrimaryButton
					id={'filterBtn'}
					onClick={() => applyFilter(filterItem, true)}>
					Apply Filter
				</PrimaryButton>
				<SecondaryButton
					id={'clearFilterBtn'}
					onClick={() => handleClearFilter()}>
					Clear Filter
				</SecondaryButton>
			</Stack>
		</FilterContainer>
	)
}

const FilterContainer = styled(Stack)(
	({ theme }) => ` 
        position: fixed;
        right: 0;
        top: 0;
        background: ${theme.palette.primary.main};
        max-width: 75%;
		height: 100%;
        padding: 9rem 1.25rem 3rem 1.25rem;
        font-family: ${theme.typography.fontFamily};
        color: ${theme.palette.text.light};

        .MuiCheckbox-root {
            height: 1.7rem;
            color: ${theme.palette.secondary.main};
        }

        @media screen and (min-width: 400px) {
            max-width: 300px;
        }

		#filterBtn, #clearFilterBtn {
			margin-top: 4%;
		}
    `
)

export default Filter
