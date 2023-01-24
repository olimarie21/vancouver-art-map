import { styled } from '@mui/material/styles'
import { Button, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'
import { useState } from 'react'
import Image from 'next/image'

const DetailModal = (props) => {
	const { art, setShowArt } = props
	const [showDetails, setShowDetails] = useState(false)

	console.log(art)

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
				onClick={() => setShowArt(false)}>
				<CloseIcon />
			</IconButton>

			<Stack sx={{ marginBottom: '2%' }}>
				<Typography id='h2' variant='h2'>
					{art.locationTitle}
				</Typography>
				<Typography variant='h4'>{art.type}</Typography>
				{art.image != '' ? (
					<img className='popUpImg' src={art.image} alt={art.locationTitle} />
				) : null}
			</Stack>
			{art.locationDetail != undefined ? (
				<Typography variant='body2'>{art.locationDetail}</Typography>
			) : null}
			{showDetails ? (
				<>
					<Typography variant='h4'>
						<strong>Artist(s): </strong>
						{art.artists.join(', ')}
					</Typography>
					<Typography variant='h4'>
						<strong>Primary Material: </strong>
						{art.primaryMaterial || 'Unknown'}
					</Typography>
					<Typography id='description' variant='body1'>
						{decodeHTML(art.artDescription)}
					</Typography>
				</>
			) : null}
			<Button
				color='secondary'
				id='learnMoreBtn'
				variant='contained'
				onClick={() => setShowDetails(!showDetails)}>
				{showDetails ? 'Hide details' : 'Show details'}
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
		margin: 2%;
		margin-top: 2rem;
		flex-direction: column;
		padding: 2rem;
		height: fit-content;
		// max-height: 80vh;
		width: 90%;
		z-index: 1000;
    	font-family: ${theme.typography.fontFamily};
		background: ${theme.palette.primary.main};
		color: ${theme.palette.text.light};
		box-shadow: 10px 10px 0px #F0C4FF;
		@media screen and (min-width: 600px) {
			width: 350px;
			max-height: 500px;
		}
		.popUpImg {
			height: auto;
			max-height: 200px;
			width: 100%;
			margin-top: 4%;
			object-fit: cover;
		}

		#closeBtn {
			position: absolute;
			top: 2%; 
			right: 2%;
		}

		#learnMoreBtn {
    		font-family: ${theme.typography.fontFamily};
			align-self: start;
			margin-top: 4%;	
			border-radius: 0;
		}

		#locationDesc {
			margin: 2% 0 0 0;
		}

		#h2 {
			margin-bottom: 0;
			margin-right: 1%;
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
