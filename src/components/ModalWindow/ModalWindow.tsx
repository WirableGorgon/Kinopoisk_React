import { FC } from "react"
import './ModalWindow.css'
import { ModalProps } from "../../api/api"

export const ModalWindow: FC<ModalProps> = ({ active, setActive, prop}) => {

    return (
        <div className={active ? "modal-window active" : "modal-window"} onClick={() => setActive(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {prop}
            </div>
        </div>
    )
}