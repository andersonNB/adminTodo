import type {NextConfig} from "next";

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
		],
	},
};

export default nextConfig;
