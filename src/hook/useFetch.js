import React, {useEffect, useState} from 'react';

const UseFetch = (arg) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)


    const fetchData = async () => {

        try {
            await fetch(arg)
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json()
                })
                .then(data => {
                    setData(data)
                    setError(null)
                    setIsLoading(false)
                })
        } catch (err) {
            setIsLoading(false)
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, [arg])

    const refetch =  (params) => {
        fetchData()
            .then(data => {
                setData(data)
            })
            .catch(error => {
                setError(error.message)
            })

    }

    return {error, data, isLoading, refetch}

};

export default UseFetch;