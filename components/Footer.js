import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Stack } from '@mui/system'

const Footer = () => {
	return (
		<>
			<Accent />
			<Container data-testid='footer'>
				<Typography className='footerContent' variant='body1'>
					<StyledATag
						target='_blank'
						rel='noreferrer'
						className='link'
						href={'https://oliviaunderdah.com/'}>
						&copy; Olivia Underdah, 2023
					</StyledATag>
				</Typography>
			</Container>
		</>
	)
}

const StyledATag = styled('a')(
	({ theme }) => `
	text-decoration: none;
	color: ${theme.palette.text.light};

	&:hover {
		color: ${theme.palette.secondary.main};
	}
	`
)
const Container = styled(Stack)(
	({ theme }) => `
        flex-direction: row;
        background: ${theme.palette.primary.main};
        color: ${theme.palette.text.light};
        font-family: ${theme.typography.fontFamily};
      	clip-path: polygon(0 14%, 100% 0, 100% 100%, 0% 100%);
        justify-content: end;
        z-index: 1;
		height: 5%;
		align-items: center;
		position: fixed;
		bottom: 0;
		right: 0;
		width: 100%;
        
        .footerContent {
            padding: 0 3rem;
            font-size: .6rem;
        }

		@media screen and (min-width: 600px) {
			z-index: 3000;
		}
    `
)

const Accent = styled('div')(
	({ theme }) => `
		height: 5%;
		background: ${theme.palette.secondary.main};
		width: 100%;
		clip-path: polygon(0 0, 100% 7%, 100% 100%, 0% 100%);
		position: fixed;
        bottom: 0;
	`
)
export default Footer
