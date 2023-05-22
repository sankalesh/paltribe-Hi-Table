import QuantityPicker from "@/components/atoms/quantityPicker";
import BottomPanel from "@/components/molecules/bottomPanel";
import { useBottomPanel } from "@/components/store/useBottomPanel";
import { ICart, useCart } from "@/components/store/useCart";
import { IDish } from "@/components/types/hiTableData";
import {memo,useCallback} from 'react'


function DishQuantityButton({
	dishData,
	isDeleteAble,
}: {
	dishData: IDish
	isDeleteAble?: boolean
}) {
	const { openBottomPanel, closeBottomPanel } = useBottomPanel()

	const cart = useCart((s) => s.cart)
	const setCart = useCart((s) => s.setCart)

	const handleQuantity = useCallback(
		(quantity) =>
			handleDishQuantity(cart, dishData, openBottomPanel, setCart, closeBottomPanel)(quantity),
		[cart, closeBottomPanel, dishData, openBottomPanel, setCart],
	)

	const handleDeleteItem = () => {
		// If dish is in the cart, update the variant

		// console.log('cart_asdfasdf asdf', cart, dishData)
		if (cart?.[dishData?.dishId]) {
			const newCart = {}

			// remove dish object
			Object.values(cart).forEach((dish) => {
				if (dish.dishId !== dishData?.dishId) {
					newCart[dish.dishId] = dish
				}
			})

			setCart(newCart)
		}

		closeBottomPanel(dishData?.dishId)
	}

	return (
		<>
			{(cart?.[dishData?.id]?.variants?.length || 0) <= 0 && !isDeleteAble ? (
				<button
					className='btn bg-white btn-sm text-[#2C62F0] border border-[#2C62F0] min-w-[6.044rem] min-h-[2.241rem] !px-6 rounded-full font-medium text-[0.969rem] normal-case '
					onClick={() => handleQuantity((cart?.[dishData?.id]?.variants?.length || 0) + 1)}
				>
					Add
				</button>
			) : (
				<QuantityPicker
					quantity={cart?.[dishData?.id]?.variants?.length || 0}
					setQuantity={handleQuantity}
					minQuantity={0}
					isDeleteAble={isDeleteAble}
					onDeleteItem={() => handleDeleteItem()}
				/>
			)}

			<BottomPanel dishData={dishData} />
		</>
	)
}

export default memo(DishQuantityButton)

export function handleDishQuantity(
	cart: object,
	dishData: IDish,
	openBottomPanel: (panelName: string) => void,
	setCart: (data: ICart) => void,
	closeBottomPanel: (panelName: string) => void,
): (newQuantity: number) => void {
	return (newQuantity: number) => {
		// Adding the dish to the cart
		if ((cart?.[dishData?.id]?.variants?.length || 0) < newQuantity) {
			// Adding the dish to the cart
			const thisDish = dishData as IDish
			if (thisDish?.portions?.length > 0 || thisDish?.extras?.[0]?.numSelections > 0) {
				openBottomPanel(dishData?.id)
			}

			// Finding dish in the cart of cart
			const portion = (dishData?.portions || []).find(
				(p: { default: boolean }) => (p?.default || false) === true,
			)

			const extra = {}
			;(dishData?.extras?.items || []).map((e) => {
				extra[e.id] = {
					...e,
					quantity: 0,
				}
			})

			// If dish is not in the cart, add it
			if (cart?.[dishData?.id] === undefined) {
				setCart({
					...cart,
					[dishData?.id]: {
						dishData: dishData,
						dishId: dishData?.id,
						variants: [
							{
								extra: {},
								portion: portion,
							},
						],
					},
				})
			} else {
				// If dish is in the cart, update the variant
				const newCart = { ...cart }
				newCart[dishData?.id].variants.push({
					extra: {},
					portion: portion,
				})

				setCart(newCart)
			}
		} else {
			// If dish is in the cart, update the variant
			if (cart?.[dishData?.id]) {
				const newCart = { ...cart }
				// if variant is empty, remove the dish
				if (newCart[dishData?.id].variants.length === 0) {
					// remove dish object
					delete newCart[dishData?.id]
				} else {
					// remove variant
					newCart[dishData?.id].variants.pop()
				}

				if (newCart[dishData?.id].variants.length === 0) {
					// remove dish object
					delete newCart[dishData?.id]
				}

				setCart(newCart)
			}

			closeBottomPanel(dishData?.id)
		}
	}
}
