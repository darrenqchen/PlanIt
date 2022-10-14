import React, { useState, useEffect } from 'react'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'


const LandingPage = () => {
    const [activeBackground, setActiveBackground] = useState("")
    const potentialBackgrounds = ['/chichenitza.jpg', '/chichenitza.jpg', '/chichenitza.jpg']

    useEffect(() => {
        setActiveBackground(potentialBackgrounds[Math.floor(Math.random() * potentialBackgrounds.length)])
    })

    return (
        <div
            style={
                {
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), 
                url(${activeBackground})`,
                
                    backgroundSize: "cover",
                    height: "100vh"
                }
            }
        >
            <Stack paddingTop={25} paddingLeft={30}>
                <Typography variant="h1" color="text.secondary">planit</Typography>
            </Stack>
        </div>
    )
}


export default LandingPage;