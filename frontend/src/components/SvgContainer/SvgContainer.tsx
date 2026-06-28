import st from './SvgContainer.module.scss'
type Props = {
  d:string,
}
export const SvgContainer = ({d}:Props) =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" 
        className={st.svg}>
          <path fill="currentColor" d={d} />
        </svg>
    )
}