import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { queryClient } from "../../api/queryClient";
import { filmInf, UserDataFav } from "../../api/api";
import { AboutPage } from "./AboutPage";
import { FC } from "react";

export const FetchAboutPage: FC<UserDataFav> = ({ active, changeUserData, changeModalActive }) => {
    const { id } = useParams();
    const filmID: number = Number(id)

    const FilmQuery = useQuery({
        queryFn: () => filmInf(filmID),
        queryKey: ['filmInf'],
    }, queryClient)

    if (FilmQuery.data) {
        return (
            <div>
                <AboutPage film={FilmQuery.data} active={active} changeUserData={changeUserData} changeModalActive={changeModalActive} />
            </div>
        )
    }
}