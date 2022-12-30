import Head from 'next/head'
import { Box } from '@mui/material'
import MapWrapper from '../components/MapWrapper'
import Header from '../components/Header'

export default function Home() {
	return (
		<Box
			sx={{
				position: 'relative',
				margin: 0,
				padding: 0,
				height: '100vh',
				width: '100vw',
			}}>
			<Head>
				<title>Vancity Public Art</title>
				<meta name='description' content='Vancouver, B.C. Public Art' />
				<link rel='icon' href='/favicon.ico' />
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<Header />
			<MapWrapper />
		</Box>
	)
}
