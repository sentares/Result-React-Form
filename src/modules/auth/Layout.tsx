import { useState } from 'react'
import cls from './Layout.module.scss'
import Login from './login/Login'

function LayoutAuth() {
	const [activeAuth, setActriveAuth] = useState<'login' | 'register'>('login')

	const handleChangeActiveAuth = () => {}

	return (
		<div className={cls.Layout}>
			<Login onSubmit={handleChangeActiveAuth} />
		</div>
	)
}

export default LayoutAuth
