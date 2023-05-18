import { camelCase, lowerCase } from 'lodash-es'
import { memo, useEffect, useState } from 'react'

export type FOOD_TYPES = 'veg' | 'nonveg' | 'vegan' | 'other'

function FoodType({ type }: { type: FOOD_TYPES }) {
	const [_type, setType] = useState('other')

	const classes = {
		veg: {
			border: 'border-green-500',
			circle: 'bg-green-500',
			text: 'text-green-500',
		},

		egg: {
			border: 'border-orange-900',
			circle: 'bg-orange-900',
			text: 'text-orange-900',
		},
		nonVeg: {
			border: 'border-red-500',
			circle: 'bg-red-500',
			text: 'text-red-500',
		},
		vegan: {
			border: 'border-yellow-500',
			circle: 'bg-yellow-500',
			text: 'text-yellow-500',
		},
		other: {
			border: 'border-gray-500',
			circle: 'bg-gray-500',
			text: 'text-gray-500',
		},
	}

	useEffect(() => {
		type && Object.keys(classes)?.includes(camelCase(type)) && setType(camelCase(type))
	}, [type])

	return (
		<div className='flex flex-row my-auto space-x-2 shrink-0'>
			<div className={'flex flex-row w-3 h-3 border-2 ' + classes[`${_type}`].border}>
				<div
					className={
						'm-auto rounded-full p-[0.125rem] w-[0.4rem] h-[0.4rem] ' + classes[`${_type}`].circle
					}
				></div>
			</div>
		</div>
	)
}

export default memo(FoodType)
