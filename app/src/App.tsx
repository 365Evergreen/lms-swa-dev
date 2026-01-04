import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Header from './components/fluent/Header';
import ContentRouter from './components/ContentRouter';
import WPPage from './components/WPPage';


const Hero = () => (
  <section className="heroSection">
    <h1 className="heroTitle">
      Welcome to the Accessible Learning Hub
    </h1>
    <p className="heroSubtitle">
      Discover accessible, modular learning with analytics and a beautiful, inclusive design.
    </p>
  </section>
);

const App = () => (
	<>
		<Header />
		<main className="mainContentWithHeader">
			<Routes>
				<Route path="/" element={<Hero />} />
				<Route path="/landing" element={<LandingPage />} />
				{/* Collection pages (Topics, Courses, Pathways, Resources) */}
				<Route path=":type" element={<ContentRouter />} />
				{/* Dynamic route for content items: /:type/:slug */}
				<Route path=":type/:slug" element={<ContentRouter />} />
				{/* Dynamic route for WP pages: /parent/slug */}
				<Route path=":parent/:slug" element={<WPPage />} />
			</Routes>
		</main>
	</>
);

export default App;
