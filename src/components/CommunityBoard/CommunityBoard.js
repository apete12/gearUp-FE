import './CommunityBoard.css'
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { LOAD_ARTISTS } from '../../GraphQL/Queries';
import DonationCard from '../DonationCard/DonationCard'
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import Filter from '../Filter/Filter';


const CommunityBoard = () => {
    const { loading, error, data, refetch } = useQuery(LOAD_ARTISTS);
    const [donations, setDonations] = useState({})
    const [noDonationsSearch, setNoDonationsSearch] = useState(false)
    const [firstProjectSearch, setFirstProjectSearch] = useState(false)

    useEffect(() => {
      refetch()
      if (!loading && data) {
        setDonations(data)
      }
    },[loading, error, data, refetch])

    if (loading) return <Loading/>
    
    if (error) {
      console.error('Error fetching data:', error)
      return <Error error={error}/>
    }

    const artistsWithFilteredPosts = data && donations?.artists?.map(artist => {

      let filteredPosts = artist.posts;
      if (noDonationsSearch) {
        filteredPosts = artist.posts.filter(post => post.currentAmount === 0)
      }

      if (firstProjectSearch) {
        filteredPosts = artist.posts.filter((post, index) => index === 0 && post.currentAmount === 0)
      }
      return {
        ...artist,
        posts: filteredPosts,
      };
    });

    console.log(artistsWithFilteredPosts)

    // const artistsWithFilteredPosts = data && donations?.artists?.map(artists => ({
    //   ...artists,
    //   posts: artists.posts.filter(post => post.requestedAmount > post.currentAmount)
    // }))

      const allDonationRequests = artistsWithFilteredPosts?.map( user => {
        return (<DonationCard key={user.id} user={user} />)
      })

      return (
        <div className='community-board-container'>
        <Filter setNoDonationsSearch={setNoDonationsSearch} setFirstProjectSearch={setFirstProjectSearch} noDonationsSearch={noDonationsSearch} firstProjectSearch={firstProjectSearch}/>
        <div className='all-donation-requests-container'>{allDonationRequests}</div>
        </div>
      )
}

export default CommunityBoard