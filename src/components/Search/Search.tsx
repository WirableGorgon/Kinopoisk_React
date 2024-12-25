import { useMutation, useQuery } from "@tanstack/react-query"
import { FC, useState } from "react"
import { searchFilms } from "../../api/api"
import { queryClient } from "../../api/queryClient"
import { SearchList } from "./SearchList"

export const Search: FC = () => {

    const [searchValue, setSearchValue] = useState('')

    const SearchQuery = useQuery({
        queryFn: () => searchFilms({ count: '5', page: '0', title: searchValue, genre: '' }),
        queryKey: ['search', searchValue],
        enabled: !!searchValue
    }, queryClient)

    const createSearchMutation = useMutation({
        mutationFn: () => searchFilms({ count: '5', page: '0', title: searchValue, genre: '' }), // Добавлена mutationFn
        onSuccess: () => {
            // Обновление данных после успешной мутации
            queryClient.invalidateQueries({ queryKey: ['search', searchValue] }); // Перезапрос после успешной мутации
        },
        onError: (error) => {
            // Обработка ошибок
            console.error("Ошибка при поиске:", error);
        },
    })

    return (
        <div className="search-block">
            <input className="search-bar" onChange={(event) => {
                setSearchValue(event.target.value);
                createSearchMutation.mutate();
                console.log(SearchQuery.data)
            }} />
            {SearchQuery.data ? <SearchList searchData={SearchQuery.data} /> : <></>}
        </div>
    )
}