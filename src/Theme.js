import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	typography: {
		fontFamily: ['Montserrat', 'sans-serif'],
	},
	palette: {
		primary: {
			main: '#1c0028',
			light: '#c2b2d6',
		},
		secondary: {
			main: '#c2b2d6',
		},
		text: {
			light: '#e1d6e5',
			dark: '#1c0028',
		},
		error: {
			main: '#c62a2a',
		},
	},
})

export default theme
