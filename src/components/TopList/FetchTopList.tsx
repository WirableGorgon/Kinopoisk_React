import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../api/queryClient"
import { top10Films } from "../../api/api"
import { TopList } from "./TopList"

export const FetchTopList = () => {
    const TopListQuery = useQuery({
        queryFn: () => top10Films(),
        queryKey: ['topFilms'],
    }, queryClient)

    if (TopListQuery.data) {
        return <TopList list = {TopListQuery.data} />
    }
}