import { useCart } from '@/components/store/useCart'
import { getPrice } from '@/components/utils/helpers'
import { memo, useMemo } from 'react'

function ChoosePortions({ dishData }) {
	const { cart, setCart } = useCart()
	const portions = useMemo(() => dishData?.portions || [], [dishData])

	const editDishPortion = (portion: any) => {
		const newCart = JSON.parse(JSON.stringify(cart))

		let index = 0
		if ((newCart?.[dishData?.id]?.variants || []).length !== 0) {
			index = (newCart?.[dishData?.id]?.variants || []).length - 1
		}

		newCart[dishData?.id].variants[index].portion = portion

		setCart(newCart)
	}

	// Converting isDishPortionSelected to a useMemo function
	const isDishPortionSelected = (portion: any) => {
		const cartDishData = cart?.[dishData?.id] || {}

		if (cartDishData) {
			if ((cartDishData?.variants || []).length === 0) {
				return false
			}
			const index = (cartDishData?.variants || []).length - 1
			return JSON.stringify(cartDishData.variants[index].portion) === JSON.stringify(portion)
		} else {
			return portion?.default === true
		}
	}

	if (portions.length === 0) {
		return null
	}

	return (
		<div>
			<div className='prose'>
				<h3 className='text-base-content !text-xl'>Choose a portion</h3>
			</div>

			<div className='my-2 overflow-x-auto border rounded-lg border-[#2C62F0]'>
				<div className='px-3 py-3 prose'>
					<h4 className='text-xs font-semibold text-base-content'>Portion</h4>
				</div>

				<table className='table w-full overflow-hidden table-compact table-zebra'>
					<tbody>
						{portions.map((portion, index: number) => (
							<tr
								className='flex flex-row '
								key={`${portion?.name?.replaceAll(' ', '') || ''}${index}`}
								onClick={() => editDishPortion(portion)}
							>
								<td className=' !pl-3 !text-xs w-1/3 flex flex-row flex-wrap'>
									<span className='w-full my-auto capitalize whitespace-pre-wrap'>
										{portion?.name || ''}
									</span>
								</td>
								<td className=' !text-xs w-1/3 text-center font-semibold flex flex-row'>
									<span className='mx-auto'>{getPrice(portion?.price || 0)}</span>
								</td>
								<td className=' !text-xs  w-1/3 text-center flex flex-row '>
									<input
										type='radio'
										className='ml-auto mr-2 radio radio-[#2C62F0] radio-sm'
										onChange={() => editDishPortion(portion)}
										checked={isDishPortionSelected(portion)}
										defaultChecked={isDishPortionSelected(portion)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default memo(ChoosePortions)