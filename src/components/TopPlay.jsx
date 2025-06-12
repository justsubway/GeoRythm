import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Error, Loader, ArtistCard } from '../components';
import { mockSongs, mockArtists } from '../assets/mockData';

const TopPlay = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  // Use mock data if there's an error or no data
  const displayData = error || !data ? mockSongs : data;
  const topArtists = error || !data ? mockArtists : data?.slice(0, 5);

  return (
    <div className="xl:flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <p className="text-gray-300 text-base cursor-pointer">See more</p>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topArtists?.map((track, i) => (
            <div key={`${track.adamid}-${i}`} className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
              <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
              <div className="flex-1 flex flex-row justify-between items-center">
                <img
                  className="w-20 h-20 rounded-lg"
                  src={track?.images?.coverart}
                  alt={track?.subtitle}
                />
                <div className="flex-1 flex flex-col justify-center mx-3">
                  <p className="text-xl font-bold text-white">
                    {track?.subtitle}
                  </p>
                  <p className="text-base text-gray-300 mt-1">
                    {track?.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <p className="text-gray-300 text-base cursor-pointer">See more</p>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {displayData?.slice(0, 5).map((track, i) => (
            <div key={`${track.key}-${i}`} className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
              <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
              <div className="flex-1 flex flex-row justify-between items-center">
                <img
                  className="w-20 h-20 rounded-lg"
                  src={track?.images?.coverart}
                  alt={track?.title}
                />
                <div className="flex-1 flex flex-col justify-center mx-3">
                  <p className="text-xl font-bold text-white">
                    {track?.title}
                  </p>
                  <p className="text-base text-gray-300 mt-1">
                    {track?.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPlay;
