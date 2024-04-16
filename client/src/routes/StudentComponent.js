import SideBar from '../components/navBars/Sidebar';
import Heading from '../components/navBars/Heading';
import UpperNav from '../components/navBars/UpperNav';

import Home from '../components_student/mainPage/Home';
import FormOption from '../components_student/forms/FormOption';
import FormInputIndia from '../components_student/forms/india/FormInputIndia';
import FormInputAbroad from '../components_student/forms/abroad/FormInputAbroad';
import Profile from '../components_student/profile/Profile';
import Applications from '../components_student/applications/Applications';
import ViewApplication from '../components_student/applications/ViewApplication';
import Footer from '../components_student/Side/Footer'
import FormSettlementData from '../components_student/forms/settlement/FormSettlementData';
import Archive from '../components_student/archive/Archive';


export const StudentHomePage =
    <>
        <UpperNav />
        <div className='flex'>
            <div className='bg-dark-purple'>
            <SideBar />
            </div>

            <div style={{ flex: 1, width: '100%' }}>
            <Heading />
            <Home />
            </div>
        </div>
        <Footer />
    </>

export const StudentFormOption =
    <>
        <UpperNav />
        <div className='flex'>
            <SideBar />
            <FormOption />
        </div>
        <Footer />
    </>

export const StudentFormIndia =
    <>
        <UpperNav />
        <div className='flex'>
            <SideBar />
            <FormInputIndia />
        </div>
        <Footer />
    </>

export const StudentFormAbroad =
    <>
        <UpperNav />
        <div className='flex'>
            <SideBar />
            <FormInputAbroad />
        </div>
        <Footer />
    </>
export const StudentFormSettlement =
    <>
        <UpperNav />
        <div className='flex'>
            <SideBar />
            <FormSettlementData />
        </div>
        <Footer />
    </>
export const StudentProfile =
    <>
        <UpperNav />
        <div className='flex'>
            <SideBar />
            <Profile />
        </div>
        <Footer />
    </>

export const StudentApplicationsPage =
    <>
        <UpperNav />
        <div className='flex'>
            <SideBar />
            <Applications />
        </div>
        <Footer />
    </>

export const StudentSpecficApplication =
    <>
        <UpperNav />
        <div className='flex'>
            <SideBar />
            <ViewApplication />
        </div>
        <Footer />
    </>


export const StudentArchive =
    <>
        <UpperNav />
        <div className='flex'>
            <SideBar />
            <Archive />
        </div>
        <Footer />
    </>