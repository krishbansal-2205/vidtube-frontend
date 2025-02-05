import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllVideos } from '../store/slices/videoSlice'
import VideoCard from '../components/VideoCard';
import HomeSkeleton from './HomeSkeleton';

function Home() {
    const dispatch = useDispatch();
    const videos = useSelector(state => state.video.videos);
    const loading = useSelector(state => state.video.loading);

    useEffect(() => {
        dispatch(getAllVideos({ page: 1, limit: 10 }));
    }, [dispatch]);

    return (
        loading ? (
            <HomeSkeleton />
        ) : (
            <div className="flex flex-wrap justify-center gap-4 p-4">
                {videos.map(video => (
                    <VideoCard key={video._id} {...video} />
                ))}
            </div>
        )
    )
}

export default Home