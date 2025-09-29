"use client";
import {useRouter} from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			Page principal
			<button
				className="rounded bg-gradient-to-r  from-gray-600 to-gray-400  p-2 hover: cursor-pointer"
				onClick={() => router.push("/dashboard")}
			>
				Go to dashboard
			</button>
		</div>
	);
}
