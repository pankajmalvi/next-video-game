'use client'

import Games from "@/components/Games"
import IconNext from "@/components/icons/IconNext"
import IconPrevious from "@/components/icons/IconPrevious"
import Loading from "@/components/Loading"
import SortByDropdown from "@/components/SortByDropdown"
import { useGame } from "@/hooks/useGame"
import { fetchGames, fetchGamesByPage, sortAndFetchGamesBy } from "@/models/controller"
import { useEffect, useState } from "react"




const HomePage = () => {
    const { game, setGame } = useGame()
    // const { game, setGame } = useGameList()

    const [currentPage, setCurrentPage] = useState(1)
    const getGamesList = async () => {
        let response = await fetchGames()
        setGame(response.results)
    }
    const getGamesListByPage = async () => {
        let response = await fetchGamesByPage(currentPage)
        console.log(currentPage);

        setGame(response.results)
    }


    const sortGamesBy = async (sortBy: string) => {
        setGame([])
        let response = await sortAndFetchGamesBy(sortBy)
        setGame(response ? response.results : [])
    }




    useEffect(() => {
        getGamesList()
    }, [])

    useEffect(() => {
        getGamesListByPage()
    }, [currentPage])




    return (
        <div className="main-home">
            <SortByDropdown sortGamesBy={sortGamesBy} />
            {game?.length > 0
                ?
                <>
                    <Games games={game} />
                    <div className="pagination">
                        <button onClick={() => (currentPage > 0) && setCurrentPage(prev => prev - 1)}>
                            <span>Previous</span><IconPrevious />
                        </button>
                        <button onClick={() => setCurrentPage(prev => prev + 1)}>
                            <IconNext /><span>Next</span>
                        </button>
                    </div>
                </>
                : <Loading />
            }

        </div>
    )
}

export default HomePage