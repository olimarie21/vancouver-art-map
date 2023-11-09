import styled from '@emotion/styled'
import { Stack, Typography } from '@mui/material'
import { PrimaryButton, SecondaryButton } from './Buttons'
import FilterItem from './FilterItem'
import { AnimatePresence, motion } from 'framer-motion'

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
	const { applyFilter, filterItem, setFilterItem, showFilter } = props

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
		<AnimatePresence>
			{showFilter && (
				<FilterContainer
					initial={{ x: 200 }}
					animate={{ x: 0 }}
					exit={{ x: 200 }}>
					<Typography variant='h3' mb={'.5rem'}>
						Category Filter
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
							Apply
						</PrimaryButton>
						<SecondaryButton
							id={'clearFilterBtn'}
							onClick={() => handleClearFilter()}>
							Clear
						</SecondaryButton>
					</Stack>
				</FilterContainer>
			)}
		</AnimatePresence>
	)
}

const FilterContainer = styled(motion.div)`
	position: fixed;
	right: 0;
	top: 0;
	background: ${({ theme }) => theme.palette.primary.main};
	max-width: 75%;
	height: 100%;
	padding: 9rem 1.25rem 3rem 1.25rem;
	font-family: ${({ theme }) => theme.typography.fontFamily};
	color: ${({ theme }) => theme.palette.text.light};
	z-index: 4;
	display: flex;
	flex-direction: column;

	.MuiCheckbox-root {
		height: 1.7rem;
		color: ${({ theme }) => theme.palette.secondary.main};
	}

	@media screen and (min-width: 400px) {
		max-width: 300px;
		z-index: 0;
	}

	#filterBtn,
	#clearFilterBtn {
		margin-top: 4%;
	}
`

export default Filter
