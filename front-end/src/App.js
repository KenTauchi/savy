import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import NavRouter from './components/nav-router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCoffee)

function App() {
	return (
		<main className="App">
			<NavRouter />
		</main>
	);
}

export default App;
