import { FC } from "react"
import { addFavorite, delFavorite, favoriteList, FilmForUsers } from "../../api/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { queryClient } from "../../api/queryClient"
import { AuthForm } from "../LogRegModal/AuthForm"
import { ModalWindow } from "../ModalWindow/ModalWindow"

export const FavButton: FC<FilmForUsers> = ({ film, active, changeUserData, changeModalActive }) => {

    const FavQuery = useQuery({
        queryFn: () => favoriteList(),
        queryKey: ['FavFilms'],
    }, queryClient)

    const createFavFilmsMutation = useMutation({
        onMutate() {
            queryClient.invalidateQueries({ queryKey: ['FavFilms'] })
        }
    })

    if (FavQuery.data) {
        return (
            <button className="r-button favourite" onClick={() => {
                for (let i = 0; i < FavQuery.data.length; i++) {
                    if (FavQuery.data[i].id === film.id) {
                        console.log('deleted')
                        return delFavorite(film.id).then(() => createFavFilmsMutation.mutate())
                    }}
                console.log('added')
                return addFavorite(String(film.id)).then(() => createFavFilmsMutation.mutate())
            }}></button>
        )
    } else {
        return (
            <div>
                <ModalWindow active={active} setActive={changeModalActive} prop={<AuthForm changeUserData={changeUserData} changeModalActive={changeModalActive} />} />

                <button className="r-button favourite" onClick={() => {
                    changeModalActive(true)
                }}></button>
            </div>
        )
    }
}