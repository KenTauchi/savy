import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import * as FAIcons from "react-icons/fa";
import { ToggleMenu } from './toggle-menu';
import { IconContext } from 'react-icons';

const Header = () => {
	const [sidebar, setSidebar] = useState(false);
	const showSidebar = () => setSidebar(!sidebar);
	const [showDesktopMenu, setDesktopMenu] = useState(false);
	const [windowWidth, setWindowWidth] = useState(0);

	const updateWindowWidth = () => setWindowWidth(window.innerWidth);

	useEffect(() => {
		window.addEventListener("resize", updateWindowWidth);
		updateWindowWidth();

		if (windowWidth > 875) {
			setDesktopMenu(true);
		} else {
			setDesktopMenu(false);
		}

		// console.log(windowWidth);
		return () => window.removeEventListener("resize", updateWindowWidth);
	}, [showDesktopMenu, windowWidth]);

	return (
		<header>
			{showDesktopMenu ?
			
			<nav className='nav-menu'>
				<div className='site-logo'>
					<Link to="/"><img src='./savy_logo.png' /></Link>
				</div>
				<ul className='nav-menu-items'>
					{ToggleMenu.map((menuItem, index) => {
						return (
							<li key={index} className={menuItem.cName}>
								<NavLink exact to={menuItem.path}>{menuItem.title}</NavLink>
							</li>
						)
					})}
				</ul>
			</nav>
			: 
			<IconContext.Provider value={{color: '#fff'}}>
				<div className='navbar'>
					<Link to="#" className='hamburger-menu'>
						<FAIcons.FaBars onClick={showSidebar} />
					</Link>
				</div>
				<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
					<ul className='nav-menu-items' onClick={showSidebar}>
						<li className='navbar-toggle'>
							<Link to="#" className='hamburger-menu'><FAIcons.FaTimes /></Link>
						</li>

						{ToggleMenu.map((menuItem, index) => {
							return (
								<li key={index} className={menuItem.cName}>
									<Link to={menuItem.path}>{menuItem.title}</Link>
								</li>
							)
						})}
					</ul>
				</nav>
			</IconContext.Provider>
			}
			
		</header>
	);
};

export default Header;
