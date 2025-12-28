import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Header from './components/fluent/Header';
import ContentRouter from './components/ContentRouter';

const Hero = () => (
	<section style={{
		display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
		minHeight: '60vh', paddingTop: 80
	}}>
		<h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: 16 }}>Welcome to the Accessible Learning Hub</h1>
		<p style={{ fontSize: '1.25rem', color: '#444', maxWidth: 600, textAlign: 'center' }}>
			Discover accessible, modular learning with analytics and a beautiful, inclusive design.
		</p>
	</section>
);

const App = () => (
       <>
	       <Header />
	       <main style={{ paddingTop: 80 }}>
		       <Routes>
			       <Route path="/landing" element={<LandingPage />} />
			       {/* Dynamic route for content types: /:type/:slug */}
			       <Route path=":type/:slug" element={<ContentRouter />} />
			       {/* Fallback route */}
			       <Route path="/*" element={<Hero />} />
		       </Routes>
	       </main>
       </>
);

export default App;
