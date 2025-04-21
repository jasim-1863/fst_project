import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Blood Donation App',
  description: 'Find blood donation requests and connect with donors',
  keywords: 'blood donation, blood donor, blood request, hospital, blood bank',
};

export default Meta; 