import React , {useState} from 'react'
import UpdateInfoModal from './UpdateInfoModal';
export default function ProfilePersonalInfo({ profileInfo }) {
    const [currentProfileInfo, setCurrentProfileInfo] = useState(profileInfo);
    const [modalClass, setModalClass] = useState("");
    const updateProfileInfo =(updatedTnfo)=>{
        setCurrentProfileInfo(updatedTnfo);
    };
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEntryNo, setIsEditingEntryNo] = useState(false);
    const [isEditingDateOfJoining, setIsEditingDateOfJoining] = useState(false);
    const [isEditingFellowshipCategory, setIsEditingFellowshipCategory] = useState(false);
    const [editedName, setEditedName] = useState(profileInfo.name);
    const [editedEntryNo, setEditedEntryNo] = useState(profileInfo.entryNo);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingDepartment, setIsEditingDepartment] = useState(false);
    const handleEditName = () => {
        setIsEditingName(true);
    };
    const [editedEmail, setEditedEmail] = useState(profileInfo.email);
    const [editedDepartment, setEditedDepartment] = useState(profileInfo.department);
    const handleEditEntryNo = () => {
        setIsEditingEntryNo(true);
    };
    const handleEditEmail = () => {
        setIsEditingEmail(true);
    };
    const [editedDateOfJoining, setEditedDateOfJoining] = useState(profileInfo.dateOfJoining);
    const [editedFellowshipCategory, setEditedFellowshipCategory] = useState(profileInfo.fellowshipCategory);
    const handleEditDepartment = () => {
        setIsEditingDepartment(true);
    };
    const handleSaveName = () => {
        setCurrentProfileInfo(prevState => ({
            ...prevState,
            name: editedName
        }));
        setIsEditingName(false);
    };
    const handleEditDateOfJoining = () => {
        setIsEditingDateOfJoining(true);
    };

    const handleEditFellowshipCategory = () => {
        setIsEditingFellowshipCategory(true);
    };
    const handleSaveEntryNo = () => {
        setCurrentProfileInfo(prevState => ({
            ...prevState,
            entryNo: editedEntryNo
        }));
        setIsEditingEntryNo(false);
    };
    const handleSaveEmail = () => {
        setCurrentProfileInfo(prevState => ({
            ...prevState,
            email: editedEmail
        }));
        setIsEditingEmail(false);
    };  
    const [isEditingAreaOfSpecialisation, setIsEditingAreaOfSpecialisation] = useState(false);
    const [editedAreaOfSpecialisation, setEditedAreaOfSpecialisation] = useState(profileInfo.areaOfSpecialisation);
    const [isEditingSupervisor, setIsEditingSupervisor] = useState(false);
    const [editedSupervisor, setEditedSupervisor] = useState(profileInfo.nameOfSupervisor);
    const [isEditingMobileNo, setIsEditingMobileNo] = useState(false);
    const [editedMobileNo, setEditedMobileNo] = useState(profileInfo.mobileNo);
    const handleEditAreaOfSpecialisation = () => {
        setIsEditingAreaOfSpecialisation(true);
    };

    const handleSaveAreaOfSpecialisation = () => {
        setIsEditingAreaOfSpecialisation(false);
        setCurrentProfileInfo({ ...currentProfileInfo, areaOfSpecialisation: editedAreaOfSpecialisation });
    };

    const handleEditSupervisor = () => {
        setIsEditingSupervisor(true);
    };

    const handleSaveSupervisor = () => {
        setIsEditingSupervisor(false);
        setCurrentProfileInfo({ ...currentProfileInfo, nameOfSupervisor: editedSupervisor });
    };

    const handleEditMobileNo = () => {
        setIsEditingMobileNo(true);
    };

    const handleSaveMobileNo = () => {
        setIsEditingMobileNo(false);
        setCurrentProfileInfo({ ...currentProfileInfo, mobileNo: editedMobileNo });
    };

    const handleSaveDepartment = () => {
        setCurrentProfileInfo(prevState => ({
            ...prevState,
            department: editedDepartment
        }));
        setIsEditingDepartment(false);
    };
    const handleSaveDateOfJoining = () => {
        setCurrentProfileInfo(prevState => ({
            ...prevState,
            dateOfJoining: editedDateOfJoining
        }));
        setIsEditingDateOfJoining(false);
    };

    const handleSaveFellowshipCategory = () => {
        setCurrentProfileInfo(prevState => ({
            ...prevState,
            fellowshipCategory: editedFellowshipCategory
        }));
        setIsEditingFellowshipCategory(false);
    };
    return (
        <>
        <div className="overflow-hidden mt-5 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Personal Information</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Please inform if any discrepancy</p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingName ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveName}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.name}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditName}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>
                                    </>
                                )}
                            </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Entry Number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingEntryNo ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedEntryNo}
                                            onChange={(e) => setEditedEntryNo(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveEntryNo}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.entryNo}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditEntryNo}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>

                                    </>
                                )}
                            </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingEmail ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedEmail}
                                            onChange={(e) => setEditedEmail(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveEmail}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.email}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditEmail}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>

                                    </>
                                )}
                            </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Department</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingDepartment ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedDepartment}
                                            onChange={(e) => setEditedDepartment(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveDepartment}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.department}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditDepartment}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>

                                    </>
                                )}
                            </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Date of Joining</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingDateOfJoining ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedDateOfJoining}
                                            onChange={(e) => setEditedDateOfJoining(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveDateOfJoining}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.dateOfJoining}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditDateOfJoining}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>

                                    </>
                                )}
                            </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Fellowship Category</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingFellowshipCategory ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedFellowshipCategory}
                                            onChange={(e) => setEditedFellowshipCategory(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveFellowshipCategory}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.fellowshipCategory}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditFellowshipCategory}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>

                                    </>
                                )}
                            </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Area of Specialisation</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingAreaOfSpecialisation ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedAreaOfSpecialisation}
                                            onChange={(e) => setEditedAreaOfSpecialisation(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveAreaOfSpecialisation}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.areaOfSpecialisation}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditAreaOfSpecialisation}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>

                                    </>
                                )}
                            </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Name of Supervisor</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingSupervisor ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedSupervisor}
                                            onChange={(e) => setEditedSupervisor(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveSupervisor}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.nameOfSupervisor}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditSupervisor}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>

                                    </>
                                )}
                            </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Mobile Number</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {isEditingMobileNo ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editedMobileNo}
                                            onChange={(e) => setEditedMobileNo(e.target.value)}
                                        />
                                        <button className="ml-2 text-green-500 hover:text-green-700" onClick={handleSaveMobileNo}>
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center">
    <span>{currentProfileInfo.mobileNo}</span>
    <button className="ml-auto text-gray-600 hover:text-gray-900" onClick={handleEditMobileNo}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.793 3.293a1 1 0 00-1.414-1.414l-1.586 1.586-10 10 3.586 3.586 10-10-1.586-1.586zm-1.793 2l-10 10-1.293 1.293a1 1 0 101.414 1.414l1.293-1.293 10-10-1.414-1.414z" clipRule="evenodd" />
        </svg>
    </button>
</div>

                                    </>
                                )}
                            </dd>
                    </div>
                </dl>
            </div>
        </div>
        </>
    )
}
