import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import Search from "./Search";

const userLinks = [
	{ name: "Cart", to: "/cart-items" },
	{ name: "Orders", to: "/orders" },
];

const adminLinks = [
	{ name: "Products", to: "/products" },
	{ name: "Orders", to: "/orders" },
];

const Header = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const [menuOpen, setMenuOpen] = useState(false);

	// Toggle menu function
	const toggleMenu = () => setMenuOpen(!menuOpen);

	return (
		<header className='bg-indigo-600 py-2 px-3 text-white shadow-md'>
			<div className='mx-auto flex justify-between items-center'>
				<NavLink
					to='/'
					className='text-xl font-bold tracking-wide hover:bg-indigo-500 p-1 rounded-lg'
				>
					UA Store
				</NavLink>

				<Search />

				<div className='lg:hidden'>
					{menuOpen ? (
						<MdClose onClick={toggleMenu} className='h-6 w-6 cursor-pointer' />
					) : (
						<MdMenu onClick={toggleMenu} className='h-6 w-6 cursor-pointer' />
					)}
				</div>

				<nav className='hidden lg:flex items-center gap-6'>
					<NavLink
						to='/'
						className={({ isActive }) =>
							`transition duration-200 rounded-lg p-1 ${
								isActive ? "bg-indigo-700" : " hover:bg-indigo-500"
							}`
						}
					>
						Home
					</NavLink>
					{currentUser ? (
						<>
							{currentUser.sanitizedUser.role === "user"
								? userLinks.map((link) => (
										<NavLink
											to={link.to}
											key={link.to}
											className={({ isActive }) =>
												`transition duration-200 rounded-lg p-1 ${
													isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
												}`
											}
										>
											{link.name}
										</NavLink>
								  ))
								: adminLinks.map((link) => (
										<NavLink
											to={link.to}
											key={link.to}
											className={({ isActive }) =>
												`transition duration-200 rounded-lg p-1 ${
													isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
												}`
											}
										>
											{link.name}
										</NavLink>
								  ))}
							<NavLink to='/profile' className='flex items-center'>
								<img
									src={currentUser.sanitizedUser.avatar}
									alt='Profile'
									className='h-8 w-8 rounded-full'
								/>
							</NavLink>
						</>
					) : (
						<NavLink
							to='/signin'
							className='transition duration-200 rounded-lg hover:bg-indigo-500 p-1'
						>
							Sign In
						</NavLink>
					)}
				</nav>
			</div>

			{menuOpen && (
				<nav className='lg:hidden flex flex-col gap-4 mt-3'>
					<NavLink
						to='/'
						onClick={toggleMenu}
						className={({ isActive }) =>
							`transition duration-200 rounded-lg p-1 ${
								isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
							}`
						}
					>
						Home
					</NavLink>
					{currentUser ? (
						<>
							{currentUser.sanitizedUser.role === "user"
								? userLinks.map((link) => (
										<NavLink
											to={link.to}
											key={link.to}
											onClick={toggleMenu}
											className={({ isActive }) =>
												`transition duration-200 rounded-lg p-1 ${
													isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
												}`
											}
										>
											{link.name}
										</NavLink>
								  ))
								: adminLinks.map((link) => (
										<NavLink
											to={link.to}
											key={link.to}
											onClick={toggleMenu}
											className={({ isActive }) =>
												`transition duration-200 rounded-lg p-1 ${
													isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
												}`
											}
										>
											{link.name}
										</NavLink>
								  ))}
							<NavLink
								to='/profile'
								onClick={toggleMenu}
								className='flex items-center p-1 rounded-lg hover:bg-indigo-500'
							>
								<img
									src={currentUser.sanitizedUser.avatar}
									alt='Profile'
									className='h-8 w-8 rounded-full'
								/>
							</NavLink>
						</>
					) : (
						<NavLink
							to='/signin'
							onClick={toggleMenu}
							className='transition duration-200 rounded-lg hover:bg-indigo-500 p-1'
						>
							Sign In
						</NavLink>
					)}
				</nav>
			)}
		</header>
	);
};

export default Header;

// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import Search from "./Search";

// const userLinks = [
// 	{ name: "Cart", to: "/cart-items" },
// 	{ name: "Orders", to: "/orders" },
// ];

// const adminLinks = [
// 	{ name: "Products", to: "/products" },
// 	{ name: "Orders", to: "/orders" },
// ];

// const Header = () => {
// 	const { currentUser } = useSelector((state) => state.auth);

// 	return (
// 		<header className='bg-indigo-600 items-center py-2 px-3 text-white shadow-md'>
// 			<div className='mx-auto flex justify-between items-center'>
// 				<NavLink
// 					to='/'
// 					className='text-xl font-bold tracking-wide hover:bg-indigo-500 p-1 rounded-lg'
// 				>
// 					UA Store
// 				</NavLink>

// 				<Search />

// 				<nav className='flex items-center gap-6'>
// 					<NavLink
// 						to='/'
// 						className={({ isActive }) =>
// 							`transition duration-200 rounded-lg p-1 ${
// 								isActive ? "bg-indigo-700" : " hover:bg-indigo-500"
// 							}`
// 						}
// 					>
// 						Home
// 					</NavLink>
// 					{currentUser ? (
// 						<>
// 							{currentUser.sanitizedUser.role === "user"
// 								? userLinks.map((link) => (
// 										<NavLink
// 											to={link.to}
// 											key={link.to}
// 											className={({ isActive }) =>
// 												`transition duration-200 rounded-lg p-1 ${
// 													isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
// 												}`
// 											}
// 										>
// 											{link.name}
// 										</NavLink>
// 								  ))
// 								: adminLinks.map((link) => (
// 										<NavLink
// 											to={link.to}
// 											key={link.to}
// 											className={({ isActive }) =>
// 												`transition duration-200 rounded-lg p-1 ${
// 													isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
// 												}`
// 											}
// 										>
// 											{link.name}
// 										</NavLink>
// 								  ))}
// 							<NavLink to='/profile' className='flex items-center'>
// 								<img
// 									src={currentUser.sanitizedUser.avatar}
// 									alt='Profile'
// 									className='h-8 w-8 rounded-full'
// 								/>
// 							</NavLink>
// 						</>
// 					) : (
// 						<NavLink
// 							to='/signin'
// 							className='transition duration-200 rounded-lg hover:bg-indigo-500 p-1'
// 						>
// 							Sign In
// 						</NavLink>
// 					)}
// 				</nav>
// 			</div>
// 		</header>
// 	);
// };

// export default Header;
