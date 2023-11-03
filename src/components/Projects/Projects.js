import React from 'react';
import './Projects.css';

const Projects = ({ user } ) => {
  const projectsDisplay = user?.posts?.map(post => (
    <div key={post.id} className='single-project'>
      <h3>🎨 Project: {post.title}</h3>
      <p>Details: {post.details}</p>
      <p>Requested Amount: ${post.requestedAmount}</p>
      <p>Amount Raised: ${post.currentAmount}</p>
  </div> 
  ));

  return <div className='single-projects-container'>{projectsDisplay}</div>;
};

export default Projects;
