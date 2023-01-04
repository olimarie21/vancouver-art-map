import { styled } from '@mui/material/styles'
import { Box, Button, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'

const DetailModal = (props) => {
	const { art, artistName, setShowArt } = props
	console.log(art)

	const closeModal = () => {
		setShowArt(false)
	}

	const decodeHTML = (txt) => {
		const txtContainer = document.createElement('textarea')
		txtContainer.innerHTML = txt
		return txtContainer.value
	}

	return (
		<Container spacing={1}>
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
			<Typography id='description' variant='body1'>
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

const Container = styled(Stack)(
	({ theme }) => `
	position: relative;
		margin: 0;
		display: flex;
		flex-direction: column;
		padding: 3rem;
		height: auto;
		max-height: 100%;
		min-width: 600px;
		width: fit-content;
    	font-family: ${theme.typography.fontFamily};
        z-index: 100;
		background: ${theme.palette.primary.main};
		color: ${theme.palette.text.light};
		border-radius: 0 2rem 2rem 2rem;
		@media screen and (min-width: 600px) {
			max-height: 550px;
		}

		#closeBtn {
			position: absolute;
			top: 4%; 
			right: 4%;
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
		}


`
)

export default DetailModal
