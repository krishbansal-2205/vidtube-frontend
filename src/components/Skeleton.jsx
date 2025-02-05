import React from 'react'

function Skeleton() {
    return (
        <div className="flex w-72 flex-col gap-4 p-4">
            <div className="skeleton h-36 w-full"></div>
            <div className="skeleton h-5 w-28"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
        </div>
    )
}

export default Skeleton