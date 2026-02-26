import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function sidebar() {

    const navItems = [
        {
            name: "Home",
            path: "/home",
            icon: <HomeImage />
        }
    ]

    return (
        <div>

        </div>
    )
}

export default sidebar