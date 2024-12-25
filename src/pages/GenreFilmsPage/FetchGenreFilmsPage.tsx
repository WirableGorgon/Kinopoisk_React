import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { queryClient } from "../../api/queryClient"
import { Film, searchFilms } from "../../api/api"
import { useEffect, useState } from "react"
import { FilmCard } from "../../components/FilmCard/FilmCard"

export const FetchGenreFilmsPage = () => {
    const { genre } = useParams();
    const [movieGenre, setMovieGenre] = useState(String(genre))
    const [amountOfMovies, setAmountOfMovies] = useState(15);
    const [movieList, setMovieList] = useState<Film[]>([]); // Явно указать тип как Film[]
    const [hasMoreMovies, setHasMoreMovies] = useState(true);
    
    useEffect(() => {
        setMovieGenre(String(genre));
        setAmountOfMovies(15);
        setMovieList([]);
        setHasMoreMovies(true)
    }, [genre])

    const moreMovies = () => {
        setAmountOfMovies((prev) => prev + 10); // Увеличиваем количество фильмов на 10
    };

    const movieListQuery = useQuery<Film[], Error>({
        queryFn: () => searchFilms({ count: String(amountOfMovies), page: '0', title: 'star', genre: movieGenre }).then((res) => {
            if ((res.length - 5) % 10 != 0) setHasMoreMovies(false)
            return res
        }),
        queryKey: ['genreFilms', movieGenre, amountOfMovies],
        enabled: !!movieGenre,
    });

    const createMovieListMutation = useMutation({
        mutationFn: () => searchFilms({ count: String(amountOfMovies), page: '0', title: 'star', genre: movieGenre }),
        onSuccess: (data: Film[]) => {
            setMovieList((prev) => ( // Используем функцию предшествующего состояния
                [...prev, ...data.filter(newFilm => !prev.some(film => film.id === newFilm.id))] // Добавляем только новые фильмы
            ));
            queryClient.invalidateQueries({ queryKey: ['genreFilms', amountOfMovies] });
        },
    });

    // Использовать useEffect только для установки начального состояния
    useEffect(() => {
        if (movieListQuery.data) {
            setMovieList((prev) => {
                // Убедитесь, что не добавляем дублирующиеся фильмы
                return [...prev, ...movieListQuery.data.filter(
                    newFilm => !prev.some(film => film.id === newFilm.id)
                )];
            });
        }
    }, [movieListQuery.data]);

    return (
        <div>
            <ul className="top-list">
                {movieList.map((film) => ( 
                    <li className="film-from-top" key={film.id}> {/* Убедитесь, что id уникален */}
                        <FilmCard {...film} />
                    </li>
                ))}
            </ul>

            {hasMoreMovies && (
            <button onClick={() => {
                moreMovies(); // Увеличиваем количество фильмов
                createMovieListMutation.mutate(); // Выполняем мутацию для получения новых фильмов
            }}>
                Показать ещё
            </button>
            )}
        </div>
    );
}