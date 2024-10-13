import { useState, useEffect } from "react";
import TopLoadingBar from "react-top-loading-bar";

const GlobalLoadingBar = ({ isLoading }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		if (isLoading) {
			setProgress(30);
			setTimeout(() => {
				setProgress(100);
			}, 800);
		}
	}, [isLoading]);

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




