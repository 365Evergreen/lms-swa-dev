import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/landing" element={<LandingPage />} />
			<Route path="/*" element={<div>Hello LMS SWA App</div>} />
		</Routes>
	</BrowserRouter>
);

export default App;
