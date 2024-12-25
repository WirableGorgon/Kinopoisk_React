import { GenresPage } from "./GenresPage";
import { useQueries, useQuery } from "@tanstack/react-query"
import { fetchGenres, searchFilms } from "../../api/api"
import { queryClient } from "../../api/queryClient"
import { useMemo } from "react"

export const FetchGenresPage = () => {

    const GenresQuery = useQuery({
        queryFn: () => fetchGenres(),
        queryKey: ['genres']
    }, queryClient)

    const genreQueries = useMemo(() => {

        if (!GenresQuery.data) return[]

        return GenresQuery.data.map((genre) => ({genre}))
    }, [GenresQuery.data]);

    const filmQueries = useQueries({
        queries: genreQueries.map(({ genre }) => ({
            queryKey: [`films-${genre}`],
            queryFn: () => searchFilms({ count: '1', page: '0', title: '', genre }),
            enabled: GenresQuery.isSuccess,
        }))
    })
    return (
        <GenresPage genres={genreQueries} genreFilm={filmQueries} />
    )
}