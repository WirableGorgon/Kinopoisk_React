import { FC } from "react"
import { ProfileProps, userLogout } from "../../api/api"
import { Link } from "react-router-dom"

export const SetList: FC<ProfileProps> = ({ userData, changeUserData }) => {
    return (
        <div>
            <div>
                <div>{userData?.name[0]}{userData?.surname[0]}</div>
                <div>
                    <p>Имя Фамилия</p>
                    <p>{userData?.name}{userData?.surname}</p>
                </div>
            </div>
            <div>
                <p>Электронная почта</p>
                <p>{userData?.email}</p>
            </div>
            <Link to={'/'} onClick={() => {
                userLogout().then(() => changeUserData(undefined))
            }}>Выйти</Link>
        </div>
    )
}