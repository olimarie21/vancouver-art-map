import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const Header = () => {
	return (
		<>
			<Wrapper data-testid='header'>
				<Container>
					<H1 variant='h1'>Vancouver Public Art</H1>
				</Container>
			</Wrapper>
			<Accent id='headerAccent'></Accent>
		</>
	)
}

const Wrapper = styled('div')(
	({ theme }) => `
		// filter: drop-shadow(0px 10px 0px ${theme.palette.secondary.main});
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		@media screen and (min-width: 600px) {
			z-index: 100000;
		}
		`
)
const Accent = styled('div')(
	({ theme }) => `
		height: 8rem;
		background: ${theme.palette.secondary.main};
		width: 100%;
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 78%);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9;
		
		@media screen and (min-width: 600px) {
			z-index: 10000;
		}
	`
)

const Container = styled(Box)(
	({ theme }) => `
	margin: 0;
	padding: 0;
	height: 8rem;
	width: 100vw;
    max-width: 100vw;
	background: ${theme.palette.primary.main};
	display: flex;
	justify-content: start;
	align-items: start;
    font-family: ${theme.typography.fontFamily};
	overflow: hidden;
	clip-path: polygon(0 0, 100% 0%, 100% 75%, 0 100%);
`
)

const H1 = styled(Typography)(
	({ theme }) => `
	margin: 0;
	margin: 1rem 3rem;
	width: 80%;
	color: ${theme.palette.text.light};
	@media screen and (min-width: 600px) {
		margin: 2.5rem 3rem;
	}
`
)

export default Header
