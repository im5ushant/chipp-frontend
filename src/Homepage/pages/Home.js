import React from 'react';

// import MainNavigation from '../../shared/components/NavBar/MainNavigation';
import About from '../components/About';
import Slider from '../components/Slider';
import Notice from '../components/Notice';
// import DonorSection from '../components/DonorSection';
// import CreateSection from '../components/CreateSection';
import FundraiserSection from '../components/FundraiserSection';
import Footer from '../../shared/components/Footer/Footer';

const Home = () => {
    return (
    <>
    <div className="home_main-container">
        {/* <MainNavigation /> */}
        <Slider />
        <Notice />
        <About />
        {/* <DonorSection /> */}
        {/* <CreateSection /> */}
        {/* <FundraiserSection /> */}
    </div>
    </>
    )
}

export default Home;