import { styled } from '@mui/material/styles'
import { IconButton, SwipeableDrawer, Typography, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import RoomIcon from '@mui/icons-material/Room'
import Image from 'next/image'
import { PrimaryButton } from './Buttons'
import decodeHTML from '../utils/decodeHTML'
import getDistance from '../utils/calculateDistance'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'

const DetailModal = (props) => {
	const { art, setShowArt, showArt, userLocation } = props
	const [showDetails, setShowDetails] = useState(false)
	const [locationTip, setShowLocationTip] = useState(false)

	const artLocation = {
		lat: art.geolocation.coordinates[1],
		lng: art.geolocation.coordinates[0],
	}

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
			<Accent />
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
					{userLocation && (
						<Stack flexDirection={'row'} gap={'1%'} alignItems={'center'}>
							{art.locationDetail != undefined && (
								<IconButton
									id='infoBtn'
									color='secondary'
									aria-label='location info'
									onClick={() => setShowLocationTip(!locationTip)}>
									<InfoRoundedIcon />
								</IconButton>
							)}
							<Typography variant='body2'>
								{getDistance(userLocation, artLocation)} km to location
							</Typography>
						</Stack>
					)}
				</Stack>
				{art.locationDetail != undefined && locationTip ? (
					<LocationDetailContainer>
						<RoomIcon className='icon' />
						<Typography variant='body2'>{art.locationDetail}</Typography>
					</LocationDetailContainer>
				) : null}
				<Typography variant='h4'>{art.type}</Typography>

				{art.image != '' ? (
					<PopUpImg>
						<Image
							className='popUpImg'
							src={art.image}
							layout={'responsive'}
							alt={art.locationTitle}
							height={100}
							width={'100%'}
						/>
					</PopUpImg>
				) : null}
				{showDetails ? (
					<>
						<Box display={'grid'} rowGap={'.35rem'}>
							<Typography variant='body1'>
								<strong>
									{art.artists.length > 1 ? 'Artists: ' : 'Artist: '}
								</strong>
								{art.artists.join(', ')}
							</Typography>

							<Typography variant='body1'>
								<strong>Primary Material: </strong>
								{art.primaryMaterial || 'Unknown'}
							</Typography>

							<Typography id='description' variant='body1'>
								{decodeHTML(art.artDescription)}
							</Typography>
						</Box>
					</>
				) : null}

				<PrimaryButton
					id='learnMoreBtn'
					onClick={() => setShowDetails(!showDetails)}>
					{showDetails ? 'Hide details' : 'Show details'}
				</PrimaryButton>
			</DetailContainer>
		</Slider>
	)
}
const Slider = styled(SwipeableDrawer)(
	`
	position: relative;
	.MuiPaper-root {
		background: transparent;
		max-height: 100%;
		@media screen and (min-width: 600px) {
			width: 45%;
			height: 100%;
			right: 0;
			margin-left: 55%;
		}
		
		@media screen and (min-width: 1000px) {
			width: 35%;
			margin-left: 65%;
		}

		@media screen and (min-width: 1400px) {
			width: 25%;
			height: 100%;
			right: 0;
			margin-left: 75%;
		}
	}
	`
)

const Accent = styled('div')(
	({ theme }) => `
		height: 7rem;
		background: ${theme.palette.secondary.main};
		width: 100%;
		clip-path: polygon(0 0, 100% 10%, 100% 100%, 0% 100%);
		position: fixed;
		
		@media screen and (min-width: 600px) {
			display: none;
		}
	`
)

const LocationDetailContainer = styled(Stack)(
	({ theme }) => `
	flex-direction: row;
	border: 1.5px solid ${theme.palette.secondary.main};
	padding: .35rem;
	`
)
const PopUpImg = styled(Box)(
	({ theme }) => `
		position: relative;
		height: 10rem;
		width: 100%;
		max-height: 200px;
		max-width: 100%;
		border-bottom: 1.5px solid ${theme.palette.secondary.main};
		overflow: hidden;

		@media screen and (min-width: 600px) {
			grid-row: 2 / 2;
			margin: 0% 0 4% 0;
			align-self: start;
		}`
)

const DetailContainer = styled(Box)(
	({ theme }) => `	
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: auto;
		clip-path: polygon(0 7%, 100% 0, 100% 100%, 0% 100%);
		position: relative;
		padding: 3rem 1.5rem 1rem 1.5rem;
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
			clip-path: none;
		}

		@media screen and (min-width: 1200px) {
			padding-top: 14%;
			align-content: start;
		}

		.icon {
			font-size: 1rem;
		}

		#closeBtn {
			position: absolute;
			top: 4%; 
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

		#infoBtn {
			margin: 0;
			padding: 0;

			svg {
				font-size: 20px;
			}
		}
		#learnMoreBtn {
			align-self: start;
			margin: 0;

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
			margin-right: 10%;
		}

		#description {
			height: fit-content;
			max-height: 180px;
			overflow-x: hidden;
			margin-bottom: 4%;

			@media screen and (min-width: 600px) {
				max-height: 14rem;
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
