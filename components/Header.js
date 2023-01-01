import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const Header = () => {
	return (
		<Container>
			<H1 variant='h1'>Vancouver Public Art</H1>
		</Container>
	)
}

const Container = styled(Box)(
	({ theme }) => `
	margin: 0;
	padding: 0;
	height: 10rem;
    max-width: 90%;
	background: ${theme.palette.primary.main};
	display: flex;
	justify-content: start;
	align-items: center;
    font-family: ${theme.typography.fontFamily};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    border-radius: 0 0 2rem 0;
`
)

const H1 = styled(Typography)(
	({ theme }) => `
	margin: 0;
	padding: 1rem 3rem;
	color: ${theme.palette.text.light};
`
)

export default Header
