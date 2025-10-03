"use client";
import {useSession} from "next-auth/react";
import React, {useEffect} from "react";

const ProfilePage = () => {
	const {data: session} = useSession();

	const {name, email, image} = session?.user ?? {};

	useEffect(() => {
		console.log("data desde client side");
	}, []);

	return (
		<div className="flex flex-col">
			<span className="text-2xl font-bold">ProfilePage</span>
			<ul>
				<li>{name ?? "Cargando..."}</li>
				<li>{email ?? "Cargando..."}</li>
				<li>{image ?? "Cargando..."}</li>
			</ul>
		</div>
	);
};

export default ProfilePage;
