import { UseQueryResult } from "@tanstack/react-query"
import { ReactElement } from "react"

const API_URL = 'https://cinemaguide.skillbox.cc'

export interface Film {
    id: number
    title: string
    language: string
    releaseYear: number
    genres: string[]
    plot: string
    runtime: number
    posterUrl: string
    trailerUrl: string
    tmdbRating: number
    budget: string
    revenue: string
    director: string
    production: string
    awardsSummary: string
}

export interface Favorite {
    favorites: number[],
    surname: string,
    name: string,
    email: string
}

export interface Auth {
    changeAuthType (type: string): void,
    changeUserData (obj: Favorite | undefined): void,
    changeModalActive (state: boolean): void
}

export interface RegResult {
    result: boolean
}

export interface UserData {
    changeUserData (obj: Favorite | undefined): void
    changeModalActive (state: boolean): void
}

export interface UserDataFav {
    active: boolean,
    changeUserData (obj: Favorite): void
    changeModalActive (state: boolean): void
}

export interface UserDataFavDev {
    changeUserData (obj: Favorite): void
}

export interface ModalProps {
    active: boolean,
    setActive (state: boolean): void,
    prop: ReactElement,
}

export interface FilmForUsers {
    film: Film,
    active: boolean,
    changeUserData (obj: Favorite): void,
    changeModalActive (state: boolean): void
}

export interface LogButProps {
    userData: Favorite | undefined,
    changeModalActive (state: boolean): void
    changeUserData (obj: Favorite | undefined): void
}

export interface ProfileProps {
    userData: Favorite | undefined,
    changeUserData (obj: Favorite | undefined): void
}

export interface FavListProps {
    list: Film[]
}

export interface GenrePageProps {
    genres: { genre: string }[], 
    genreFilm: UseQueryResult<Film[], Error>[]
}

export interface GenreCardProps {
    genre: string,
    film: Film
}

export interface MoviePage {
    film: Film,
    active: boolean,
    changeUserData (obj: Favorite): void
    changeModalActive (state: boolean): void
}

export const randomFilm = (): Promise<Film> => 
    fetch(`${API_URL}/movie/random`).then((res) => res.json())
    .then((res) => {
        return res
    })

export const top10Films = (): Promise<Film[]> => 
    fetch(`${API_URL}/movie/top10`).then((res) => res.json())
    .then((res) => {
        return res
    })

export const filmInf = (id: number): Promise<Film> =>
    fetch(`${API_URL}/movie/${id}`).then((res) => res.json())
    .then((res) => {
        return res
    })

export const searchFilms = (params: { count: string, page: string, title: string, genre: string }): Promise<Film[]> => {
    const urlParams = new URLSearchParams({
        count: params.count,
        page: params.page,
        title: params.title,
        genre: params.genre,
    });
    return fetch(`${API_URL}/movie?${urlParams}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())
    .then((res) => {
        return res
    })
}

export const fetchGenres = (): Promise<string[]> =>
    fetch(`${API_URL}/movie/genres`)
    .then((res) => res.json())
    .then((res) => {
        return (res)
    })

export const addFavorite = (id: string): Promise<Favorite> =>
    fetch(`${API_URL}/favorites`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({id}),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())
    .then((res) => {
        return res
    })

export const delFavorite = (id: number): Promise<Favorite> =>
    fetch(`${API_URL}/favorites/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({id}),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json())
    .then((res) => {
        return res
    })
  
export const favoriteList = (): Promise<Film[]> =>
    fetch(`${API_URL}/favorites`, {
        credentials: 'include'
    }).then((res) => res.json())
    .then((res) => {
        return res
    })

export const userCreate = (
    email: string,
    password: string,
    name: string,
    surname: string
): Promise<RegResult> => 
    fetch(`${API_URL}/user`, {
        method: 'POST',
        body: JSON.stringify({email, password, name, surname}),
        headers: {
          'Content-Type': 'application/json',
        },
    }).then((res) => res.json())
    .then((res) => {
        return res
    });

export const userLogin = (
    email: string,
    password: string
): Promise<RegResult> => 
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({email, password}),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())
      .then((res) => {
          return res
      });

export const userLogout = (): Promise<RegResult> => 
    fetch(`${API_URL}/auth/logout`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
    .then((res) => {
        return res
    })

export const profile = async (): Promise<Favorite | undefined> => {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`nodata`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return undefined
    }
};