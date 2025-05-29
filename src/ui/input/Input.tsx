import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { classNames, type Mods } from '@/core/helpers/classNames'
import styles from './Input.module.scss'

export enum InputVariant {
	DEFAULT = 'default',
	OUTLINED = 'outlined',
	UNDERLINED = 'underlined',
	FLUSH = 'flush',
	FILLED = 'filled',
}

export enum InputSize {
	SM = 'size_sm',
	MD = 'size_md',
	LG = 'size_lg',
}

export enum InputRadius {
	NONE = 'radius_none',
	SM = 'radius_sm',
	MD = 'radius_md',
	LG = 'radius_lg',
}

export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string
	description?: string
	error?: string
	withAsterisk?: boolean
	leftSection?: ReactNode
	rightSection?: ReactNode
	leftSectionPointerEvents?: 'auto' | 'none'
	rightSectionPointerEvents?: 'auto' | 'none'
	mt?: string
	mb?: string
	className?: string
	variant?: keyof typeof InputVariant
	size?: keyof typeof InputSize
	radius?: keyof typeof InputRadius
}

const InputBase = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		label,
		description,
		error,
		withAsterisk = false,
		leftSection,
		rightSection,
		leftSectionPointerEvents = 'auto',
		rightSectionPointerEvents = 'auto',
		className = '',
		mt,
		mb,
		variant = 'DEFAULT',
		size = 'MD',
		radius = 'MD',
		disabled,
		...rest
	} = props

	const wrapperMods: Mods = {
		[styles[InputSize[size]]]: true,
		[styles[InputRadius[radius]]]: true,
		[styles.disabled]: !!disabled,
	}

	const inputMods: Mods = {
		[styles[InputVariant[variant]]]: true,
		[styles[InputSize[size]]]: true,
		[styles[InputRadius[radius]]]: true,
		[styles.disabled]: !!disabled,
	}

	const wrapperStyle: React.CSSProperties = {
		marginTop: mt,
		marginBottom: mb,
	}

	return (
		<div
			className={classNames(
				styles.InputWrapper,
				{ ...wrapperMods, [styles.error]: !!error },
				[className]
			)}
			style={wrapperStyle}
		>
			{label && (
				<label className={classNames(styles.Label, wrapperMods)}>
					{label} {withAsterisk && <span className='asterisk'>*</span>}
				</label>
			)}
			{description && (
				<label className={classNames(styles.Description, wrapperMods)}>
					{description}
				</label>
			)}
			<div className={classNames(styles.InputContainer, wrapperMods)}>
				{leftSection && (
					<div
						className={classNames(styles.LeftSection, wrapperMods)}
						style={{ pointerEvents: leftSectionPointerEvents }}
					>
						{leftSection}
					</div>
				)}
				<input
					disabled={disabled}
					className={classNames(styles.Input, inputMods)}
					ref={ref}
					{...rest}
				/>
				{rightSection && (
					<div
						className={classNames(styles.RightSection, wrapperMods)}
						style={{ pointerEvents: rightSectionPointerEvents }}
					>
						{rightSection}
					</div>
				)}
			</div>
			{error && (
				<label className={classNames(styles.Error, wrapperMods)}>{error}</label>
			)}
		</div>
	)
})

InputBase.displayName = 'Input'

export const Input = Object.assign(InputBase, {
	Variant: InputVariant,
	Size: InputSize,
	Radius: InputRadius,
})
