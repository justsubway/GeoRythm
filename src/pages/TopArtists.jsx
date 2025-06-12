import { useGetTopArtistsQuery } from '../redux/services/shazamCore';
import { Error, Loader, ArtistCard } from '../components';
import { mockArtists } from '../assets/mockData';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopArtistsQuery();

  if (isFetching) return <Loader title="Loading top artists..." />;

  // Use mock data if there's an error or no data
  const displayData = error || !data ? mockArtists : data;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>

      <div className="bg-white/10 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">About This Demo</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          This section showcases the top artists feature of our music platform. In a production environment, 
          it would display real-time data from the Shazam Core API. For demonstration purposes, we're using 
          carefully selected mock data to showcase the application's capabilities.
        </p>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {displayData?.map((track) => (
          <ArtistCard
            key={track.adamid}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
