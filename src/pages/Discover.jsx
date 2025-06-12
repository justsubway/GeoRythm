import {useDispatch, useSelector} from "react-redux";

import { Error, Loader, SongCard, TopPlay} from '../components';
import { genres} from '../assets/constants';
import { mockSongs } from '../assets/mockData';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = () => {
    const { data, isFetching, error } = useGetTopChartsQuery();
    const genreTitle = 'Pop';

    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state) => state.player);

    console.log('Discover Component - Data:', data);
    console.log('Discover Component - Error:', error);
    console.log('Discover Component - IsFetching:', isFetching);

    // Use mock data if there's an error or no data
    const displayData = error || !data ? mockSongs : data;

    // Only show loader if we're actually fetching and don't have mock data
    if(isFetching && !error && !data) return <Loader title="Loading songs..."/>;

    return(
        <div className="flex flex-col">
            <div className="w-full flex justify-between-items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
                <select onChange={() => {}} value="" className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5">
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>

            <div className="bg-white/10 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">About This Demo</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    This application is designed to showcase a full-featured music streaming platform that integrates with the Shazam Core API. 
                    In a production environment, it would provide real-time access to global music charts, artist details, and song information. 
                    However, due to the significant costs associated with maintaining a production-grade API subscription, this demo version 
                    utilizes carefully selected mock data to demonstrate the application's capabilities and user experience.
                </p>
                <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                    The mock data features selected tracks from Greek artists, demonstrating the application's ability to handle various 
                    music formats and metadata. All core functionality, including music playback, artist navigation, and search capabilities, 
                    remains fully operational in this demo version.
                </p>
            </div>

            <div className="flex xl:flex-row flex-col-reverse">
                <div className="flex-1 h-fit pb-40">
                    <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                        {displayData?.map((song, i) => {
                            console.log('Rendering song:', song);
                            return (
                                <SongCard
                                    key={song.key}
                                    song={song}
                                    isPlaying={isPlaying}
                                    activeSong={activeSong}
                                    data={displayData}
                                    i={i}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="xl:sticky relative top-0 h-fit">
                    <TopPlay />
                </div>
            </div>
        </div>
    );
};

export default Discover;
