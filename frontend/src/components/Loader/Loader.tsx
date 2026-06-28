import st from './loader.module.scss'
import loader from '@/assets/img/loader.gif'

export const Loader = () => {
    return (
        <div className={st.loader}>
            <div className={st.loader__background}></div>
            <div className={st.loader__img}>
                <img src={loader} alt="" />
            </div>
        </div>
    )
}