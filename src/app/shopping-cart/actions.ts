import {getCookie, hasCookie, setCookie} from "cookies-next";

export const getCookiecart = (): {[id: string]: number} => {
	if (hasCookie("cart")) {
		const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");

		return cookieCart;
	}

	return {};
};

export const addProductToCart = (id: string) => {
	const cookieCart = getCookiecart();

	if (cookieCart[id]) {
		cookieCart[id] = cookieCart[id] + 1;
	} else {
		cookieCart[id] = 1;
	}

	setCookie("cart", JSON.stringify(cookieCart));
};
