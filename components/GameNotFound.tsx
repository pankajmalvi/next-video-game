import Link from 'next/link'
import React from 'react'

const GameNotFound = () => {
    return (
        <div className='game-not-found'>
            <h1>Game Not Found</h1>
            <Link href='/' >Back to Home</Link>
        </div>
    )
}

export default GameNotFound