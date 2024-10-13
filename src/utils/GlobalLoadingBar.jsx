// GlobalLoadingBar.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";

const GlobalLoadingBar = () => {
	const [progress, setProgress] = useState(0);
	const location = useLocation();

	useEffect(() => {
		setProgress(30);
		const timer = setTimeout(() => {
			setProgress(100);
		}, 800);

		return () => {
			clearTimeout(timer);
		};
	}, [location]);

	return (
		<TopLoadingBar
			color='#1A237E'
			height={4}
			progress={progress}
			onLoaderFinished={() => setProgress(0)}
		/>
	);
};

export default GlobalLoadingBar;
