import PaletteIcon from '@mui/icons-material/Palette'
import { Box } from '@mui/system'

const ArtMarker = () => {
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: 40,
				height: 40,
				color: 'primary.main',
				borderRadius: 100,
				bgcolor: 'secondary.main',
				boxShadow: 2,
			}}>
			<PaletteIcon />
		</Box>
	)
}

export default ArtMarker
