import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
	palette: {
		primary: {
			main: '#2d2f39',
		},
		secondary: {
			main: '#2af5ff',
		},
		error: {
			main: red.A400,
		},
	},
})

export default theme
