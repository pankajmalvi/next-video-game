'use client'

import { fetchGameById } from '@/models/controller'
import { Game } from '@/models/models'
import React, { useEffect, useState } from 'react'

const GameDetailsPage = ({ params }: any) => {
    const id = params.id
    const [game, setGame] = useState<Game | null>(null)

    const getGame = async (id: string) => {
        const gameDetails = await fetchGameById(id)
        setGame(gameDetails)
    }

    enum TABS {
        ABOUT = "ABOUT",
        TRAILERS = "TRAILERS",
        SCREESHOTS = "SCREESHOTS",
    }

    const style = {
        background: `url(${game?.background_image
            ? game.background_image
            : "/images/game-placeholder.webp"})`,
        backgroundSize: "cover",
    }

    // Tabs State
    const [aboutActive, setAboutActive] = useState(true)
    const [ssActive, setSsActive] = useState(false)
    const [trailersActive, setTrailersActive] = useState(false)


    useEffect(() => {
        getGame(id)
    }, [])

    const handleTabClick = (btnType: TABS) => {
        switch (btnType) {
            case TABS.ABOUT:
                setAboutActive(true)
                setSsActive(false)
                setTrailersActive(false)
                break
            case TABS.TRAILERS:
                setAboutActive(false)
                setSsActive(false)
                setTrailersActive(true)
                break
            case TABS.SCREESHOTS:
                setAboutActive(false)
                setSsActive(true)
                setTrailersActive(false)
                break
            default:
                break
        }
    }


    return (
        <main className='game-details-page'>
            <div className="game-details-container" >
                <div className="game-banner" style={style}>

                </div>
                <div className="game-details">
                    <div className="game-header">
                        <h1>{game?.name}</h1>
                        {
                            game?.metacritic &&
                            <div className="metacritic-container">
                                <div className="metacritic">
                                    <p>Metacritic</p>
                                    <div className="metacritic-gauge" >
                                        <div className="metacritic-value" style={{ width: `${game?.metacritic}%` }} >
                                            <p>{game?.metacritic}%</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>

                    <div className="tab-container">
                        <nav>
                            <ul>
                                <li><button className={aboutActive ? 'active' : ''} onClick={() => handleTabClick(TABS.ABOUT)}>About</button></li>
                                <li><button className={ssActive ? 'active' : ''} onClick={() => handleTabClick(TABS.SCREESHOTS)}>Screenshots</button></li>
                                <li><button className={trailersActive ? 'active' : ''} onClick={() => handleTabClick(TABS.TRAILERS)}>Trailers</button></li>
                            </ul>
                        </nav>
                        {
                            aboutActive &&
                            <div className="about-tab">
                                <div className="genres">
                                    <span>Genres</span>
                                    <ul>{
                                        game?.genres?.map(genres => <li key={genres.name}>{genres.name}</li>)
                                    }</ul>
                                </div>
                                <div className="about-col">
                                    <div className="platforms">
                                        <span>Platforms</span>
                                        <ul>
                                            {game?.parent_platforms?.map((parent_platform) => (
                                                <li key={parent_platform.platform.name}>
                                                    <img
                                                        src={`/images/platforms/${parent_platform.platform.name.toLowerCase()}.svg`}
                                                        alt={parent_platform.platform.name}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="release">
                                        <p><span>Release</span> {game?.released}</p>
                                    </div>
                                </div>
                                <div className="description">
                                    <span>Description</span>
                                    <p>
                                        {game?.description_raw}
                                    </p>
                                </div>


                                <div className="publishers">
                                    <span>Publishers</span>
                                    {game?.publishers?.map(publisher => publisher.name)}
                                </div>
                                <div className="website">
                                    <span>Website</span>
                                    <a href={game?.website} target='_blank' rel='noreferrer'>{game?.website}</a>
                                </div>

                            </div>
                        }
                        {
                            ssActive &&
                            <div className="screenshots-tab">
                                Screenshots
                            </div>
                        }
                        {
                            trailersActive &&
                            <div className="trailers-tab">
                                Trailers
                            </div>
                        }
                    </div>
                </div >
            </div >
        </main >
    )
}

export default GameDetailsPage