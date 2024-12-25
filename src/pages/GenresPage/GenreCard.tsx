import { FC } from "react"
import { GenreCardProps } from "../../api/api"
import { Link } from "react-router-dom"

export const GenreCard: FC<GenreCardProps> = ({ genre, film }) => {
    return (
        <Link to={`/genres/${genre}`}>
            <img src={film.posterUrl} />
            <p>{genre}</p>
        </Link>
    )
}