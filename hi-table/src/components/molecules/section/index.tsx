import React, { memo } from 'react'

function Section({
	title,
	tag,
	tagClassName,
	children,
	...props
}: {
	title: string
	tag?: string
	tagClassName?: string
	children: React.ReactNode
}) {
	const CustomTag = tag ? (`${tag}` as React.ElementType) : ('h2' as React.ElementType)

	return (
		<section className='flex flex-col space-y-3' {...props}>
			<div className='px-4 prose '>
				<CustomTag className={`!font-light  ${tagClassName}`}>{title}</CustomTag>
			</div>

			<div>{children}</div>
		</section>
	)
}

export default memo(Section)