// Header.js
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

	return (
		<header className='bg-indigo-600 items-center py-2 px-3 text-white shadow-md'>
			<div className='mx-auto flex justify-between items-center'>
				<Link
					to='/'
					className='text-xl font-bold tracking-wide hover:opacity-90'
				>
					UA Store
				</Link>

				{/* Search Component */}
				<Search />

				<nav className='flex items-center gap-6'>
					<Link className='hover:opacity-90 transition duration-300' to={"/"}>
						Home
					</Link>
					{currentUser ? (
						<>
							{currentUser.sanitizedUser.role === "user"
								? userLinks.map((link) => (
										<Link
											className='hover:opacity-90 transition duration-300'
											to={link.to}
											key={link.to}
										>
											{link.name}
										</Link>
								  ))
								: adminLinks.map((link) => (
										<Link
											className='hover:opacity-90 transition duration-300'
											to={link.to}
											key={link.to}
										>
											{link.name}
										</Link>
								  ))}
							<Link to='/profile' className='flex items-center'>
								<img
									src={currentUser.sanitizedUser.avatar}
									alt='Profile'
									className='h-8 w-8 rounded-full'
								/>
							</Link>
						</>
					) : (
						<Link
							to='/signin'
							className='rounded-lg transition duration-300 hover:opacity-90'
						>
							Sign In
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;

// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";

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
// 		<header className='bg-indigo-600 items-center py-2 px-3 text-white shadow-md '>
// 			<div className='mx-auto flex justify-between items-center'>
// 				<Link
// 					to='/'
// 					className='text-xl font-bold tracking-wid hover:opacity-90'
// 				>
// 					UA Store
// 				</Link>
// 				<nav className='flex items-center gap-6'>
// 					<Link className='hover:opacity-90 transition duration-300' to={"/"}>
// 						Home
// 					</Link>
// 					{currentUser ? (
// 						<>
// 							{currentUser.sanitizedUser.role === "user"
// 								? userLinks.map((link) => (
// 										<Link
// 											className='hover:opacity-90 transition duration-300'
// 											to={link.to}
// 											key={link.to}
// 										>
// 											{link.name}
// 										</Link>
// 								  ))
// 								: adminLinks.map((link) => (
// 										<Link
// 											className='hover:opacity-90 transition duration-300'
// 											to={link.to}
// 											key={link.to}
// 										>
// 											{link.name}
// 										</Link>
// 								  ))}

// 							{/* Profile link */}
// 							<Link to='/profile' className='flex items-center'>
// 								<img
// 									src={currentUser.sanitizedUser.avatar}
// 									alt='Profile'
// 									className='h-8 w-8 rounded-full'
// 								/>
// 							</Link>
// 						</>
// 					) : (
// 						<Link
// 							to='/signin'
// 							className='rounded-lg transition duration-300 hover:opacity-90'
// 						>
// 							Sign In
// 						</Link>
// 					)}
// 				</nav>
// 			</div>
// 		</header>
// 	);
// };

// export default Header;
