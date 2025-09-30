import {ItemCard} from "@/app/shopping-cart/components/ItemCard";
import {products, type Product} from "@/products/data/products";
import {cookies} from "next/headers";
import React from "react";

interface ProductInCard {
	product: Product;
	quantity: number;
}

export const metadata = {
	title: "Carrito de compras",
	description: "SEO Title",
};

const getProductsInCart = (cart: {[id: string]: number}): ProductInCard[] => {
	const productsInCart: ProductInCard[] = [];

	for (const id of Object.keys(cart)) {
		const product = products.find((prod) => prod.id === id);

		if (product) {
			productsInCart.push({product, quantity: cart[id]});
		}
	}

	return productsInCart;
};

const CartPage = async () => {
	const cookieStore = await cookies();

	const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}") as {
		[id: string]: number;
	};

	const productsInCart = getProductsInCart(cart);

	return (
		<div>
			<h1 className="text-5xl">Productos en el carrito</h1>
			<hr className="mb-2" />

			<div className="flex flex-col sm:flex-row gap-2 w-full">
				<div className="flex flex-col gap-2 w-full sm:w-8/12">
					{productsInCart.map((product) => (
						<ItemCard
							key={product.product.id}
							{...product}
							quantity={product.quantity}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CartPage;
