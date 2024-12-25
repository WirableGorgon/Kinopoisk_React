import { FC } from "react"
import { LogButProps } from "../../api/api"
import { Link } from "react-router-dom"

export const LoginButton: FC<LogButProps> = ({ userData, changeModalActive }) => {
    if (!userData) {
        return (
            <a className="navig-but" onClick={() => {
                changeModalActive(true)
            }}>Войти</a>
        )
    } else {
        return (
            <Link to={'/profile'} className="navig-but">{userData.name}</Link>
        )
    }
}