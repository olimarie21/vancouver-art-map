import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Stack } from '@mui/system'

const Footer = () => {
	return (
		<>
			<Accent />
			<Container>
				<Typography className='footerContent' variant='body1'>
					&copy; Olivia Underdah, 2023
				</Typography>
			</Container>
		</>
	)
}

const Container = styled(Stack)(
	({ theme }) => `
        flex-direction: row;
        background: ${theme.palette.primary.main};
        color: ${theme.palette.text.light};
        font-family: ${theme.typography.fontFamily};
      	clip-path: polygon(0 14%, 100% 0, 100% 100%, 0% 100%);
        position: relative;
        justify-content: end;
        z-index: 2;
        
        .footerContent {
            padding: 1rem 3rem;
            font-size: 10px;
        }

    `
)

const Accent = styled('div')(
	({ theme }) => `
		height: 3rem;
		background: ${theme.palette.secondary.main};
		width: 100%;
		clip-path: polygon(0 0, 100% 7%, 100% 100%, 0% 100%);
		position: fixed;
        bottom: 0;
	`
)
export default Footer
