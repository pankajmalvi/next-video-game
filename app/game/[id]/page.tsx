'use client'

import GameNotFound from '@/components/GameNotFound'
import Loading from '@/components/Loading'
import { fetchGameById, fetchGameScreenshotsById, fetchGameTrailersById } from '@/models/controller'
import { Game, Screenshots, Trailer } from '@/models/models'
import React, { useEffect, useState } from 'react'

const GameDetailsPage = ({ params }: any) => {
    const id = params.id
    const [game, setGame] = useState<Game | null>(null)
    const [gameSS, setGameSS] = useState<Array<Screenshots> | null>(null)
    const [gameTrailers, setGameTrailers] = useState<Array<Trailer> | null>(null)
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
        backgroundImage: `url(${game?.background_image
            ? game.background_image
            : "/images/game-placeholder.webp"})`,
        backgroundSize: "cover",
    }

    // Tabs State
    const [aboutActive, setAboutActive] = useState(true)
    const [ssActive, setSsActive] = useState(false)
    const [trailersActive, setTrailersActive] = useState(false)

    const getScreenshots = async (id: string) => {
        const gameScreenShot = await fetchGameScreenshotsById(id)
        setGameSS(gameScreenShot.results)
    }

    const getTrailers = async (id: string) => {
        const gameTrailerList = await fetchGameTrailersById(id)
        setGameTrailers(gameTrailerList.results)
    }

    useEffect(() => {
        getGame(id)
        getScreenshots(id)
        getTrailers(id)
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

    const GameDetails = () =>
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
                            {
                                (gameSS?.length ?? 0) > 0 &&
                                <li><button className={ssActive ? 'active' : ''} onClick={() => handleTabClick(TABS.SCREESHOTS)}>Screenshots</button></li>}

                            {
                                (gameTrailers?.length ?? 0) > 0 &&
                                < li > <button className={trailersActive ? 'active' : ''} onClick={() => handleTabClick(TABS.TRAILERS)}>Trailers</button></li>
                            }
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
                            {
                                gameSS?.map((screenshots) =>

                                    <img key={screenshots?.image} src={screenshots?.image} alt={screenshots?.image} />

                                )
                            }
                        </div>
                    }
                    {
                        trailersActive &&
                        <div className="trailers-tab">
                            {
                                gameTrailers?.map(
                                    (trailer) =>
                                        <video key={trailer?.data?.max} controls >
                                            <source src={trailer?.data?.max} type="video/mp4" />
                                        </video>
                                )
                            }


                        </div>
                    }
                </div>
            </div >
        </div >

    return (
        <main className='game-details-page'>
            {game ?
                game?.name ? <GameDetails /> : <GameNotFound />
                : <Loading />}
        </main >
    )
}

export default GameDetailsPage