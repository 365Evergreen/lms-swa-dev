import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Header from './components/fluent/Header';
import ContentRouter from './components/ContentRouter';
import WPPage from './components/WPPage';
import Accordion from './components/fluent/Accordion';
import FeaturesSection from './components/FeaturesSection';
import ContactForm from './components/ContactForm';


const Hero = () => (
  <section className="heroSection">
    <h1 className="heroTitle">
      HiRed Learning
    </h1>
    <p className="heroSubtitle">
      Secure, cost-effective LMS that fits seamlessly into your Microsoft environment—customisable, scalable, and future-ready
    </p>
  </section>
);

const App = () => (
	<>
		<Header />
		<main className="mainContentWithHeader">
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Hero />
							<FeaturesSection />
							<section className="homeAccordion">
								<Accordion />
							</section>
							<section className="contactWrapper">
								<ContactForm />
							</section>
						</>
					}
				/>
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
