import React, { useState, useEffect } from 'react';
import { getUserToken, setAppToken } from '../../components_login/Tokens';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoaderCard from '../../components/loading/LoaderCard';
import { BASE_URL } from '../../components/requests/URL';
import { FaSort } from 'react-icons/fa';

function Application() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [apps2, setApps2] = useState([]);
  const [st, setSt] = useState(1);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabIndex2, setActiveTabIndex2] = useState(0);
  const [allData1, setAllData1] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  const tabs = [
    { label: 'Time', content: 'Applications are being displayed based on Time of the conference.' },
    { label: 'Name', content: 'Applications are being displayed based on Name of the conference.' },
    { label: 'Place', content: 'Applications are being displayed based on Place of the conference.' },
  ];

  function handleTabClick(index) {
    setActiveTabIndex(index);
    if (index === 0) {
      apps.sort((a, b) => a.conferenceStarts.localeCompare(b.conferenceStarts));
      // apps2.sort((a, b) => a.conferenceStarts.localeCompare(b.conferenceStarts));
    }
    else if (index === 1) {
      apps.sort((a, b) => a.nameOfConference.localeCompare(b.nameOfConference));
    }
    else if (index === 2) {
      apps.sort((a, b) => a.venueOfConference.localeCompare(b.venueOfConference));
    }
  }
  function handleTabClick2(index) {
    setActiveTabIndex2(index);
    if (index === 0) {
      apps2.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }
    else if (index === 1) {
      apps2.sort((a, b) => a.nameOfConference.localeCompare(b.nameOfConference));
    }
    else if (index === 2) {
      apps2.sort((a, b) => a.venueOfConference.localeCompare(b.venueOfConference));
    }
  }

  const getBasicInfo = async () => {
    const status = 3;
    try {
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
      setApps(data.data);
      setApps2(data.data2);
      setAllData1(data.allData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBasicInfo();
  }, []);

  const getStatus = (code) => {
    if (code === "0")
      return "Pending Faculty Approval";
    else if (code === "1")
      return "Pending Hod Section Approval";
    else if (code === "2")
      return "Pending Research Section Approval";
    else if (code === "3")
      return "Pending Account Section Approval";
    else if (code === "4")
      return "Pending Dean Approval";
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

  const createAppToken = async (id) => {
    try {
      const aisehi = "abcd";
      const resp = await fetch(`${BASE_URL}/createApplicationToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, aisehi })
      });
      const data = await resp.json();
      const appToken = data.appToken;
      setAppToken(appToken);

    } catch (error) {
      console.log(error);
    }
  }

  const viewSpecficApplication = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    try {
      await createAppToken(name);
      navigate('/accountLogin/studentApplication');

    } catch (error) {
      console.log(error);
    }
  }
  const getVanue = (item) => {
    if (!allData1) return null;
    const value = allData1.find(first => first._id === item.parentId);
    if (value && value.venueOfConference) item.venueOfConference = value.venueOfConference;
    return value ? value.venueOfConference : null;
  };

  const getName = (item) => {
    if (!allData1) return null;
    const value = allData1.find(first => first._id === item.parentId);
    if (value && value.nameOfConference) item.nameOfConference = value.nameOfConference;
    return value ? value.nameOfConference : null;
  };
  return (
    <>
      <br />
      {isLoading ?
        <Container>
          <LoaderCard />
        </Container>
        :
        <Container>
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg shadow-md mt-5">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FaSort color="dark-purple" style={{ marginRight: '0.5rem' }} />
              <span className='text-lg font-medium'>Sort Applications on the basis of: </span>
            </span>
            <div className="flex">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  className={`mx-2 py-1 px-4 rounded-lg font-medium ${index === activeTabIndex ? 'bg-dark-purple text-white hover:bg-button-hover-blue hover:text-teal-400' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-950'
                    }`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-2"></div>
          <div className='flex font-bold text-3xl text-black-800 items-center justify-center'>Application Forms</div>
          <TableContainer component={Paper} className="my-3">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Conference Name</b></TableCell>
                  <TableCell><b>Amount Needed</b></TableCell>
                  <TableCell><b>Venue</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                  <TableCell><b>Submission Date</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apps.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{getStatus(item.status)}</TableCell>
                    <TableCell>{item.nameOfConference}</TableCell>
                    <TableCell>{getFinances(item.finances)} Rs</TableCell>
                    <TableCell>{item.venueOfConference}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={viewSpecficApplication}
                        name={item._id}
                      >
                        View Full Application
                      </Button>
                    </TableCell>
                    <TableCell>{getDays(item.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg shadow-md mt-10">
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <FaSort color="dark-purple" style={{ marginRight: '0.5rem' }} />
              <span className='text-lg font-medium'>Sort Applications on the basis of: </span>
            </span>
            <div className="flex">
              {tabs.map((tab, index) => (
                <button
                  key={tab.label}
                  className={`mx-2 py-1 px-4 rounded-lg font-medium ${index === activeTabIndex2 ? 'bg-dark-purple text-white hover:bg-button-hover-blue hover:text-teal-400' : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-950'
                    }`}
                  onClick={() => handleTabClick2(index)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className='flex font-bold text-3xl text-black-800 items-center justify-center mt-5'>Settlement Forms</div>
          <TableContainer component={Paper} className="my-3">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Conference Name</b></TableCell>
                  <TableCell><b>Amount Needed</b></TableCell>
                  <TableCell><b>Venue</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                  <TableCell><b>Submission Date</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {apps2.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{getStatus(item.status)}</TableCell>
                    <TableCell>{getName(item)}</TableCell>
                    <TableCell>{getFinances(item.finances)} Rs</TableCell>
                    <TableCell>{getVanue(item)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={viewSpecficApplication}
                        name={item._id}
                      >
                        View Full Application
                      </Button>
                    </TableCell>
                    <TableCell>{getDays(item.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      }
    </>
  )
}

export default Application;