import Head from 'next/head'
import { Box } from '@mui/material'
import Header from '../components/Header'
import Map from '../components/Map'
import { styled } from '@mui/material/styles'
import { Stack } from '@mui/system'

export default function Home() {
	return (
		<Container>
			<Head>
				<title>Vancity Public Art</title>
				<meta name='description' content='Vancouver, B.C. Public Art' />
				<link rel='icon' href='/favicon.ico' />
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<Header />
			<Map />
		</Container>
	)
}

const Container = styled(Stack)(
	`
	position: relative;
	margin: 0;
	padding: 0;
	height: 100vh;
	width: 100vw;

	
	`
)
