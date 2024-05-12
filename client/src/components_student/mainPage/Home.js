import React, { useState, useEffect } from 'react'
import Sidebar from '../Side/Sidebar';
import Newcomp from '../Side/Newcomp';
import Newcomp3 from '../Side/Newcomp3';
import { FaSort } from 'react-icons/fa';
import { FaMoneyBillAlt } from 'react-icons/fa';
import ApplicationsHome from '../applications/ApplicationsHome';
import { FaChartLine } from 'react-icons/fa';
import FlexPage from '../../components/commonPages/FlexPage';
import { BASE_URL } from '../../components/requests/URL';
import { getUserToken } from '../../components_login/Tokens';
import { Container } from '@mui/material';
import LoaderCard from '../../components/loading/LoaderCard';
import { FaPaperPlane } from 'react-icons/fa';
import { delay } from '../../components/loading/Delay';


const data = [];

function Home(props) {


    const [isLoading, setIsLoading] = useState(true);
    const [studentInfo, setStudentInfo] = useState({});
    const [apps, setApps] = useState(data);


    const getStatus = (code) => {
        if (code === "0")
          return "Faculty";
        else if (code === "1")
          return "Hod Section";
        else if (code === "2")
          return "Research Section";
        else if (code === "3")
          return "Account Section";
        else if (code === "4")
          return "Dean";
        else if (code === "-1")
          return "Faculty Rejected";
        else if (code === "-2")
          return "Hod Section Rejected";
        else if (code === "-3")
          return "Research Section Rejected";
        else if (code === "-4")
          return "Account Section Rejected";
        else if (code === "-5")
          return "Dean Rejected";
        else
          return "Application Approved";
      }

    const getDays = (subDate) => {
        const today = new Date();
        const submitDate = new Date(subDate);

        const days = Math.floor((today - submitDate) / (1000 * 3600 * 24));

        if (days < 1)
            return "Submitted Recently";
        else if (days === 1)
            return ("1 Day Ago");
        else
            return (days + " Days ago");

    }

    const getFinances = (finance) => {
        var totalAmount = 0;

        finance.forEach(element => {
            totalAmount = totalAmount + Number(element.amount);
        });
        return totalAmount;
    }

    async function fetchUserInfo() {
        const response = await fetch(`${BASE_URL}/studentInfoLoading`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getUserToken()}`
            }
        })
        return response.json();
    }


    const getBasicInfo = async (req, res) => {
        try {
            const status = "0";
            const token = getUserToken();
            const resp = await fetch(`${BASE_URL}/studentApplicationView`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: status })
            });
            const data = await resp.json();
            console.log("data");
            console.log(data);
            const { data: data1, data2 } = data;
            setApps(data1[0]);
            console.log("data1");
            console.log(data1);

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBasicInfo().then((resp) => {
            console.log("yoo");

            setIsLoading(false);


        }).catch((e) => {
            console.log(e.message)
        });
    }, []);

    useEffect(() => {
        fetchUserInfo().then((data) => {
            setStudentInfo(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
            <div>
                <Newcomp />
                <div className="container px-10 py-10 mx-5">
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <FaChartLine size={32} style={{ marginRight: '1rem' }} />
                        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"> <span className="underline decoration-dark-purple">Welcome to Student Portal</span></h1>
                    </span>
                </div>
                <div className='px-2 w-full'>
                    <div className='flex flex-col md:flex-row md:gap-6'>
                        <div className="max-w-full md:max-w-md mx-auto rounded overflow-hidden ">
                            <div className="my-5  bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaSort size={32} style={{ marginRight: '0.5rem', color: '#0B1C2C' }} />
                                        <span className='text-lg font-medium'>Your previous applications status:</span>
                                    </span>
                                    <div className="flex">

                                    </div>
                                </div>

                                <div className="p-2">
                                </div>
                            </div>


                            <br />
                            {isLoading ?
                                <Container>
                                    <LoaderCard />
                                </Container>
                                :
                                <Container>
                                    <div className="my-3 flex flex-wrap justify-center gap-4">
                                        {
                                            <>
                                                <div>
                                                    <section className="bg-white dark:bg-gray-900">
                                                        <div className="">
                                                            <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">{apps.nameOfConference}</h2>
                                                            <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white"></p>
                                                            <dl>
                                                                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">{getStatus(apps.status)}</dt>
                                                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">Venue: {apps.venueOfConference}</dd>
                                                                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">Amount Needed: {getFinances(apps.finances)} Rs</dd>
                                                            </dl>
                                                            <dl className="flex items-center space-x-6">
                                                                <div>
                                                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Submission status</dt>
                                                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{getDays(apps.createdAt)}</dd>
                                                                </div>
                                                                <div>
                                                                    <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Category</dt>
                                                                    <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">India</dd>
                                                                </div>
                                                            </dl>
                                                            <div className="pb-4 flex items-center space-x-4">
                                                                <button type="button" className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                                                    <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                                                                    Edit
                                                                </button>
                                                                {/* <button type="button" name={item._id}
                                                                    onClick={viewSpecficApplication} className="inline-flex items-center text-white bg-dark-purple hover:bg-button-hover-blue hover:text-teal-400 focus:ring-4 focus:outline-none focus:ring-button-hover-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-button-hover-blue dark:hover:bg-button-hover-blue dark:focus:ring-button-hover-blue">
                                                                    <FaPaperPlane style={{ marginRight: '0.5rem' }} />
                                                                    View Full Application
                                                                </button>  */}
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                                <br />
                                            </>
                                        }
                                    </div>
                                </Container>
                            }

                            {/* <ApplicationsHome /> */}
                        </div>
                        <div className="max-w-full md:max-w-md mx-auto">
                            <div className="my-5  bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaMoneyBillAlt size={32} style={{ marginRight: '1rem' }} />
                                        <span className='text-lg font-medium'>Your current finances </span>
                                    </span>
                                    <div className="flex">

                                    </div>
                                </div>
                                <div className="px-4">
                                    <div className="my-5 p-8 space-y-3 border-2 border-dark-purple dark:border-dark-purple rounded-xl">
                                        <span className="inline-block text-dark-purple dark:text-dark-purple">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                            </svg>
                                        </span>

                                        <h2 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Available Balance: {studentInfo?.balance} Rs</h2>
                                        <h2 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">Unsettled Amount: {studentInfo?.unsettledBalance} Rs</h2>

                                    </div>
                                </div>
                                <div className="p-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='mx-auto'></div> */}
                    {/* <Newcomp3 /> */}
                    {/* <FlexPage /> */}
                    <br />
                    <br />

                </div>
            </div>


        </>
    )
}

export default Home