import { FC, useEffect, useState } from "react"
import { Film, filmInf, ProfileProps } from "../../api/api"
import { FavList } from "../../components/FavList/FavList"
import { SetList } from "../../components/SetList/SetList"

export const Profile: FC<ProfileProps> = ({ userData, changeUserData }) => {
    
    const [page, setPage] = useState('fav')
    const [films, setFilms] = useState<Film[]>([]); // Используем useState для films
        
    useEffect(() => {
        if (userData) {
            const fetchFilms = async () => {
                const filmIds = userData.favorites;
                const filmPromises = filmIds.map(id => filmInf(id)); // Создаём массив промисов
                const filmResults = await Promise.all(filmPromises); // Ждём выполнения всех промисов
                setFilms(filmResults); // Обновляем состояние films после получения данных.
            };
            fetchFilms();
        }
    }, [userData]); // Обновляется при изменении userData или favorites

    return (
        <div>
            <h1>Мой аккаунт</h1>
            <button onClick={() => setPage('fav')}>Избранные фильмы</button>
            <button onClick={() => setPage('set')}>Настройки аккаунта</button>
    
            {page == 'fav' ? <FavList list={films} /> : <SetList userData={userData} changeUserData={changeUserData} />}
        </div>
    )
}