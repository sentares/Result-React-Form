export interface Mods {
	[className: string]: boolean | string | undefined
}

export function classNames(
	classNames: string,
	mods: Mods = {},
	additional: string[] = []
): string {
	return [
		classNames,
		...additional.filter(Boolean),
		...Object.entries(mods)
			.filter(([_, value]) => Boolean(value))
			.map(([className]) => className),
	].join(' ')
}
