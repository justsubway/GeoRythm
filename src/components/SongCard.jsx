import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import PlayPause from './PlayPause'
import {playPause, setActiveSong} from "../redux/features/playerSlice";

const SongCard = ({song, isPlaying, activeSong, i, data}) => {
    const dispatch = useDispatch();
    
    console.log('SongCard - Received song:', song);
    
    const handlePauseClick = () => {
        console.log('Pause clicked');
        dispatch(playPause(false));
    };

    const handlePlayClick = () => {
        console.log('Play clicked', { song, data, i });
        dispatch(setActiveSong({song, data, i}));
        dispatch(playPause(true));
    };

    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
            <div className="relative w-full h-56 group">
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300">
                    <PlayPause
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        song={song}
                        handlePause={handlePauseClick}
                        handlePlay={handlePlayClick}
                    />
                </div>

                <img
                    alt={song?.attributes?.name || song?.title}
                    src={song?.attributes?.artwork?.url?.replace('{w}x{h}', '440x440') || song?.images?.coverart}
                    className="w-full h-full rounded-lg"
                />
            </div>

            <div className="mt-4 flex flex-col">
                <p className="font-semibold text-lg text-white truncate">
                    <Link to={`/songs/${song?.id || song?.key}`}>
                        {song?.attributes?.name || song?.title}
                    </Link>
                </p>
                <p className="text-sm truncate text-gray-300 mt-1">
                    <Link to={song?.relationships?.artists?.data?.[0]?.id ? `/artists/${song.relationships.artists.data[0].id}` : '/top-artists'}>
                        {song?.attributes?.artistName || song?.subtitle}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SongCard;
