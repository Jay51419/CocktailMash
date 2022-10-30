import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {MantineProvider} from '@mantine/core';
import Head from 'next/head';
import Navbar from '../components/navbar/Navbar';
import Scroller from "../components/scroller/scroller";


function MyApp({Component, pageProps}: AppProps) {

    return (
        <>
            <Head>
                <title>Cocktail Mash</title>
                <meta name="description" content="Mash it up"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: 'dark',
                    fontFamily: "Irish Grover"
                }}
            >
                <Navbar/>
                <Scroller>
                    <Component  {...pageProps} />
                </Scroller>

            </MantineProvider>
        </>
    )

}

export default MyApp
