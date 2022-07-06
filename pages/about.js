
import AboutBanner from "../modules/AboutBanner";
import Accordian from "../modules/Accordian";
import Counter from "../modules/Counter";
import Footer from "../modules/Footer";
import JoinCommunityBanner from "../modules/JoinCommunityBanner";
import Newsletter from "../modules/Newsletter";
import OurPillars from "../modules/OurPillars";


export default function about() {
    return (
        <>  
            <AboutBanner></AboutBanner>
            <Counter></Counter>
            <OurPillars></OurPillars>
            <JoinCommunityBanner></JoinCommunityBanner>
            <Accordian></Accordian>
            <Newsletter></Newsletter>
            <Footer></Footer>
        </>
    );
}