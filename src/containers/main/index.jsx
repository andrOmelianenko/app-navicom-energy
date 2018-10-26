import React from 'react';
import {
  MainSection,
  ServicesSection,
  ProjectsSection,
  ContactsSection,
} from '../../components/main_sections';
import Scroll from '../../components/scroll';

const MainContainer = () => (
  <Scroll>
    <MainSection />
    <ServicesSection />
    <ProjectsSection />
    <ContactsSection />
  </Scroll>
);

export default MainContainer;
