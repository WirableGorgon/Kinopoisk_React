import { FC } from "react";
import { Film } from "../../api/api";

export interface SearchData {
    searchData: Film[]
}

export const SearchList: FC<SearchData> = ({ searchData }) => {
    return (
        <div>
            {searchData.map((movie) => {
                return (
                    <div>
                        <img src={movie.posterUrl} />
                        <table>
                            <thead>
                                <tr>
                                    <th className="rand-rating">{movie.tmdbRating}</th>
                                    <th className="rand-year">{movie.releaseYear}</th>
                                    <th className="rand-genre">{movie.genres.map((genre) => {
                                        return (
                                            <span>{genre}</span>
                                        )
                                    })}</th>
                                    <th className="rand-time">{movie.runtime}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="rand-title">
                                    <td colSpan={4}>
                                        {movie.title}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    )
}