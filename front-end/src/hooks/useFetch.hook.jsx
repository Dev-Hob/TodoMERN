import {useEffect, useState} from "react"
import axios from "axios"
import instance from "../utils/axios.instance"

export default function useFetch(url, method, url_data) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [retry, setRetry] = useState(1)

    const axiosbody = {
        url: url,
        method: method,
        data: url_data,
        }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            
            try{
                const res = await instance(axiosbody)
                setData(res.data)
            } catch(err){
                setError(err)
            }
            setLoading(false)
        };
        fetchData();
    }, [])

  const reFetch = async () => {
    setLoading(true)
    setRetry(retry+1)
    try{
        const res = await instance(axiosbody)
        setData(res.data)
    } catch(err){
        setError(err)
    }
    setLoading(false)
  }

  return {data, loading, retry, error, reFetch}
}
