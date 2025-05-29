import {
	isEmail,
	isMatch,
	isRequired,
	isUsername,
	minLength,
} from '@/core/helpers/validate'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { IconAt, IconEye, IconEyeOff, IconLock } from '@tabler/icons-react'
import {
	useRef,
	useState,
	type ChangeEvent,
	type FormEvent,
	type MouseEvent,
} from 'react'
import styles from './Register.module.scss'

export interface RegisterOptions {
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

	const validate = () => {
		const newErrors: Partial<RegisterOptions> = {
			name: isRequired(inputs.name),
			nickname: isRequired(inputs.nickname) || isUsername(inputs.nickname),
			email: isRequired(inputs.email) || isEmail(inputs.email),
			password: minLength(inputs.password, 6),
			confirmPassword: isMatch(inputs.confirmPassword, inputs.password),
		}

		setErrors(newErrors)

		return !Object.values(newErrors).some(Boolean)
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

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		if (!validate()) return

		onSubmit(inputs)
		formRef.current?.reset()
		handleReset()
	}

	const togglePasswordVisibility = (event: MouseEvent) => {
		event.preventDefault()
		setShowPassword(prev => !prev)
	}

	return (
		<div className={styles.Register}>
			<form
				ref={formRef}
				className={styles.RegisterForm}
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

				<div className={styles.RadioGroup}>
					<span className={styles.Label}>Пол</span>
					<div className={styles.RadioOptions}>
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
					{errors.gender && <div className={styles.Error}>{errors.gender}</div>}
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

			<div className={styles.SwitchBtn}>
				<span>Или</span>
				<Button variant='OUTLINE' onClick={onSwitch}>
					Войти
				</Button>
			</div>
		</div>
	)
}

export default Register
