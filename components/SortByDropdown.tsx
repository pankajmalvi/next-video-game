'use client'
import React from 'react'

const SortByDropdown = (props: any) => {

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        props.sortGamesBy(e.target.value)
    }
    return (
        <select name="sort-by" className="sort-by" onChange={handleChange}>
            <option value="name">Name</option>
            <option value="-released">Released</option>
            <option value="-added">Added</option>
            <option value="-created">Created</option>
            <option value="-updated">Updated</option>
            <option value="-rating">Rating</option>
            <option value="-metacritic">Metacritic</option>
        </select>
    )
}

export default SortByDropdown