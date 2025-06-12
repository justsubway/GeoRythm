import { useParams } from 'react-router-dom';
import { useGetArtistDetailsQuery, useGetArtistTopSongsQuery } from '../redux/services/shazamCore';
import { Error, Loader, DetailsHeader, RelatedSongs } from '../components';
import { mockArtists, mockSongs } from '../assets/mockData';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { data: artistData, isFetching: isFetchingArtistDetails, error: artistError } = useGetArtistDetailsQuery(artistId);
  const { data: topSongs, isFetching: isFetchingTopSongs, error: topSongsError } = useGetArtistTopSongsQuery(artistId);

  if (isFetchingArtistDetails || isFetchingTopSongs) return <Loader title="Loading artist details..." />;

  // Use mock data if there's an error or no data
  const displayArtistData = artistError || !artistData ? mockArtists[0] : artistData;
  const displayTopSongs = topSongsError || !topSongs ? mockSongs : topSongs;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={displayArtistData} />

      <div className="bg-white/10 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold text-white mb-2">About This Demo</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          This section showcases the artist details feature of our music platform. In a production environment, 
          it would display comprehensive artist information and their top songs from the Shazam Core API. 
          For demonstration purposes, we're using carefully selected mock data to showcase the application's capabilities.
        </p>
      </div>

      <RelatedSongs
        data={displayTopSongs}
        artistId={artistId}
        isPlaying={false}
        activeSong={{}}
        handlePauseClick={() => {}}
        handlePlayClick={() => {}}
      />
    </div>
  );
};

export default ArtistDetails;
