"use client";
import {signIn, signOut, useSession} from "next-auth/react";
import React from "react";
import {CiLogout} from "react-icons/ci";
import {IoShieldOutline} from "react-icons/io5";

const LogoutButton = () => {
	const {data: session, status} = useSession();

	console.log(status);

	if (status === "loading") {
		<button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
			<IoShieldOutline />
			<span className="group-hover:text-gray-700">Cargando...</span>
		</button>;
	}

	if (status === "unauthenticated") {
		<button
			onClick={() => signIn()}
			className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
		>
			<IoShieldOutline />
			<span className="group-hover:text-gray-700">Ingresar</span>
		</button>;
	}
	console.log("no comment");
	return (
		<button
			onClick={() => signOut()}
			className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
		>
			<CiLogout />
			<span className="group-hover:text-gray-700">Logout</span>
		</button>
	);
};

export default LogoutButton;
