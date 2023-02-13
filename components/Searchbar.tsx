'use client'

import { useGame } from "@/hooks/useGame";
import { fetchGamesBySearch } from "@/models/controller";
import React, { useState } from "react";

const Searchbar = () => {
    const [value, setValue] = useState('');
    const { setGame } = useGame()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setValue('')
        const response: any = await fetchGamesBySearch(value)
        setGame(response ? response.results : [])
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search 500,000+ games"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default Searchbar;
