/* eslint-disable react/prop-types */
import React from 'react'

const VideoBackground = ({ videoRef }) => {

  return (
    <video
      width={'100%'}
      height={'100%'}
      src={videoRef}
      autoPlay
      loop
      muted 
      style={{
        objectFit: "cover"
      }}
    />
  )
}

export default VideoBackground