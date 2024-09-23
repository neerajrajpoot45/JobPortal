export const deleteJob = (jobId) => {
    return {
      type: 'DELETE_JOB',
      payload: jobId,
    };
  };