import React, { useState, useEffect } from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const LatestJobs = () => {
  const allJobs = useSelector((store) => store.job.allAdminJobs);
  const { category } = useParams(); // Get the current category from the URL params
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if (allJobs && allJobs.length > 0) {
      setLoading(false);
      // Filter jobs based on the current category
      const filteredJobs = allJobs.filter((job) => job.category === category);
      setFilteredJobs(filteredJobs);
    }
  }, [allJobs, category]); // <--- Add category to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!allJobs) {
    console.error('allJobs is null or undefined');
    return <div>Error: Unable to fetch jobs</div>;
  }

  if (filteredJobs.length === 0) {
    console.log('No jobs found in the database for this category');
    return <div>No Job Available in this category</div>;
  }

  return (
    <div className='max-w-7xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'>
        <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings in {category}
      </h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
        {filteredJobs.slice(0, 6).map((job) => (
          <LatestJobCards key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;