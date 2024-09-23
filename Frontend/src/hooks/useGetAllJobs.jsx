import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
    console.log('useGetAllJobs called');
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      console.log('fetchAllJobs called'); // Add a console log statement
      try {
        const query = encodeURIComponent(searchedQuery);
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${query}`, { withCredentials: true });
        console.log('API response:', res.data); // Add a console log statement
        if (res.data.success) {
          console.log('Dispatching setAllJobs action'); // Add a console log statement
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.log('Failed to fetch jobs:', res.data.message);
        }
      } catch (error) {
        // Improved error handling
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      }
    };

    if (searchedQuery) {
      fetchAllJobs();
    }
  }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;