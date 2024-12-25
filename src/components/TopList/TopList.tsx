import { FC } from "react";
import { Film } from "../../api/api";
import { FilmCard } from "../FilmCard/FilmCard";
import './TopList.css'

interface TopListProps {
    list: Film[]
}

export const TopList: FC<TopListProps> = ({ list }) => {
    if (list) {
        let i = 0;
        return (
            <div className="top-10-container">
                <h2 className="top-10-h">
                    Топ-10 фильмов
                </h2>
                <ul className="top-list">
                    {list.map((res) => {i++; return (
                        <li className="film-from-top" key={res.id}>
                            <div className="film-index">{i}</div>
                            <FilmCard {...res} />
                        </li>
                    )})}
                </ul>
            </div>
        )
    }
}