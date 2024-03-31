import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
// importing Components
import FormInputGenData from './FormInputData';
import dayjs from 'dayjs';

import { getUserToken } from '../../../components_login/Tokens';
import { checkConfAndLeaveTime, checkConfDetails, checkConferenceTime, checkEnclosures, checkFinances, checkLeaveTime } from '../checkFunctions';
import { BASE_URL } from '../../../components/requests/URL';


function FormInput() {
    const navigate = useNavigate();

    const [freezeButton, setFreezeButton] = useState(false);

    // modal states
    const [showModal, setShowModal] = useState(false);
    const [formSuccess, setFormSuccess] = useState(false); // true if form is submitted successfully
    const [message, setMessage] = useState(""); // message to be displayed in modal

    const [generalInfo, setGeneralInfo] = useState({});
    const [conferenceInfo, setConferenceInfo] = useState({});

    const [dateStarts, setDateStarts] = useState(dayjs('2023-01-03'));
    const [dateEnds, setDateEnds] = useState(dayjs('2023-01-01'));
    const [leaveStarts, setLeaveStarts] = useState(dayjs('2023-01-01'));
    const [leaveEnds, setLeaveEnds] = useState(dayjs('2023-01-01'));

    const [advance, setAdvance] = useState(false);
    const dataInTable = [];
    const [tableData, setTableData] = useState(dataInTable);
    const [travel, setTravel] = useState(0);
    const [food, setFood] = useState(0);
    const [stay, setStay] = useState(0);

    const [registrationFee, setRegistrationFee] = useState(0);

    const [rowData, setRowData] = useState({
        particular: "",
        amount: ""
    });

    const [enclosures, setEnclosures] = useState({
        "copyOfAcceptance": null,
        "copyOfConferenceBrochure": null,
        "copyOfAbstract": null,
    })

    const getFixedParts = ((e) => {
        const { name, value } = e.target;

        if (name === "travel") {
            setTravel(value);
        }
        else if (name === "stay") {
            setStay(value);
        }
        else if (name === "registrationFee") {
            setRegistrationFee(value)
        }
        else {
            setFood(value);
        }
    })

    const getGeneralInfo = ((e) => {
        const { name, value } = e.target;
        // console.log(name + " " + value);
        setGeneralInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    });
    const showErrorToast = (message) => {
        toast.error(message, {
            // position: toast.POSITION.TOP_CENTER
        });
    };
    function isValidEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function isValidDateRange(startDate, endDate) {
        // Convert string dates to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        // Perform date comparison
        return start <= end;
    }
    // Function to check if file type is valid
    function isValidFile(file) {
        // Define allowed file types
        const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        return allowedFileTypes.includes(file.type);
    }
    const getConferenceInfo = ((e) => {

        const { name, value } = e.target;
        // console.log(name + " " + value);
        setConferenceInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    });

    const getAdvance = e => {
        setAdvance(!advance);
    }

    const addRowData = (e) => {
        e.preventDefault();
        if (!rowData.particular || !rowData.amount) {
            showErrorToast("Fill all the fields!");
            return;
        }
        const newTableData = [...tableData]
        newTableData.push(rowData);
        setTableData(newTableData);
        setRowData({ particular: "", amount: "" });
    }

    const getRowData = (e) => {
        const { name, value } = e.target;
        // console.log(name + " " + value);
        setRowData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const checkData = () => {
        if (!checkConfDetails(conferenceInfo)) {
            showErrorToast('Please fill conference Details properly.');
            return false;
        }
        const fin = checkFinances(travel, food, stay, tableData);
        console.log("((((((((((((((((");
        console.log(fin);
        if (fin === "0") {
            
            showErrorToast("Your Expenses Sum is zero. please review the form.");
            return false;
        }
        return true;
    }

    const fileFunction = (e) => {
        e.preventDefault();

        const { name } = e.target;
        setEnclosures(prevState => ({
            ...prevState,
            [name]: e.target.files[0]
        }));
    }

    const finalFinances = () => {
        const finances = [...tableData];
        finances.push({
            "particular": "travel",
            "amount": travel
        });

        finances.push({
            "particular": "Registration Fee",
            "amount": registrationFee
        });
        finances.push({
            "particular": "food",
            "amount": food
        });
        finances.push({
            "particular": "stay",
            "amount": stay
        });

        return finances;
    }
    function checknData(finances) {
        if (!isValidEmail(generalInfo.email)) {
            showErrorToast('Please enter a valid email');
            return false;
        }
    
        if (!generalInfo.entryNo) {
            showErrorToast('Please enter an entry number');
            return false;
        }
    
        const mobileRegex = /^[0-9]{10}$/;
        if (!generalInfo.mobileNo || !mobileRegex.test(generalInfo.mobileNo)) {
            showErrorToast('Please enter a valid 10-digit mobile number');
            return false;
        }
    
        const ifscRegex = /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/;
        if (!generalInfo.ifsc || !ifscRegex.test(generalInfo.ifsc)) {
            showErrorToast('Please enter a valid IFSC code');
            return false;
        }
    
        const accountNoRegex = /^[0-9]{9,18}$/;
        if (!generalInfo.accountNo || !accountNoRegex.test(generalInfo.accountNo)) {
            showErrorToast('Please enter a valid bank account number (9-18 digits)');
            return false;
        }
        if (finances.every(item => item.amount === 0)) {
            showErrorToast('Please enter some amount');
            return false;
        }
        return true;
    }

    function checkEnclosures(enclosures) {
        const fileChecks = [
            { file: enclosures.copyOfAcceptance, fieldName: 'copyOfAcceptance' },
            { file: enclosures.copyOfAbstract, fieldName: 'copyOfAbstract' },
            { file: enclosures.copyOfConferenceBrochure, fieldName: 'copyOfConferenceBrochure' }
        ];
    
        for (const { file, fieldName } of fileChecks) {
            if (!file) {
                showErrorToast(`Please include ${fieldName}`);
                return false;
            } else if (!isValidFile(file)) {
                showErrorToast(`Invalid file type for ${fieldName}`);
                return false;
            }
        }
    
        return true;
    }
    function checkConfAndLeaveTime(start, end, leaveStart, leaveEnd) {
        if (!isValidDateRange(start, end)) {
            showErrorToast('Conference start date should be before or same as the end date');
            return false;
        }
    
        if (!isValidDateRange(leaveStart, leaveEnd)) {
            showErrorToast('Student leave start date should be before or same as the end date');
            return false;
        }
    
        return true;
    }


    const requestGrant = async (e) => {
        e.preventDefault();

        if (freezeButton === true)
            return;

        const finances = finalFinances();
        setFreezeButton(true);
        if (!checkData() || !checknData(finances) ||
            !checkConferenceTime(dateStarts, dateEnds) ||
            !checkLeaveTime(leaveStarts, leaveEnds) ||
            !checkConfAndLeaveTime(dateStarts, dateEnds, leaveStarts, leaveEnds) ||
            !checkEnclosures(enclosures)) {
            setFreezeButton(false);
            return;
        }
        // save all data
        const formData = new FormData();

        formData.append("email", generalInfo.email);
        formData.append("entryNo", generalInfo.entryNo);
        formData.append("status", "0");

        formData.append("mobileNo", generalInfo.mobileNo);
        formData.append("ifscCode", generalInfo.ifsc);
        formData.append("bankAccountNo", generalInfo.accountNo);

        formData.append("nameOfConference", conferenceInfo.nameOfConference);
        formData.append("venueOfConference", conferenceInfo.venueOfConference);
        formData.append("paperInConference", conferenceInfo.paperInConference);

        formData.append("conferenceStarts", dayjs(dateStarts).format('DD/MM/YYYY'));
        formData.append("conferenceEnds", dayjs(dateEnds).format('DD/MM/YYYY'));

        formData.append("studentLeaveStarts", dayjs(leaveStarts).format('DD/MM/YYYY'));
        formData.append("studentLeaveEnds", dayjs(leaveEnds).format('DD/MM/YYYY'));

        formData.append("financialSupport", conferenceInfo.financialSupport);
        formData.append("advances", advance);
        formData.append("numberOfDays", conferenceInfo.numberOfDays);

        
        formData.append("finances", JSON.stringify(finances));
        
        formData.append("coaa", enclosures.copyOfAcceptance !== null && enclosures.copyOfAcceptance !== undefined);
        formData.append("coaba", enclosures.copyOfAbstract !== null && enclosures.copyOfAbstract !== undefined);
        formData.append("cocba", enclosures.copyOfConferenceBrochure !== null && enclosures.copyOfConferenceBrochure !== undefined);

        //appending enclosures
        formData.append("copyOfAcceptance", enclosures.copyOfAcceptance);
        formData.append("copyOfConferenceBrochure", enclosures.copyOfConferenceBrochure);
        formData.append("copyOfAbstract", enclosures.copyOfAbstract);

        // console.log(enclosures);

        
        // request to server to save application data
        const res = await fetch(`${BASE_URL}/studentApplicationSubmit`, {
            method: "POST",
            body: formData
        });

        if (res.status === 422) {
            setMessage("Error Occurred! Please Try Again.");
            setFormSuccess(false);
        }
        else {
            setFormSuccess(true);
            setMessage("Application Submitted Successfully!");
        }
        setFreezeButton(false);
        setShowModal(true);
    }

    const getBasicInfo = async (req, res) => {
        try {
            const token = getUserToken();
            // console.log(token);
            const resp = await fetch(`${BASE_URL}/studentInfoLoading`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            return resp.json();
            // console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    function getTodayDate() {
        const date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate() + 1;

        const ymd = `${year}-${month}-${day}`;
        setDateStarts(dayjs(ymd));
        setDateEnds(dayjs(ymd));
        setLeaveStarts(dayjs(ymd));
        setLeaveEnds(dayjs(ymd));
    }

    useEffect(() => {
        getTodayDate();
        getBasicInfo().then((data) => {
            setGeneralInfo(data)
        }).catch((e) => {
            console.log(e);
        });
    }, []);

    function exitForm(e) {
        e.preventDefault();
        setShowModal(false);
        if (formSuccess) {
            navigate('/studentLogin/application');
        }

    }

    const responseModal =
        <div style={{ "marginTop": "5rem", "marginLeft": "30rem" }} tabindex="-1" className=" overflow-y-auto overflow-x-hidden fixed top-10 right-0 left-10 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <button
                        onClick={exitForm}
                        type="button"
                        className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="successModal"
                    >
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                        <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Success</span>
                    </div>
                    <p className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{message}</p>
                </div>
            </div>
        </div>


    return (
        <>
            {/* replacement of window.alert */}
            {
                showModal && responseModal
            }

            <FormInputGenData
                generalInfo={generalInfo}
                getGeneralInfo={getGeneralInfo}
                getConferenceInfo={getConferenceInfo}
                dateStarts={dateStarts} setDateStarts={setDateStarts}
                dateEnds={dateEnds} setDateEnds={setDateEnds}
                advance={advance} getAdvance={getAdvance}
                leaveStarts={leaveStarts} setLeaveStarts={setLeaveStarts}
                leaveEnds={leaveEnds} setLeaveEnds={setLeaveEnds}
                addRowData={addRowData} tableData={tableData} getRowData={getRowData} rowData={rowData}
                getFixedParts={getFixedParts}
                food={food} travel={travel} stay={stay} registrationFee={registrationFee}
                requestGrant={requestGrant}
                fileFunction={fileFunction}
                freezeButton={freezeButton}
            />
        </>
    )
}

export default FormInput;