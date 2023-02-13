import { Game } from "@/models/models";
import { createContext, useContext, useState } from "react";

const GameContext = createContext<any>(null);

export const GameProvider = ({ children }: any) => {
    const [game, setGame] = useState<Array<Game> | null>(null)

    return <GameContext.Provider value={{ game, setGame }}>{children}</GameContext.Provider>
}


export const useGame = () => useContext(GameContext)