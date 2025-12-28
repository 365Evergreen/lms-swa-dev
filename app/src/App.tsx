import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';

const App = () => (
	<Routes>
		<Route path="/landing" element={<LandingPage />} />
		<Route path="/*" element={<div>Hello LMS SWA App</div>} />
	</Routes>
);

export default App;
