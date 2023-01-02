import { styled } from '@mui/material/styles'
import { Box, Button, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'

const DetailModal = (props) => {
	const { art, artistName, closeModal } = props

	const decodeHTML = (txt) => {
		const txtContainer = document.createElement('textarea')
		txtContainer.innerHTML = txt
		return txtContainer.value
	}

	return (
		<Container>
			<IconButton
				id='closeBtn'
				color='secondary'
				aria-label='close'
				onClick={closeModal}>
				<CloseIcon />
			</IconButton>
			<Box>
				<Typography id='h2' variant='h2'>
					Site: {art.fields.sitename}
				</Typography>
				<Typography variant='body2' id='locationDesc'>
					<strong>Location on site:</strong> {art.fields.locationonsite}
				</Typography>
			</Box>
			<Typography variant='h3'>
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
			<Typography variant='body1'>
				{decodeHTML(
					art.fields.descriptionofwork != undefined
						? art.fields.descriptionofwork
						: art.fields.artistprojectstatement
				) || 'Details not found.'}
			</Typography>
			<Button
				color='secondary'
				id='learnMoreBtn'
				variant='contained'
				href={art.fields.url}>
				Learn more
			</Button>
		</Container>
	)
}

const Container = styled(Box)(
	({ theme }) => `
		margin: 0;
		padding: 3rem;
        position: fixed;
        top: 50%;
        right: 50%;
		transform: translate(50%, -50%);
		height: auto;
		max-height: 100%;
		width: auto;
		max-width: 600px;
    	font-family: ${theme.typography.fontFamily};
        z-index: 100;
		background: ${theme.palette.primary.main};
		color: ${theme.palette.text.light};
		border-radius: 2rem;

		display: flex;
		flex-direction: column;
		gap: 8px;

		#closeBtn {
			position: absolute;
			top: 4%; 
			right: 4%;
			margin: 0 0 2% 2%;
		}

		#learnMoreBtn {
    		font-family: ${theme.typography.fontFamily};
			align-self: start;
			margin-top: 2%;	
		}

		#locationDesc {
			margin-top: .5%;
			margin-bottom: 2%
		}

		#h2 {
			margin-bottom: 0;
			// padding-bottom: 0;
		}
;
`
)

export default DetailModal
