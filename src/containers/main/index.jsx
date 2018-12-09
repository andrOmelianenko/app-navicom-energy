import React from 'react';
import {
  MainSection,
  ServicesSection,
  ContactsSection,
} from '../../components/main_sections';
import Scroll from '../../components/scroll';

const MainContainer = () => (
  <Scroll>
    <MainSection />
    <ServicesSection />
    <ContactsSection />
  </Scroll>
);

export default MainContainer;
