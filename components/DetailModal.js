import { styled } from '@mui/material/styles'
import { Button, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'
import { useState } from 'react'

const DetailModal = (props) => {
	const { art, artistName, setShowArt } = props
	const [showDetails, setShowDetails] = useState(false)

	const closeModal = () => {
		setShowDetails(false)
		setShowArt(false)
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

			<Stack sx={{ marginBottom: '2%' }}>
				<Typography id='h2' variant='h2'>
					{art.fields.sitename}
				</Typography>
				<Typography variant='h4'>{art.fields.type}</Typography>
			</Stack>
			{art.fields.locationonsite != undefined ? (
				<Typography variant='body2'>{art.fields.locationonsite}</Typography>
			) : null}
			{showDetails ? (
				<>
					<Typography variant='h4'>
						<strong>Artist(s): </strong>
						{artistName.join(', ')}
					</Typography>
					<Typography variant='h4'>
						<strong>Primary Material: </strong>
						{art.fields.primarymaterial || 'Unknown'}
					</Typography>
					<Typography id='description' variant='body1'>
						{decodeHTML(
							art.fields.descriptionofwork != undefined
								? art.fields.descriptionofwork
								: art.fields.artistprojectstatement
						) || 'Details not found.'}
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
		box-shadow: 10px 10px 0px #F0C4FF;
		@media screen and (min-width: 600px) {
			max-width: 350px;
			max-height: 500px;
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
