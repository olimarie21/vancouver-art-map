import { styled } from '@mui/material/styles'
import {
	Button,
	Grid,
	IconButton,
	SwipeableDrawer,
	Typography,
	Box,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'

const DetailModal = (props) => {
	const { art, setShowArt, showArt } = props
	const [showDetails, setShowDetails] = useState(false)

	console.log(art)

	useEffect(() => {
		const changeToDesktopView = () => {
			const width = window.innerWidth

			if (width > 600) {
				setShowDetails(true)
			}
		}

		changeToDesktopView()
		window.addEventListener('resize', changeToDesktopView)
	}, [])

	const decodeHTML = (txt) => {
		const txtContainer = document.createElement('textarea')
		txtContainer.innerHTML = txt
		return txtContainer.value
	}

	return (
		<Slider
			id='drawer'
			anchor='bottom'
			open={showArt}
			onClose={() => setShowArt(false)}
			onOpen={() => setShowArt(true)}
			swipeAreaWidth={20}
			disableSwipeToOpen={false}
			hideBackdrop={true}
			ModalProps={{
				keepMounted: true,
			}}>
			<DetailContainer>
				<IconButton
					id='closeBtn'
					color='secondary'
					aria-label='close'
					onClick={() => setShowArt(false)}>
					<CloseIcon />
				</IconButton>
				<Stack>
					<Typography id='h2' variant='h2'>
						{art.locationTitle}
					</Typography>
					<Typography variant='h4'>{art.type}</Typography>
				</Stack>

				{art.image != '' ? (
					<img className='popUpImg' src={art.image} alt={art.locationTitle} />
				) : null}
				{art.locationDetail != undefined ? (
					<Typography variant='body2'>{art.locationDetail}</Typography>
				) : null}

				{showDetails ? (
					<Box display={'grid'} rowGap={'.5rem'}>
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
					</Box>
				) : null}

				<Button
					color='secondary'
					id='learnMoreBtn'
					variant='contained'
					onClick={() => setShowDetails(!showDetails)}>
					{showDetails ? 'Hide details' : 'Show details'}
				</Button>
			</DetailContainer>
		</Slider>
	)
}
const Slider = styled(SwipeableDrawer)(
	`
	position: relative;
	.MuiPaper-root {
		@media screen and (min-width: 600px) {
			width: 45%;
			height: 95%;
			right: 0;
			margin-left: 55%;
		}
		
		@media screen and (min-width: 1000px) {
			width: 35%;
			margin-left: 65%;
		}

		@media screen and (min-width: 1400px) {
			width: 25%;
			height: 92%;
			right: 0;
			margin-left: 75%;
		}
	}
	`
)
const DetailContainer = styled(Box)(
	({ theme }) => `	
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: auto;

		position: relative;
		border-top: 10px solid ${theme.palette.secondary.main};
		padding: 1.5rem;
		margin-bottom: 2%;
		height: 100%;
		width: 100%;
		margin: 0;
    	font-family: ${theme.typography.fontFamily};
		background: ${theme.palette.primary.main};
		color: ${theme.palette.text.light};
		row-gap: .5rem;

		@media screen and (min-width: 600px) {
			padding-top: 20%;
			align-content: start;
		}

		@media screen and (min-width: 1200px) {
			padding-top: 14%;
			align-content: start;
		}

		.popUpImg {
			height: auto;
			max-height: 200px;
			width: 100%;
			margin-top: 4%;
			object-fit: cover;
			border-bottom: 5px solid ${theme.palette.secondary.main};

			@media screen and (min-width: 600px) {
				grid-row: 2 / 2;
				margin: 0% 0 4% 0;
				align-self: start;
			}
		}

		#closeBtn {
			position: absolute;
			top: 2%; 
			right: 2%;

			@media screen and (min-width: 600px) {
				top: 0; 
				right: 0;
				position: relative;
				grid-row: 1 / 2;
				width: .5rem;
				height: .5rem;
			    margin: 8% 4%;
    			justify-self: end;
			}
		}

		#learnMoreBtn {
    		font-family: ${theme.typography.fontFamily};
			align-self: start;
			border-radius: 0;

			@media screen and (min-width: 600px) {
				margin: 2% 0 0 0;
				display: none;
			}
		}

		#locationDesc {
			margin: 0;
		}

		#h2 {
			margin-bottom: 0;
			margin-right: 2%;
		}

		#description {
			height: fit-content;
			max-height: 180px;
			overflow-x: hidden;
			margin-bottom: 4%;

			@media screen and (min-width: 600px) {
				max-height: 250px;
			}

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
