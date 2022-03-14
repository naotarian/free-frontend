import React,{ useState, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'
const Matters = () => {
  const router = useRouter()
  useEffect(() => {
    let token = window.localStorage.getItem('token')
    axios.post(`${process.env.NEXT_PUBLIC_API}api/get_matters`,router.category, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((response) => {
      console.log(response)
    }).catch(error => {
      const {
        status,
        statusText
      } = error.response
    })
  }, [])
  return(
    <>
      test
    </>
  )
}
export default Matters