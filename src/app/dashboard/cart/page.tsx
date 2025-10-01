import {ItemCard} from "@/app/shopping-cart/components/ItemCard";
import WidgetItem from "@/components/WidgetItem/WidgetItem";
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

	const totalToPay = productsInCart.reduce(
		(prev, current) => current.product.price * current.quantity + prev,
		0
	);

	return (
		<div>
			<h1 className="text-5xl">Productos en el carrito</h1>
			<hr className="mb-2" />

			<div className="flex flex-col sm:flex-row gap-2 w-full">
				<div className="flex flex-col gap-2 w-full sm:w-8/12">
					{productsInCart.length > 0 ? (
						productsInCart.map((product) => (
							<ItemCard
								key={product.product.id}
								{...product}
								quantity={product.quantity}
							/>
						))
					) : (
						<p>No hay productos en el carrito</p>
					)}
				</div>
				<div className="flex flex-col gap-2 w-full sm:w-4/12">
					<WidgetItem title="Total a pagar">
						<div className="flex flex-col gap-2">
							<div className="mt-2 flex justify-center items-center gap-4 w-full">
								<h3 className="text-xl text-center">
									${(totalToPay * 1.15).toFixed(2)}
								</h3>
							</div>
							<span className="text-gray-600">
								Impuestos (15%): ${(totalToPay * 0.15).toFixed(2)}{" "}
							</span>
						</div>
					</WidgetItem>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
