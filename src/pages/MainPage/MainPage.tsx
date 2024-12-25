import { FC } from "react"
import { FetchRandomFilm } from "../../components/RandomFilm/FetchRandomFilm"
import { FetchTopList } from "../../components/TopList/FetchTopList"
import { UserDataFav } from "../../api/api"

export const MainPage: FC<UserDataFav> = ({ active, changeUserData, changeModalActive }) => {
    return (
        <div className="main">
            <FetchRandomFilm active={active} changeUserData={changeUserData} changeModalActive={changeModalActive} />
            <FetchTopList />
        </div>
    )
}