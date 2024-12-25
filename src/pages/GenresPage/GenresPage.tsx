import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchGenres, Film, GenrePageProps, searchFilms } from "../../api/api"
import { queryClient } from "../../api/queryClient"
import { FC, useMemo } from "react"
import { GenreCard } from "./GenreCard"

export const GenresPage: FC<GenrePageProps> = ({ genres, genreFilm }) => {

            return (
                <div>
                    <h2>Жанры фильмов</h2>
                    <div>
                    {genres.map(({ genre }, index) => (
                        <div key={genre}>
                            {genreFilm[index].data && genreFilm[index].data.length > 0 ? (
                                genreFilm[index].data.map((film) => (
                                    <div key={film.id}>
                                        <GenreCard genre={genre} film={film} />
                                    </div>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            )
}