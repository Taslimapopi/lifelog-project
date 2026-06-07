import React from 'react';
import Lessons from '../../Components/Form/Home/Lessons';
import WhyLearningMatters from '../../Components/Form/Home/WhyLearningMatters';
import SimpleImageSlider from '../../Components/Form/Home/HeroSection';
import FeaturedLessons from '../../Components/Form/Home/FeaturedLessons';
import TopContributors from '../../Components/Form/Home/TopContributors';
import LifeLogFAQ from "../../Components/Form/Home/LifeLogFAQ";
import HomepageStats from './HomepageStats';
import PricingPlans from '../../Components/Form/Home/PricingPlans';
import InteractiveMoodFinder from '../../Components/Form/Home/InteractiveMoodFinder';
import QuoteOfTheDay from './QuoteOfTheDay';


const Home = () => {
    return (
        <div>
        
            
            <SimpleImageSlider></SimpleImageSlider>
            
            <FeaturedLessons></FeaturedLessons>
            <QuoteOfTheDay></QuoteOfTheDay>
            <InteractiveMoodFinder></InteractiveMoodFinder>
            <WhyLearningMatters></WhyLearningMatters>
            <TopContributors></TopContributors>
            <HomepageStats></HomepageStats>
            <PricingPlans></PricingPlans>
            <LifeLogFAQ></LifeLogFAQ>
            {/* <Lessons></Lessons> */}
           
        </div>
    );
};

export default Home;