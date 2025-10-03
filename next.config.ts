import type {NextConfig} from "next";
import {hostname} from "os";

/*const nextConfig: NextConfig = {

	images: {
		domains: ["tailus.io"],
	},
};

export default nextConfig;
*/

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tailus.io",
				pathname: "/**",
			},
			{
				protocol: "https",

				hostname: "avatars.githubusercontent.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
