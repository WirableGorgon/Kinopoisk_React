import { FC } from "react"

interface TrailerLink {
    link: string
}

export const TrailerFilmModal: FC<TrailerLink> = ({link}) => {
    return (
        <video src={link} preload="metadata" controls />
    )
}