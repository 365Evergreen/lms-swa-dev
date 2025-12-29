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
				<Route path="/landing" element={<LandingPage />} />
				{/* Dynamic route for content types: /:type/:slug */}
				<Route path=":type/:slug" element={<ContentRouter />} />
				{/* Dynamic route for WP pages: /parent/slug */}
				<Route path=":parent/:slug" element={<WPPage />} />
				{/* Fallback route */}
				<Route path="/*" element={<Hero />} />
			</Routes>
		</main>
	</>
);

export default App;
