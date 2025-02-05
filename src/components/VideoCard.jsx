import React from 'react'

function VideoCard({
    thumbnail, title, views, owner, duration
}) {
    return (
        <div className="card card-compact bg-base-100 md:w-96 w-72  cursor-pointer">
            <figure className='relative'>
                <img
                    src={thumbnail}
                    className=''
                    alt={title} />
                <span className='absolute bottom-2 right-2 text-white rounded-lg px-2 py-1 bg-zinc-800 opacity-75'>{duration} secs</span>
            </figure>
            <div className="card-body">
                <div className='flex gap-8'>
                    <div >
                        <img
                            alt={owner.username}
                            src={owner.avatar}
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                    <div>
                        <h2 className="card-title">{title}</h2>
                        <p>{owner.username}</p>
                        <p>{views} views</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard