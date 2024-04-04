import React from 'react';
import { Route, Routes } from 'react-router-dom';

//          Protected Routes
import StudentRoute from './routes/StudentRoute';

//                  Other Components
import LoginN from './components_login/LoginN';
import Team from './components/team/Team';
import ErrorPage from './components/sidePages/ErrorPage';
import LandingPage from './components/sidePages/LandingPage';
import ContactUs from './components/sidePages/ContactUs';
import UpperNav from './components/navBars/UpperNav';
import SideBar from './components/navBars/Sidebar';


//                  Faculty Side Components
import FacultyHome from './components_faculty/mainPage/FacultyHome';
import FacultyApplication from './components_faculty/applications/Application';
import ViewApplicationFaculty from './components_faculty/applications/ViewApplication';

//                  HOD side Components
import HodHome from './components_hod/mainPage/HodHome';
import HodApplication from './components_hod/applications/Application';
import ViewApplicationHod from './components_hod/applications/ViewApplication';

//                  Research Section Components 
import ResearchHome from './components_research//mainPage/ResearchHome';
import ResearchApplication from './components_research/applications/Application';
import ResearchStudent from './components_research/users/ResearchStudent';
import ResearchFaculty from './components_research/users/ResearchFaculty';
import ViewApplicationResearch from './components_research/applications/ViewApplication';


//                Accounts Section Components
import AccountHome from './components_account/mainPage/Home';
import AccountApplication from './components_account/applications/Application';
import ViewApplicationAccount from './components_account/applications/ViewApplication';

//                Dean Components
import DeanHome from './components_dean/mainPage/DeanHome';
import DeanApplication from './components_dean/applications/Application';
import ViewApplicationDean from './components_dean/applications/ViewApplication';

//                 User Guide
import UserGuide from './userGuide/UserGuide';

import {
  StudentFormAbroad, StudentFormIndia,
  StudentFormOption,
  StudentHomePage, StudentProfile,
  StudentApplicationsPage, StudentSpecficApplication, StudentFormSettlement,
  StudentArchive
} from './routes/StudentComponent';
import Footer from './components_student/Side/Footer';
import ResearchHere from './components/sidePages/ResearchHere';

import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
      />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginN />} />
        <Route path='/userGuide' element={<UserGuide />} />
        <Route path='/researchInfo' element={<ResearchHere />} />
        <Route path='/studentLogin' >
          <Route index element={<StudentRoute Component={StudentHomePage} />} />
          <Route path="formFill" element={<StudentRoute Component={StudentFormOption} />} />
          <Route path="formIndia" element={<StudentRoute Component={StudentFormIndia} />} />
          <Route path="formAbroad" element={<StudentRoute Component={StudentFormAbroad} />} />
          <Route path="profile" element={<StudentRoute Component={StudentProfile} />} />
          <Route path="application" element={ <StudentRoute Component={StudentApplicationsPage} />} />
          <Route path="viewApplication" element={ <StudentRoute Component={StudentSpecficApplication} />} />
          <Route path="formSettlement" element={<StudentRoute Component={StudentFormSettlement} />} />
          <Route path="archive" element={<StudentRoute Component={StudentArchive} />} />
        </Route>

        <Route path='/facultyLogin'>
          <Route index element={<>
            <UpperNav />
            <div className='flex h-full'>
              <div className='bg-dark-purple'>
                <SideBar />
              </div>
              <div style={{ flex: 1, width: '100%' }}>
                <FacultyHome />
              </div>
            </div>
            <Footer />
          </>} />

          <Route path='application' element={<>
            <UpperNav />
            <div className='flex'>
              <SideBar />
              <FacultyApplication />
            </div>
            <Footer />
          </>} />

          <Route path='studentApplication' element={<>
            <UpperNav />
            <div className='flex'>
              <SideBar />
              <ViewApplicationFaculty />
            </div>
            <Footer />
          </>} />
        </Route>
        <Route path='/hodLogin'>
          <Route index element={<>
            <UpperNav />
            <div className='flex h-full'>
              <div className=' bg-dark-purple'>
                <SideBar />
              </div>
              <div style={{ flex: 1, width: '100%' }}>
                <HodHome />
              </div>
            </div>
            <Footer />
          </>} />

          <Route path='application' element={<>
            <UpperNav />
            <div className='flex'>
              <SideBar />
              <HodApplication />
            </div>
            <Footer />
          </>} />

          <Route path='studentApplication' element={<>
            <UpperNav />
            <div className='flex'>
              <SideBar />
              <ViewApplicationHod />
            </div>
            <Footer />
          </>} />
        </Route>

        <Route path='/researchLogin'>
          <Route index element={
            <>
              <UpperNav />
              {/* <div className='flex'>
                <SideBar />
                
              </div> */}
              <div className='flex h-full'>
                <div className='bg-dark-purple'>
                  <SideBar />
                </div>
                <div style={{ flex: 1, width: '100%' }}>
                  <ResearchHome />
                </div>
              </div>
              <Footer />
            </>} />
          <Route path="application" element={
            <>
              <UpperNav />
              <div className='flex'>
                <SideBar />
                <ResearchApplication />
              </div>
              <Footer />
            </>} />
          <Route path="student" element={
            <>
              <UpperNav />
              <div className='flex'>
                <SideBar />
                <ResearchStudent />
              </div>
              <Footer />
            </>} />
          <Route path="faculty" element={
            <>
              <UpperNav />
              <div className='flex'>
                <SideBar />
                <ResearchFaculty />
              </div>
              <Footer />
            </>} />
          <Route path="studentApplication" element={
            <div className="min-h-screen w-full relative">
              <UpperNav />
              <div className='flex'>
                <SideBar />
                <ViewApplicationResearch />
              </div>
              <Footer />
            </div>} />
        </Route>


        <Route path='/accountLogin'>
          <Route index element={
            <>
              <UpperNav />
              <div className='flex h-full'>
                <div className='bg-dark-purple'>
                  <SideBar />
                </div>
                <div style={{ flex: 1, width: '100%' }}>
                  <AccountHome />
                </div>
              </div>
              <Footer />
            </>} />
          <Route path="application" element={
            <>
              <UpperNav />
              <div className='flex'>
                <SideBar />
                <AccountApplication />
              </div>
              <Footer />
            </>} />

          <Route path="studentApplication" element={
            <div className="min-h-screen w-full relative">
              <UpperNav />
              <div className='flex'>
                <SideBar />
                <ViewApplicationAccount />
              </div>
              <Footer />
            </div>} />
        </Route>

        <Route path='/deanLogin'>
          <Route index element={<>
            <UpperNav />
            <div className='flex h-full'>
              <div className='bg-dark-purple'>
                <SideBar />
              </div>
              <div style={{ flex: 1, width: '100%' }}>
                <DeanHome />
              </div>
            </div>
            <Footer />
          </>} />

          <Route path='application' element={<>
            <UpperNav />
            <div className='flex'>
              <SideBar />
              <DeanApplication />
            </div>
            <Footer />
          </>} />

          <Route path='studentApplication' element={<>
            <UpperNav />
            <div className='flex'>
              <SideBar />
              <ViewApplicationDean />
            </div>
            <Footer />
          </>} />
        </Route>



        <Route path='/meetTheTeam' element={<Team />} />
        <Route path='/contactUs' element={<ContactUs />} />

        <Route path='*' element={<ErrorPage />} />

      </Routes >
    </>
  );
}


export default App;