import { classNames, type Mods } from '@/core/helpers/classNames'
import { memo, type ButtonHTMLAttributes, type ReactNode } from 'react'
import styles from './Button.module.scss'

export enum ButtonVariant {
	DEFAULT = 'default',
	OUTLINE = 'outline',
	BACKGROUND = 'background',
	LIGHT = 'light',
}

export enum ButtonSize {
	M = 'size_m',
	L = 'size_l',
	XL = 'size_xl',
}

export enum ButtonRadius {
	XS = 'radius_xs',
	SM = 'radius_sm',
	MD = 'radius_md',
	LG = 'radius_lg',
	XL = 'radius_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string
	variant?: keyof typeof ButtonVariant
	square?: boolean
	radius?: keyof typeof ButtonRadius
	size?: keyof typeof ButtonSize
	disabled?: boolean
	children?: ReactNode
}

const ButtonBase = (props: ButtonProps) => {
	const {
		className = '',
		children,
		variant = 'DEFAULT',
		square = false,
		disabled = false,
		size = 'M',
		radius = 'MD',
		type = 'button',
		...otherProps
	} = props

	const mods: Mods = {
		[styles[ButtonVariant[variant]]]: true,
		[styles.square]: square,
		[styles[ButtonSize[size]]]: true,
		[styles[ButtonRadius[radius]]]: true,
		[styles.disabled]: disabled,
	}

	return (
		<button
			type={type}
			className={classNames(styles.Button, mods, [className])}
			disabled={disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
}

export const Button = Object.assign(memo(ButtonBase), {
	Variant: ButtonVariant,
	Size: ButtonSize,
	Radius: ButtonRadius,
})
