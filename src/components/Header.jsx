import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const links = [
	{ name: "Home", to: "/" },
	{ name: "Products", to: "/products" },
	{ name: "CreateProduct", to: "/create-product" },
	// { name: "Signin", to: "/signin" },
];

const Header = () => {
	const { currentUser } = useSelector((state) => state.auth);
	return (
		<div className=' bg-zinc-500 items-center p-2 text-white flex justify-between'>
			<Link to='/'>UA</Link>
			<div className='flex justify-between gap-3'>
				{links.map((link) => (
					<Link className=' ' to={link.to} key={link.to}>
						{link.name}
					</Link>
				))}
				{currentUser ? (
					<Link to={"/profile"}>
						<img
							src={currentUser.sanitizedUser.avatar}
							className='h-7 w-7 rounded-full'
						/>
					</Link>
				) : (
					<Link to={"/signin"}>Signin</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
