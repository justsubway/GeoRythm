import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { mockSongs, mockArtists } from '../../assets/mockData';

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY);
            headers.set('X-RapidAPI-Host', import.meta.env.VITE_SHAZAM_CORE_RAPID_API_HOST);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({
            query: () => '/charts/world?country_code=GR',
            transformResponse: (response) => {
                console.log('API Response:', response);
                return response;
            },
            transformErrorResponse: (error) => {
                console.log('Using mock data due to error:', error);
                return mockSongs;
            }
        }),
        getSongsByGenre: builder.query({
            query: (genre) => `/charts/genre-world?genre_code=${genre}`,
            transformResponse: (response) => response,
            transformErrorResponse: () => mockSongs
        }),
        getSongsByCountry: builder.query({
            query: (countryCode) => `/charts/country?country_code=${countryCode}`,
            transformResponse: (response) => response,
            transformErrorResponse: () => mockSongs
        }),
        getSongsBySearch: builder.query({
            query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
            transformResponse: (response) => response,
            transformErrorResponse: () => mockSongs
        }),
        getArtistDetails: builder.query({
            query: (artistId) => `/artists/details?artist_id=${artistId}`,
            transformResponse: (response) => response,
            transformErrorResponse: () => mockArtists[0]
        }),
        getSongDetails: builder.query({
            query: (songid) => `/tracks/details?track_id=${songid}`,
            transformResponse: (response) => response,
            transformErrorResponse: () => mockSongs[0]
        }),
        getSongRelated: builder.query({
            query: (songid) => `/tracks/related?track_id=${songid}`,
            transformResponse: (response) => response,
            transformErrorResponse: () => mockSongs
        }),
        getArtistTopSongs: builder.query({
            query: (artistId) => `/artists/top-songs?artist_id=${artistId}`,
            transformResponse: (response) => response,
            transformErrorResponse: () => mockSongs
        }),
        getTopArtists: builder.query({
            query: () => '/charts/world?country_code=GR',
            transformResponse: (response) => response,
            transformErrorResponse: () => mockArtists
        })
    })
});

export const {
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
    useGetArtistDetailsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistTopSongsQuery,
    useGetTopArtistsQuery
} = shazamCoreApi;