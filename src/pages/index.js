import CategoriesSection from 'components/categories'
import Footer from 'components/generals/Footer'
import Header from 'components/generals/Header'
import SectionTitle from 'components/generals/SectionTitle'
import HomeSection from 'components/home'
import Head from 'next/head'

export default function Home() {
	return (
		<>
			<Head>
				<title>E-Commerce</title>
				<meta
					name="description"
					content="E-Commerce practice Sandro Beltran's app"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<Header />
			<HomeSection></HomeSection>
			<SectionTitle>Categories</SectionTitle>
			<CategoriesSection></CategoriesSection>
			<Footer />
		</>
	)
}