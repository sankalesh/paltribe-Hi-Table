import QuantityPickerNonOutline from '@/components/atoms/quantityPicker/quantityPickerNonOutline'
import Section from '@/components/molecules/section'
import { useCart } from '@/components/store/useCart'
import { IDish, IExtraItem } from '@/components/types/hiTableData'
import { getPrice } from '@/components/utils/helpers'

import { camelCase, isEmpty } from 'lodash-es'
import { memo, useState } from 'react'
import { MdRiceBowl } from 'react-icons/md'

interface IState {
	activeExtra: number
}

function ExtraWithDishWithSelect({ dishData }: { dishData: IDish }) {
	const [state, setState] = useState<IState>({
		activeExtra: 0,
	})

	const cartItem = useCart((s) => s.cart)
	const setCartItem = useCart((s) => s.setCart)

	const extras = dishData?.extras?.[0].items || []

	const handleQuantityChange = (newQuantity, item: IExtraItem, itemId: string) => {
		const newCart = structuredClone(cartItem)

		const index = newCart?.[dishData?.id]?.variants?.length - 1 || 0

		newCart[dishData?.id].variants[index].extra[itemId] = {
			...item,
			quantity: newQuantity,
		}

		setCartItem(newCart)
	}
	console.log('dishData', dishData)

	const getQuantity = (itemId: string) => {
		const index = cartItem?.[dishData?.id]?.variants?.length - 1 || 0
		return cartItem?.[dishData?.id]?.variants?.[index]?.extra?.[itemId]?.quantity || 0
	}

	if (isEmpty(extras)) {
		return null
	}

	return (
		<>
			{/* Toggle Extra */}
			<div className='px-2'>
				<Section title={'Extras'} tag='h5' tagClassName='font-semibold text-base-content !text-xl'>
					<div className='flex flex-row flex-wrap px-4 '>
						{dishData.extras.map((extra, index: number) => (
							<button
								className={` my-1 mr-2 btn btn-xs rounded-full bg-[#2C62F0] transition-all space-x-2 flex flex-row  ${
									state.activeExtra !== index && 'btn-outline'
								}`}
								key={`${extra?.name || ''}${index}`}
								onClick={() =>
									setState({
										...state,
										activeExtra: index,
									})
								}
							>
								<MdRiceBowl className='my-auto' />
								<span className='my-auto text-xs font-normal normal-case '>
									{extra?.name || ''}
								</span>
							</button>
						))}
					</div>
				</Section>
			</div>

			{/* Extra description */}
			<div className='mx-6 my-2 overflow-x-auto border rounded-lg border-[#2C62F0]'>
				<div className='px-3 py-3 prose'>
					<h5 className='text-xl font-medium capitalize text-base-content'>
						{dishData.extras?.[state?.activeExtra]?.name || ''}
					</h5>

					{(dishData.extras?.[state?.activeExtra]?.compulsory || 0) > 0 && (
						<span className='text-xs font-medium text-base-content/60'>
							Select at least {dishData.extras?.[state?.activeExtra]?.compulsory || 0} of the type
							of {dishData.extras?.[state?.activeExtra]?.name || ''}.
						</span>
					)}
				</div>

				<table className='table w-full table-compact table-zebra'>
					<tbody>
						{(dishData.extras?.[state?.activeExtra]?.items || []).map((item, index: number) => {
							const itemId = camelCase(item?.name + state?.activeExtra)
							return (
								<tr className='flex flex-row' key={index}>
									<td className=' !pl-3 !text-xs w-1/3 flex flex-row flex-wrap'>
										<span className='w-full my-auto capitalize whitespace-pre-wrap'>
											{item?.name || ''}
										</span>
									</td>
									<td className=' !text-xs w-1/3 text-center font-semibold flex flex-row'>
										<span className='mx-auto my-auto '>{getPrice(item?.price || 0)}</span>
									</td>
									<td className=' !text-xs w-1/3 text-center font-semibold flex flex-row'>
										<span className='pr-2 my-auto ml-auto'>
											<QuantityPickerNonOutline
												quantity={getQuantity(itemId)}
												setQuantity={(q) =>
													handleQuantityChange(q, extras?.[state?.activeExtra], itemId)
												}
												minQuantity={0}
											/>
										</span>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default memo(ExtraWithDishWithSelect)