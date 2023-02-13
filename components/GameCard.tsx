import { Game } from "@/models/models";
import React from "react";
type GameDetails = {
    game: Game;
};
const GameCard = (props: GameDetails) => {
    const game: Game = props.game;

    return (
        <div className="game-card">
            <div className="game-img">
                <img
                    src={
                        game?.background_image
                            ? game.background_image
                            : "/images/game-placeholder.webp"
                    }
                    alt={game?.slug}
                />
            </div>
            <div className="game-details">
                <h2 className="game-heading">{game?.name}</h2>
                <div className="game-platforms">
                    <ul>
                        {game?.parent_platforms.map((parent_platform) => (
                            <li key={parent_platform.platform.name}>
                                <img
                                    src={`/images/platforms/${parent_platform.platform.name.toLowerCase()}.svg`}
                                    alt={parent_platform.platform.name}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default GameCard;
