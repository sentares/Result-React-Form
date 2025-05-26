export const isRequired = (value: string) => {
	if (!value.trim()) return 'Поле обязательно для заполнения'
	return ''
}

export const isEmail = (value: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	if (!emailRegex.test(value)) return 'Некорректный email'
	return ''
}

export const minLength = (value: string, length: number) => {
	if (value.length < length) return `Минимум ${length} символов`
	return ''
}

export const isMatch = (value: string, compareTo: string) => {
	if (value !== compareTo) return 'Пароли не совпадают'
	return ''
}

export const isUsername = (value: string) => {
	const usernameRegex = /^[a-zA-Z0-9_]{3,}$/
	if (!usernameRegex.test(value))
		return 'Ник может содержать буквы, цифры и "_" (от 3 символов)'
	return ''
}
