import { useQuery } from "@tanstack/react-query"
import { randomFilm, UserDataFav } from "../../api/api"
import { queryClient } from "../../api/queryClient"
import { RandomFilm } from "./RandomFilm"
import { FC } from "react"
//import { Loader } from "../Loader/Loader"


export const FetchRandomFilm: FC<UserDataFav> = ({ active, changeUserData, changeModalActive }) => {
    const RandFilmQuery = useQuery({
        queryFn: () => randomFilm(),
        queryKey: ['randFilm'],
    }, queryClient)
    
    /*switch (RandFilmQuery.status) {
        case "pending":
            return <Loader />

        case "success":*/
            if (RandFilmQuery.data) {
                return <RandomFilm film={RandFilmQuery.data} active={active} changeUserData={changeUserData} changeModalActive={changeModalActive} />
            } else {
                return <h2>Фильм не найден</h2>
            }

        /*case "error":
            return <div>
                <span>Произошла ошибка :(</span>
                <button onClick={() => RandFilmQuery.refetch()}>Повторить запрос</button>
            </div>
    }*/
}
