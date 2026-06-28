import { useEffect, useState } from "react";
import { PassField } from "./Commom";
import st from "./Registration.module.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser, resetPassword } from "@/store/authStore";
import type { userLoginType } from "@/types/userTypes";

export const LoginForm = () => {
  const [data, setData] = useState<userLoginType>({ username: "", password: "" })
  const [isValid, setIsValid] = useState<boolean>(false)
  useEffect(() => {
    if (data.username.length < 5) setIsValid(false)
    else setIsValid(true)
  }, [data.username])
  const setPassword = (value: string) => { setData(prev => ({ ...prev, password: value })) }
  const logIn = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(data)
  }
  return (
    <div className={`${st.login} ${st.authentication}`}>
      <h1 className={st.login__title}>Вход</h1>
      <form action="" className={st.form}>
        <div className={st.form__field}>
          <label htmlFor="login" className={st.form__label}>Логин</label>
          <input type="text" className={st.form__input} id="login" value={data.username}
            onChange={(e) => setData(prev => ({ ...prev, username: e.target.value }))} />
        </div>
        <div className={st.form__field}>
          <div className={st.form__label_forgotPass}>
            <label htmlFor="password" className={st.form__label}>Пароль</label>
            <NavLink to="/forgotpassword">Забыли пароль?</NavLink>
          </div>
          <div className={st.form__input}><PassField id="password" value={data.password}
            setValue={setPassword} /></div>
        </div>
        <div className={st.form__field}>
          <button className={st.form_btn} disabled={!isValid}
            onClick={logIn}>Вход</button>
        </div>
        <div className={st.form__field}>
          <div className={st.form__link}>
            <span>Нет акаунта?</span><NavLink to="/registration">Зарегестрируйтесь!</NavLink>
          </div>
        </div>
      </form>
    </div>
  )
}

export const FogotPassword = () => {
  const [email, setEmail] = useState<string>("")
  const [isValid, setIsValid] = useState<boolean>(false)
  const navigate = useNavigate();
  useEffect(() => {
    if (!/\S+@\S+\.\S+/.test(email)) setIsValid(false)
    else setIsValid(true)
  }, [email])
  const sendMail = async (e: React.FormEvent) => {
    e.preventDefault()
    await resetPassword(email)
    navigate("/emailconfirm")
  }
  return (
    <div className={`${st.login} ${st.authentication}`}>
      <h1 className={st.login__title}>Смена пароля</h1>
      <form action="" className={st.form}>
        <div className={st.form__field}>
          <label htmlFor="email" className={st.form__label}>Почта</label>
          <input type="email" className={st.form__input} id="email" value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={st.form__field}>
          <button className={st.form_btn} disabled={!isValid}
            onClick={sendMail}>Запрсить смену пароля</button>
        </div>
      </form>
    </div>
  )
}
