import { FC } from "react"
import { FavListProps } from "../../api/api"
import { FilmCard } from "../FilmCard/FilmCard"

export const FavList: FC<FavListProps> = ({ list }) => {
    return (
        <div>
            <ul className="top-list">
                {list.map((res) => (
                    <li className="film-from-top" key={res.id}>
                        <FilmCard {...res} />
                    </li>
                ))}
            </ul>
        </div>
    )
}