// Profile.js
import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { getUserToken } from '../../components_login/Tokens';
import LoaderContent from '../../components/loading/LoaderContent';
import { delay } from '../../components/loading/Delay';
import { BASE_URL } from '../../components/requests/URL';
import userPhoto from './User.png';
import iitRopar from './backgroundClg.jpg';
import ProfilePersonalInfo from './ProfilePersonalInfo';

export default function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState({});

    const getBasicInfo = async () => {
        try {
            const token = getUserToken();
            const resp = await fetch(`${BASE_URL}/studentInfoLoading`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            });
            return resp.json();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBasicInfo().then((data) => {
            setProfileInfo(data);
            delay(50).then(() => {
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
            })
        }).catch((e) => {
            console.log(e.message)
        });
    }, []);

    const updateProfileInfo = async (updatedInfo) => {
        try {
            const token = getUserToken();
            const resp = await fetch(`${BASE_URL}/updateInfo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(updatedInfo)
            });

            if (resp.status === 200) {
                window.alert("Updated");
                setProfileInfo(updatedInfo);
            } else {
                window.alert("Error Occurred. Please Try Again.");
            }
        } catch (error) {
            console.log(error);
            window.alert("Error Occurred. Please Try Again.");
        }
    };

    return (
        <>
            {isLoading ? (
                <LoaderContent />
            ) : (
                <Container>
                    <div className="h-full w-full bg-white p-5">
                        <div className="bg-gray-50 rounded-lg shadow-xl pb-8">
                            <div className="w-full h-[350px]">
                                <img
                                    src={iitRopar}
                                    className="w-full h-full object-cover overflow-y-hidden rounded-tl-lg rounded-tr-lg"
                                    alt=""
                                />
                            </div>
                            <ProfilePersonalInfo profileInfo={profileInfo} updateProfileInfo={updateProfileInfo} />
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
}
