import Section from '@/components/molecules/section'
import { useAllBusiness } from '@/components/store/useAllBusiness'
import { getPrice } from '@/components/utils/helpers'
import { useRouter } from 'next/router'
import { memo, useState } from 'react'

interface IState {
	activeExtra: number
}

function ExtraWithDish() {
	const router = useRouter()
	const { dishId } = router.query as { businessId: string; dishId: string }
	const [state, setState] = useState<IState>({
		activeExtra: 0,
	})

	const { data } = useAllBusiness()

	const dishData = ((data?.cart || []) as any[]).find((dish) => dish.id === dishId)
	const extras = dishData?.extras || []

	if (extras.length === 0 && (extras?.[state.activeExtra]?.items || []).length === 0) {
		return null
	}

	return (
		<>
			{/* Toggle Extra */}
			<div className='px-2'>
				<Section title={'Extras'} tag='h5' tagClassName='font-semibold text-base-content'>
					<div className='flex flex-row flex-wrap px-4 '>
						{extras.map(
							(
								extra: {
									name: string
								},
								index: number,
							) => (
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
									<span className='my-auto text-xs font-normal normal-case '>
										{extra?.name || ''}
									</span>
								</button>
							),
						)}
					</div>
				</Section>
			</div>

			{/* Extra description */}
			<div className='mx-6 my-2 overflow-x-auto border rounded-lg border-[#2C62F0]'>
				<div className='px-3 py-3 prose'>
					<h5 className='text-xs font-semibold capitalize text-base-content'>
						{extras?.[state?.activeExtra]?.name || ''}
					</h5>

					{(extras?.[state?.activeExtra]?.compulsory || 0) > 0 && (
						<h6 className='text-2xs text-base-content'>
							Select at least {extras?.[state?.activeExtra]?.compulsory || 0} of the type of{' '}
							{extras?.[state?.activeExtra]?.name || ''}.
						</h6>
					)}
				</div>

				<table className='table w-full overflow-hidden table-compact table-zebra'>
					<tbody>
						{(extras?.[state?.activeExtra]?.items || []).map(
							(
								item: {
									name: string
									price: number
								},
								index: number,
							) => (
								<tr className='flex flex-row' key={`${item}${index}`}>
									<td className='break-words !pl-3 !text-xs w-1/2 flex flex-row'>
										<span className='my-auto capitalize'>{item?.name || ''}</span>
									</td>
									<td className=' !text-xs w-1/2 text-center font-semibold flex flex-row'>
										<span className='pr-2 my-auto ml-auto'>{getPrice(item?.price || 0)}</span>
									</td>
								</tr>
							),
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default memo(ExtraWithDish)