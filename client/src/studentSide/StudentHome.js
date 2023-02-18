import React from 'react'
import StudentDashboard from './mainPage/StudentDashboard';
import NavBar from './NavBar';
import { Container} from 'react-bootstrap';
function Home(props) {

    return (
        <>
            <NavBar emailNav={props.studentEmail} />
            <Container>
                <br/>
                <StudentDashboard studentEmail={props.studentEmail} />

            </Container>
        </>
    )
}

export default Home