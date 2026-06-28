import { useEffect, useState } from "react";
import { PassField } from "./Commom";
import st from "./Registration.module.scss"
import { NavLink, useNavigate } from "react-router-dom";
import { authStore, registerUser } from "@/store/authStore";
import type { userRegisterType } from "@/types/userTypes";


export const RegistrationForm = () => {
  const [data, setData] = useState<userRegisterType>({ username: "", email: "", password: "" })
  const [passRep, setPassRep] = useState<string>("")
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
  const [isValid, setIsValid] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (data.username.length < 5) setIsValid(false)
    else if ((data.password.length < 5) || (passRep.length < 5)) setIsValid(false)
    else if (!/\S+@\S+\.\S+/.test(data.email)) setIsValid(false)
    else if (!passwordsMatch) setIsValid(false)
    else setIsValid(true)
  }, [data, passwordsMatch])
  const setPassword = (value: string) => {
    setData(prev => ({ ...prev, password: value }))
  }
  const setPassRepeat = (value: string) => {
    setPassRep(value)
    setPasswordsMatch((value == data.password) ? true : false)
  }
  const registration = async (e: React.FormEvent) => {
    e.preventDefault()
    await registerUser(data)
    navigate("/emailconfirm")
  }
  return (
    <div className={`${st.login} ${st.authentication}`}>
      <h1 className={st.login__title}>Регистрация</h1>
      <form action="" className={st.form} onSubmit={registration}>
        <div className={st.form__field}>
          <label htmlFor="login" className={st.form__label}>Логин</label>
          <input type="text" className={st.form__input} id="login" value={data.username}
            onChange={(e) => setData(prev => ({ ...prev, username: e.target.value }))} />
        </div>
        <div className={st.form__field}>
          <label htmlFor="email" className={st.form__label}>Почта</label>
          <input type="email" className={st.form__input} id="email" value={data.email}
            onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))} />
        </div>
        <div className={st.form__field}>
          <label htmlFor="password" className={st.form__label}>Придумайте пароль</label>
          <div className={st.form__input}><PassField id="password"
            value={data.password} setValue={setPassword} /></div>
        </div>
        <div className={st.form__field}>
          <div className={st.form__label_forgotPass}>
            <label htmlFor="passwordrepeat" className={st.form__label}>Повторите пароль</label>
            {!passwordsMatch && <span>Пароли не совпадают</span>}
          </div>
          <div className={st.form__input}><PassField id="passwordrepeat"
            value={passRep} setValue={setPassRepeat} /></div>
        </div>
        <div className={st.form__field}>
          <button className={st.form_btn} disabled={!isValid}
            onClick={registration}>Регистрация</button>
        </div>
        <div className={st.form__field}>
          <div className={st.form__link}>
            <span>Уже есть акаунт?</span><NavLink to="/">Вход!</NavLink>
          </div>
        </div>
      </form>
    </div>
  )
}


export const EmailConfirm = () => {
  const { emailToConfirm } = authStore.getState()
  const navigate = useNavigate();
  useEffect(() => {
    if (emailToConfirm == "") navigate("/")
  }, [emailToConfirm])
  return (
    <div className={`${st.EmailConfirm} ${st.authentication}`}>
      <form className={`${st.form} ${st.EmailConfirm__form}`}>
          <div className={st.EmailConfirm__img}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path fill="currentColor"
                d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
          </div>
          <div className={st.EmailConfirm__title}>Подтвердите свою электронную почту</div>
          <div className={st.EmailConfirm__text}>
            <span>
              Пожалуйста, перейдите по ссылке в письме, которое мы отправили вам для подтверждения электронной почты
            </span>
            <div className={st.EmailConfirm__email}>На 
              <a href="https://mail.google.com/">{emailToConfirm}</a></div>
          </div>
      </form>
    </div>
  )
} 