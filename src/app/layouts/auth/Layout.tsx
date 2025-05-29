import { useState } from 'react'
import { type LoginOptions } from '@/modules/auth/login'
import { type RegisterOptions } from '@/modules/auth/register'
import Login from '@/modules/auth/login/Login'
import Register from '@/modules/auth/register/Register'
import cls from './Layout.module.scss'

function LayoutAuth() {
	const [activeAuth, setActiveAuth] = useState<'login' | 'register'>('login')

	const toggleAuth = () => {
		setActiveAuth(prev => (prev === 'login' ? 'register' : 'login'))
	}

	const onSubmitLogin = (data: LoginOptions) => {
		alert(`Добро пожаловать, ${data.email}!`)
		toggleAuth()
	}

	const onSubmitRegister = (data: RegisterOptions) => {
		alert(`Добро пожаловать, ${data.name}!`)
		toggleAuth()
	}

	return (
		<div className={cls.Layout}>
			{activeAuth === 'login' ? (
				<Login onSubmit={onSubmitLogin} onSwitch={toggleAuth} />
			) : (
				<Register onSubmit={onSubmitRegister} onSwitch={toggleAuth} />
			)}
		</div>
	)
}

export default LayoutAuth
