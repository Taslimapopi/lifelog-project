import React from 'react';
import Lessons from '../../Components/Form/Home/Lessons';
import WhyLearningMatters from '../../Components/Form/Home/WhyLearningMatters';
import SimpleImageSlider from '../../Components/Form/Home/HeroSection';
import FeaturedLessons from '../../Components/Form/Home/FeaturedLessons';
import TopContributors from '../../Components/Form/Home/TopContributors';


const Home = () => {
    return (
        <div>
        
            
            <SimpleImageSlider></SimpleImageSlider>
            
            <FeaturedLessons></FeaturedLessons>
            <WhyLearningMatters></WhyLearningMatters>
            <TopContributors></TopContributors>
            {/* <Lessons></Lessons> */}
           
        </div>
    );
};

export default Home;