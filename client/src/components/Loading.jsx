import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div>
    <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#E93655"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>
  )
}

export default Loading