import { styled } from '@mui/material/styles'
import { IconButton, SwipeableDrawer, Typography, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'
import RoomIcon from '@mui/icons-material/Room'
import Image from 'next/image'
import { PrimaryButton } from './Buttons'

const DetailModal = (props) => {
	const { art, setShowArt, showArt } = props
	const [showDetails, setShowDetails] = useState(false)

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
					<Typography variant='h4'>{art.type}</Typography>
				</Stack>

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
						{art.locationDetail != undefined ? (
							<Stack flexDirection={'row'}>
								<RoomIcon className='icon' />
								<Typography variant='body2'>{art.locationDetail}</Typography>
							</Stack>
						) : null}
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

const PopUpImg = styled(Box)(
	({ theme }) => `
		position: relative;
		height: 10rem;
		width: 100%;
		max-height: 200px;
		max-width: 100%;
		margin-top: 4%;
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
		padding: 3rem 1.5rem 1.5rem 1.5rem;
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

		#learnMoreBtn {
			align-self: start;

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
