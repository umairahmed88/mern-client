import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	server: {
		proxy: {
			"/api": {
				target: "https://mern-api-ua.vercel.app/",
				changeOrigin: true,
				secure: true,
			},
		},
	},
	plugins: [react()],
});
