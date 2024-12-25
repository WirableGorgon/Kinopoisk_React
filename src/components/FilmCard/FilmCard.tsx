import { FC } from "react";
import { Film } from "../../api/api";
import { Link } from "react-router-dom";

export const FilmCard: FC<Film> = (film) => {
    return (
        <Link to={`/film/${film.id}`} className="about-top">
            <img className="film-card" src={film.posterUrl} />
        </Link>
    )
}