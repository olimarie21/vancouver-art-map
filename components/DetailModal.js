import { styled } from '@mui/material/styles'
import { Box, Button, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'
import { useState } from 'react'
import PlaceIcon from '@mui/icons-material/Place'

const DetailModal = (props) => {
	const { art, artistName, setShowArt } = props
	const [showDetails, setShowDetails] = useState(false)

	const closeModal = () => {
		setShowArt(false)
		setShowDetails(false)
	}

	const decodeHTML = (txt) => {
		const txtContainer = document.createElement('textarea')
		txtContainer.innerHTML = txt
		return txtContainer.value
	}

	return (
		<DetailContainer spacing={1}>
			<Pointer></Pointer>
			<IconButton
				id='closeBtn'
				color='secondary'
				aria-label='close'
				onClick={closeModal}>
				<CloseIcon />
			</IconButton>
			<Box>
				<Typography id='h2' variant='h2'>
					{art.fields.sitename}
				</Typography>
				{art.fields.locationonsite != undefined ? (
					<Typography variant='body2' id='locationDesc'>
						{art.fields.locationonsite}
					</Typography>
				) : null}
			</Box>
			<Typography variant='h4'>
				<strong>Artist(s): </strong>
				{artistName.join(', ')}
			</Typography>
			<Typography variant='h4'>
				<strong>Type: </strong>
				{art.fields.type}
			</Typography>
			<Typography variant='h4'>
				<strong>Primary Material: </strong>
				{art.fields.primarymaterial || 'Unknown'}
			</Typography>
			{showDetails ? (
				<Typography id='description' variant='body1'>
					{decodeHTML(
						art.fields.descriptionofwork != undefined
							? art.fields.descriptionofwork
							: art.fields.artistprojectstatement
					) || 'Details not found.'}
				</Typography>
			) : null}
			<Button
				color='secondary'
				id='learnMoreBtn'
				variant='contained'
				onClick={() => setShowDetails(!showDetails)}>
				{showDetails ? 'Hide details' : 'More details'}
			</Button>
		</DetailContainer>
	)
}

const Pointer = styled('div')(
	({ theme }) => `
		margin: 0;
		position: absolute;
		top: -1.8rem;
		right: 50%;
		transform: translateX(50%);
		padding: 0;
		height: 0;
		width: 0;
		border-style: solid;
		background-color: transparent;
		border-left-color: transparent;
		border-right-color: transparent;
		border-width: 0 2.5rem 2rem 2.5rem;
		border-bottom-color: ${theme.palette.primary.main};
		`
)

const DetailContainer = styled(Stack)(
	({ theme }) => `
	position: relative;
		margin: 0;
		margin-top: 2rem;
		flex-direction: column;
		padding: 2rem;
		height: fit-content;
		max-height: 60vh;
		width: 90vw;
		z-index: 1000;
		transform: translate(-50%, 1%);
    	font-family: ${theme.typography.fontFamily};
		background: ${theme.palette.primary.main};
		color: ${theme.palette.text.light};
		border-radius: 2rem;
		@media screen and (min-width: 600px) {
			max-width: 550px;
			max-height: 500px;
		}

		#closeBtn {
			position: absolute;
			top: 2%; 
			right: 2%;
			margin: 0 0 2% 2%;
		}

		#learnMoreBtn {
    		font-family: ${theme.typography.fontFamily};
			align-self: start;
			margin-top: 4%;	
		}

		#locationDesc {
			margin-top: .5%;
			margin-bottom: 2%
		}

		#h2 {
			margin-bottom: 0;
		}

		#description {
			max-height: 300px;
			overflow: auto;

			::-webkit-scrollbar {
				width: .75rem;
			}

			/* Track */
			::-webkit-scrollbar-track {
				background: ${theme.palette.text.light}; 
			}
				
			/* Handle */
			::-webkit-scrollbar-thumb {
				background: ${theme.palette.primary.light}; 

			}

			/* Handle on hover */
			::-webkit-scrollbar-thumb:hover {
				background: ${theme.palette.primary.transparency}; 
			}
		}		`
)

export default DetailModal
