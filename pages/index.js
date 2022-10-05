import Head from 'next/head'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home() {
	const [locations, setLocations] = useState([])
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const getArt = () => {
			axios
				.get(
					'https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art&q=&rows=100&refine.status=In+place'
				)
				.then((res) => {
					console.log(res.data.records)
					setLocations(res.data.records)
					setLoaded(true)
				})
				.catch((err) => {
					console.log('err', err)
				})
		}
		getArt()
	}, [loaded])

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div>
				{locations.map((location, i) => (
					<p key={i}>{location.fields.descriptionofwork}</p>
				))}
			</div>
		</div>
	)
}
