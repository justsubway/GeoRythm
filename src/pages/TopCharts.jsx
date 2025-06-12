import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import { Error, Loader, SongCard } from '../components';
import { mockSongs } from '../assets/mockData';

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Loading top charts..." />;

  // Use mock data if there's an error or no data
  const displayData = error || !data ? mockSongs : data;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Charts</h2>

      <div className="bg-white/10 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">About This Demo</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          This section showcases the top charts feature of our music platform. In a production environment, 
          it would display real-time global music charts from the Shazam Core API. For demonstration purposes, 
          we're using carefully selected mock data to showcase the application's capabilities.
        </p>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {displayData?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={false}
            activeSong={{}}
            data={displayData}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
