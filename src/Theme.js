import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	root: {},
	typography: {
		fontFamily: ['Montserrat', 'sans-serif'],
	},
	palette: {
		primary: {
			main: '#1c0028',
			light: '#c2b2d6',
			transparency: '#1c002850',
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

theme.typography.h1 = {
	fontSize: '2.25rem',
}

theme.typography.h2 = {
	fontSize: '1.5rem',
	fontWeight: '800',
}

theme.typography.h3 = {
	fontSize: '1.25rem',
	fontWeight: '600',
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
	fontSize: '.85rem',
	fontWeight: '400',
}

theme.typography.button = {
	fontSize: '.95rem',
	fontWeight: '600',
}
export default theme
