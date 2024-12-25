import { FC, useState } from "react";
import { MoviePage } from "../../api/api";
import { FavButton } from "../../components/FavButton/FavButton";
import { TrailerFilmModal } from "../../components/RandomFilm/RandomFilmModal";
import { ModalWindow } from "../../components/ModalWindow/ModalWindow";

export const AboutPage: FC<MoviePage> = ({film, active, changeUserData, changeModalActive }) => {

    const [modalTrailerActive, setModalTrailerActive] = useState(false)
    const changeModalTrailerActive = (state: boolean) => setModalTrailerActive(state);
    
    return (
        <div>
            <ModalWindow active={modalTrailerActive} setActive={changeModalTrailerActive} prop={<TrailerFilmModal link={film.trailerUrl} />} />
            <table>
                <thead>
                    <tr>
                        <th className="rand-rating">{film.tmdbRating}</th>
                        <th className="rand-year">{film.releaseYear}</th>
                        <th className="rand-genre">{film.genres[0]}</th>
                        <th className="rand-time">{film.runtime}</th>
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
                            <button className="trailer" onClick={() => {
                                changeModalTrailerActive(true)
                            }}>Трейлер</button>
                        </td>
                        <td>
                            <FavButton film={film} active={active} changeUserData={changeUserData} changeModalActive={changeModalActive} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <img src={film.posterUrl} />
            <p>О фильме</p>
            <table>
                <tbody>
                    <tr>
                        <td>Язык оригинала</td>
                        <td>{film.language}</td>
                    </tr>
                    <tr>
                        <td>Бюджет</td>
                        <td>{film.budget}</td>
                    </tr>
                    <tr>
                        <td>Выручка</td>
                        <td>{film.revenue}</td>
                    </tr>
                    <tr>
                        <td>Режиссёр</td>
                        <td>{film.director}</td>
                    </tr>
                    <tr>
                        <td>Продакшен</td>
                        <td>{film.production}</td>
                    </tr>
                    <tr>
                        <td>Награды</td>
                        <td>{film.awardsSummary}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}