import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	root: {},
	typography: {
		fontFamily: ['Montserrat', 'sans-serif'],
	},
	palette: {
		primary: {
			main: '#143D4E',
			light: '#CBCBCB',
			transparency: '#22222250',
		},
		secondary: {
			main: '#F0C3FF',
		},
		text: {
			light: '#ffffff',
			dark: '#222222',
		},
		error: {
			main: '#c62a2a',
		},
	},
})

theme.typography.h1 = {
	fontWeight: '800',
	fontSize: '1.75rem',
	'@media (min-width:600px)': {
		fontSize: '2rem',
	},
}

theme.typography.h2 = {
	fontSize: '1.2rem',
	fontWeight: '700',
	'@media (min-width:600px)': {
		fontSize: '1.4rem',
	},
}

theme.typography.h3 = {
	fontSize: '1.0rem',
	fontWeight: '600',
	'@media (min-width:600px)': {
		fontSize: '1.2rem',
	},
}

theme.typography.h4 = {
	fontSize: '.85rem',
	fontWeight: '600',
}

theme.typography.body1 = {
	fontSize: '.85rem',
	fontWeight: '400',
}

theme.typography.body2 = {
	fontSize: '.75rem',
	fontWeight: '400',
	fontStyle: 'italic',
}

theme.typography.button = {
	fontSize: '.85rem',
	fontWeight: '600',
}

export default theme
