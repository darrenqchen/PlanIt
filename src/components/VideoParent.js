/* eslint-disable react/prop-types */
import React from 'react'
import VideoBackground from './VideoBackground'

const VideoParent = ({ background, eco }) => {
    if (!eco) {
        return (
            <VideoBackground
                videoRef={background.url}
                style={{
                margin: 0,
                padding: 0,
                position: 'absolute',
                margin: 0,
                objectFit: 'cover'
                }}
            ></VideoBackground>
        )
    }
    else {
        return (
            <img src={background.fallback}></img>
        )
    }
    
}

export default VideoParent