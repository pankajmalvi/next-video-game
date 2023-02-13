import { Game } from '@/models/models'
import Link from 'next/link'
import React from 'react'
import GameCard from './GameCard'

const Games = (props: any) => {
    const games: Array<Game> = props.games
    return (
        <div className="games-container">
            {
                games.map((game: Game) =>
                    <Link href={`/game/${game?.id}`} key={game?.id}>
                        <GameCard game={game} />
                    </Link>
                )
            }
        </div>
    )
}

export default Games