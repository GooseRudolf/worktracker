import { useMemo } from "react"
import st from './Pagination.module.scss'

type Props = {
    page: number
    total: number
    onChange: (page: number) => void
}

export const Pagination = ({ page, total, onChange }: Props) => {
    const pages = useMemo(() => {
        const start = Math.max(1, page - 1)
        const end = Math.min(total, start + 2)
        const res: number[] = []
        for (let i = start; i <= end; i++) res.push(i)
        return res
    }, [page, total])

    return (
        <div className={st.pagination}>
            <button disabled={page === 1} onClick={() => onChange(page - 1)}> ◀ </button>
            {pages.map(p => (
                <button key={p} onClick={() => onChange(p)} 
                    className={p === page ? st.active : "" }>
                    {p}
                </button>
            ))}
            <button disabled={page === total} onClick={() => onChange(page + 1)}> ▶ </button>
        </div>
    )
}