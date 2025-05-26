import { useState } from 'react'
import cls from './Layout.module.scss'
import Login from './login/Login'
import Register from './register/Register'

function LayoutAuth() {
	const [activeAuth, setActiveAuth] = useState<'login' | 'register'>('login')

	const toggleAuth = () => {
		setActiveAuth(prev => (prev === 'login' ? 'register' : 'login'))
	}

	return (
		<div className={cls.Layout}>
			{activeAuth === 'login' ? (
				<Login onSubmit={() => {}} onSwitch={toggleAuth} />
			) : (
				<Register onSubmit={() => {}} onSwitch={toggleAuth} />
			)}
		</div>
	)
}

export default LayoutAuth
