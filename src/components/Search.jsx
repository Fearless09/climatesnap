import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AsyncPaginate } from 'react-select-async-paginate'
import { geoApiOptions, geoApiUrl } from '../api'

function Search({ defaultFunction, setLoading, onSearchChange }) {
    // onSearchChange
    const [search, setSearch] = useState(null)

    const navigate = useNavigate()
    const handleChange = (searchData) => {
        setLoading(true)
        setSearch(searchData)
        // console.log(searchData)
        onSearchChange(searchData)
        navigate(`/city/${searchData.label}?${searchData.value}`) 
        defaultFunction()
    }

    const loadOptions = (inputValue) => {
        return fetch(
            `${geoApiUrl}/cities?minPopulation=100000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                return {
                    options: response.data.map(city => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name} ${city.countryCode}`
                        }
                    })
                }
            })
            .catch (error => console.log(error))
    }

    return (
        <AsyncPaginate 
            placeholder='Search for city'
            debounceTimeout={600}
            value={search}
            onChange={handleChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search
