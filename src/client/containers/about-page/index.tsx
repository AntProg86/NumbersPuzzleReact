import React from 'react';
import './styles.scss';

import LocalizedStrings from '../../components/language/localization';

const AboutPage: React.FunctionComponent = () => {

  return (
    <div className="about-page">
      <div>{LocalizedStrings._about}</div>
    </div>
  );
};
    
export default AboutPage;