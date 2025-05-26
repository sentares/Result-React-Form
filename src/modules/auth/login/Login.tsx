import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { IconAt, IconEye, IconEyeOff, IconLock } from '@tabler/icons-react'
import { useRef, useState, type ChangeEvent } from 'react'
import cls from './Login.module.scss'

export interface LoginOptions {
	email: string
	password: string
}

interface LoginProps {
	onSubmit: (options: LoginOptions) => void
	onSwitch: () => void
}

function Login({ onSubmit, onSwitch }: LoginProps) {
	const formRef = useRef<HTMLFormElement>(null)

	const [inputs, setInputs] = useState<LoginOptions>({
		email: '',
		password: '',
	})

	const [errors, setErrors] = useState<Partial<LoginOptions>>({})
	const [showPassword, setShowPassword] = useState(false)

	const handleChange = (event: ChangeEvent<HTMLFormElement>) => {
		const target = event.target as HTMLElement

		if (target instanceof HTMLInputElement && target.name) {
			setInputs(prev => ({
				...prev,
				[target.name]: target.value,
			}))

			setErrors(prev => ({
				...prev,
				[target.name]: '',
			}))
		}
	}

	const validate = () => {
		const newErrors: Partial<LoginOptions> = {}

		if (!inputs.email || !/\S+@\S+\.\S+/.test(inputs.email)) {
			newErrors.email = 'Введите корректный email'
		}

		if (!inputs.password || inputs.password.length < 6) {
			newErrors.password = 'Пароль должен быть не менее 6 символов'
		}

		setErrors(newErrors)

		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!validate()) return

		formRef.current?.reset()
		onSubmit(inputs)
	}

	const handleReset = () => {
		setInputs({ email: '', password: '' })
		setErrors({})
	}

	const togglePasswordVisibility = (e: React.MouseEvent) => {
		e.preventDefault()
		setShowPassword(prev => !prev)
	}

	return (
		<div className={cls.Login}>
			<form
				className={cls.LoginForm}
				ref={formRef}
				onSubmit={handleSubmit}
				onChange={handleChange}
				onReset={handleReset}
			>
				<Input
					withAsterisk
					label='Введите почту'
					description='Обязательно заполните поле'
					name='email'
					type='email'
					leftSection={<IconAt size={16} />}
					placeholder='Введите email'
					required
					error={errors.email}
				/>

				<Input
					withAsterisk
					label='Введите пароль'
					description='Обязательно заполните поле'
					name='password'
					type={showPassword ? 'text' : 'password'}
					leftSection={<IconLock size={16} />}
					rightSection={
						showPassword ? (
							<IconEyeOff size={16} onClick={togglePasswordVisibility} />
						) : (
							<IconEye size={16} onClick={togglePasswordVisibility} />
						)
					}
					placeholder='Введите пароль'
					required
					error={errors.password}
				/>

				<Button type='submit'>Войти</Button>
			</form>

			<div className={cls.SwitchBtn}>
				<span>или</span>
				<Button type='button' variant='OUTLINE' onClick={onSwitch}>
					Зарегистрироваться
				</Button>
			</div>
		</div>
	)
}

export default Login
