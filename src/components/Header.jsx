import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const links = [
	{ name: "Home", to: "/" },
	{ name: "Products", to: "/products" },
	{ name: "Cart", to: "/cart-items" },
	// { name: "Signin", to: "/signin" },
];

const Header = () => {
	const { currentUser } = useSelector((state) => state.auth);
	return (
		<header className=' bg-indigo-600 items-center py-2 px-3 text-white shadow-md '>
			<div className=' mx-auto flex justify-between items-center'>
				<Link
					to='/'
					className='text-xl font-bold tracking-wid hover:opacity-90'
				>
					UA Store
				</Link>
				<nav className='flex items-center gap-6'>
					{links.map((link) => (
						<Link
							className='hover:opacity-90 transition duration-300'
							to={link.to}
							key={link.to}
						>
							{link.name}
						</Link>
					))}
					{currentUser ? (
						<Link to='/profile' className='flex items-center'>
							<img
								src={currentUser.sanitizedUser.avatar}
								alt='Profile'
								className='h-8 w-8 rounded-full'
							/>
						</Link>
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
