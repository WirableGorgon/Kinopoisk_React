import { FC, useState } from "react"
import { FilmForUsers, randomFilm } from "../../api/api"
import { ModalWindow } from "../ModalWindow/ModalWindow"
import { TrailerFilmModal } from "./RandomFilmModal"
import { Link } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "../../api/queryClient"
import { FavButton } from "../FavButton/FavButton"
import './RandomFilm.css'

export const RandomFilm: FC<FilmForUsers> = ({ film, active, changeUserData, changeModalActive }) => {

    const [modalTrailerActive, setModalTrailerActive] = useState(false)
    const changeModalTrailerActive = (state: boolean) => setModalTrailerActive(state);

    const createRandomFilmMutation = useMutation({
        onMutate() {
            queryClient.invalidateQueries({ queryKey: ['randFilm'] })
        }
    })

    const hours = Math.floor(film.runtime / 60);
    const minutes = Math.floor((film.runtime / 60 - hours) * 100);
    
    return (
        <div className="random-film">
            <ModalWindow active={modalTrailerActive} setActive={changeModalTrailerActive} prop={<TrailerFilmModal link={film.trailerUrl} />} />
            <table className="RF-table">
                <thead>
                    <tr className="RF-stat">
                        <th className="stat rand-rating">{film.tmdbRating}</th>
                        <th className="stat rand-year">{film.releaseYear}</th>
                        <th className="stat rand-genre">{film.genres[0]}</th>
                        <th className="stat rand-time">{hours} ч {minutes} мин</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="rand-title">
                        <td colSpan={4}>
                            {film.title}
                        </td>
                    </tr>
                    <tr className="rand-plot">
                        <td colSpan={4}>
                            {film.plot}
                        </td>
                    </tr>
                    <tr className="rand-buttons">
                        <td>
                            <button className="r-button trailer" onClick={() => {
                                changeModalTrailerActive(true)
                            }}>Трейлер</button>
                        </td>
                        <td>
                            <div className="r-button about-random">
                                <Link to={`/film/${film.id}`}>
                                О фильме
                                </Link>
                            </div>
                        </td>
                        <td>
                            <FavButton film={film} active={active} changeUserData={changeUserData} changeModalActive={changeModalActive} />
                        </td>
                        <td>
                            <button className="r-button refetch" onClick={() => {
                                randomFilm();
                                createRandomFilmMutation.mutate()
                            }} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <img className="RF-img" src={film.posterUrl} />
        </div>
    )
}