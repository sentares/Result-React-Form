import { useRef, useState, type ChangeEvent } from 'react'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import cls from './Register.module.scss'
import { IconAt, IconEye, IconEyeOff, IconLock } from '@tabler/icons-react'

interface RegisterOptions {
	name: string
	nickname: string
	email: string
	gender: 'male' | 'female' | ''
	password: string
	confirmPassword: string
}

interface RegisterProps {
	onSubmit: (data: RegisterOptions) => void
	onSwitch: () => void
}

function Register({ onSubmit, onSwitch }: RegisterProps) {
	const formRef = useRef<HTMLFormElement>(null)

	const [inputs, setInputs] = useState<RegisterOptions>({
		name: '',
		nickname: '',
		email: '',
		gender: '',
		password: '',
		confirmPassword: '',
	})

	const [errors, setErrors] = useState<Partial<RegisterOptions>>({})
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		formRef.current?.reset()
		onSubmit(inputs)
	}

	const handleReset = () => {
		setInputs({
			email: '',
			gender: '',
			name: '',
			nickname: '',
			password: '',
			confirmPassword: '',
		})
		setErrors({})
	}

	const togglePasswordVisibility = (e: React.MouseEvent) => {
		e.preventDefault()
		setShowPassword(prev => !prev)
	}

	return (
		<div className={cls.Register}>
			<form
				ref={formRef}
				className={cls.RegisterForm}
				onSubmit={handleSubmit}
				onChange={handleChange}
				onReset={handleReset}
			>
				<Input
					label='Имя'
					name='name'
					placeholder='Введите ваше имя'
					value={inputs.name}
					error={errors.name}
					withAsterisk
				/>

				<Input
					label='Ник'
					name='nickname'
					placeholder='Введите никнейм'
					value={inputs.nickname}
					error={errors.nickname}
					withAsterisk
				/>

				<Input
					label='Почта'
					name='email'
					type='email'
					placeholder='example@mail.com'
					value={inputs.email}
					error={errors.email}
					withAsterisk
					leftSection={<IconAt size={16} />}
				/>

				<div className={cls.RadioGroup}>
					<span className={cls.Label}>Пол</span>
					<div className={cls.RadioOptions}>
						<label>
							<Input
								type='radio'
								name='gender'
								value='male'
								checked={inputs.gender === 'male'}
							/>
							Мужской
						</label>
						<label>
							<Input
								type='radio'
								name='gender'
								value='female'
								checked={inputs.gender === 'female'}
							/>
							Женский
						</label>
					</div>
				</div>

				<Input
					label='Пароль'
					name='password'
					type={showPassword ? 'text' : 'password'}
					placeholder='Введите пароль'
					value={inputs.password}
					error={errors.password}
					withAsterisk
					leftSection={<IconLock size={16} />}
					rightSection={
						showPassword ? (
							<IconEyeOff size={16} onClick={togglePasswordVisibility} />
						) : (
							<IconEye size={16} onClick={togglePasswordVisibility} />
						)
					}
				/>

				<Input
					label='Повторите пароль'
					name='confirmPassword'
					type={showPassword ? 'text' : 'password'}
					placeholder='Повторите пароль'
					value={inputs.confirmPassword}
					error={errors.confirmPassword}
					withAsterisk
					leftSection={<IconLock size={16} />}
					rightSection={
						showPassword ? (
							<IconEyeOff size={16} onClick={togglePasswordVisibility} />
						) : (
							<IconEye size={16} onClick={togglePasswordVisibility} />
						)
					}
				/>

				<Button type='submit'>Зарегистрироваться</Button>
			</form>

			<div className={cls.SwitchBtn}>
				<span>Или</span>
				<Button variant='OUTLINE' onClick={onSwitch}>
					Войти
				</Button>
			</div>
		</div>
	)
}

export default Register
