import React from 'react';
import NavRouter from './components/nav-router';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

function App() {
	return (
		<main className="App">
			<Header />
			<NavRouter />
			<Footer />
		</main>
	);
}

export default App;
