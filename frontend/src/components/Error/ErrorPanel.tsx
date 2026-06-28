import { useEffect, useState, type FC } from 'react'
import st from './ErrorPanel.module.scss'

interface PropsType {
    msg: string,
    cleanError: (msg:string) => void;
    type: number
}
export const ErrorPanel: FC<PropsType> = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [displayMessage, setDisplayMessage] = useState("");
    useEffect(() => {
        if (props.msg != '') {
            setDisplayMessage(props.msg)
            setIsVisible(true)
            props.cleanError("")
            setTimeout(() => { setIsVisible(false)}, 5000)
        }
    }, [props.msg]);
    return (
        <div className={`${st.popup} ${isVisible ? st.show : ""} ${props.type==1?st.sucsesful:''}`} >
            {displayMessage}
        </div>
    )
}