import { memo } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'

function QuantityPickerNonOutline({
	quantity,
	setQuantity,
	minQuantity,
}: {
	quantity: number
	setQuantity: (arg1: number) => void
	minQuantity: number
}) {
	const onIncreaseQuantity = () => {
		setQuantity(quantity + 1)
	}

	const onDecreaseQuantity = () => {
		if (quantity > minQuantity) {
			setQuantity(quantity - 1)
		}
	}

	return (
		<div className='flex flex-row mx-1 my-auto '>
			{/* Decrease */}
			<div className='flex flex-col w-1/3'>
				<button
					className='btn btn-xs btn-outline btn-[#2C62F0] aspect-square !px-0 !py-0 !min-h-4 !h-6 !w-6 flex flex-col border-0  rounded-full !my-auto '
					onClick={onDecreaseQuantity}
				>
					<HiMinusSm className='p-0 m-auto stroke-2' />
				</button>
			</div>

			{/* Quantity */}
			<span className=' w-1/3 !py-0 px-2 flex flex-col text-xs font-bold my-auto mx-auto text-center text-base-content'>
				{quantity}
			</span>

			{/* Increase */}
			<div className='flex flex-col w-1/3'>
				<button
					className='btn btn-xs btn-outline btn-[#2C62F0] aspect-square !px-0 !py-0 !min-h-4 !h-6 !w-6 flex flex-col border-0  rounded-full !my-auto '
					onClick={onIncreaseQuantity}
				>
					<HiPlusSm className='stroke-2' />
				</button>
			</div>
		</div>
	)
}

export default memo(QuantityPickerNonOutline)