import Chart_fill from './assets/Chart_fill.png'
import Chat from './assets/Chat.png';
import Calendar from './assets/Calendar.png';
import Folder from './assets/Folder.png';
import User from './assets/User.png';
import Setting from './assets/Setting.png'
import Search from './assets/Search.png'

export const StudentSideBar = [
    { title: "Dashboard", src: Chat, link: "/studentLogin" },
    { title: "Profile", src: User, link: "/studentLogin/Profile" },
    // { title: "Settlement", src: Chat, link: '/studentLogin', gap: true },
    { title: "Applications", src: Folder, link: "/studentLogin/application", gap: true },
    { title: "Fill Form", src: Search, link: "/studentLogin/formFill" },
    { title: "Archive ", src: Folder, gap: true, link: "/studentLogin/archive" },
    { title: "Logout ", src: Setting, gap: true, link: "logout" },
];

export const FacultySideBar = [
    { title: "Dashboard", src: Chat, link: "/facultyLogin" },
    // { title: "TBD", src: Chat, link: '/facultyLogin' },
    { title: "Applications", src: Folder, gap: true, link: "/facultyLogin/application" },
    { title: "Archive ", src: Folder, gap: true, link: "/facultyLogin/archive" },
    { title: "Logout ", src: Setting, gap: true, link: "logout" },
];


export const ResarchSideBar = [
    { title: "Dashboard", src: Chart_fill, link: "/researchLogin" },
    // { title: "TBD", src: Chat, link: "/researchLogin" },
    { title: "Applications", src: Folder, gap: true, link: "/researchLogin/application" },
    { title: "Students", src: Calendar, link: "/researchLogin/student" },
    { title: "Faculty", src: Calendar, link: "/researchLogin/faculty" },
    { title: "Archive ", src: Folder, gap: true, link: "/researchLogin/archive" },
    { title: "Logout ", src: Setting, gap: true, link: "logout" },
];

export const AccountSideBar = [
    { title: "Dashboard", src: Chart_fill, gap: false, link: "/accountLogin" },
    // { title: "TBD", src: Chat, gap: false, link: "/accountLogin" },
    { title: "Applications", src: Folder, gap: true, link: "/accountLogin/application" },
    { title: "Archive ", src: Folder, gap: true, link: "/accountLogin/archive" },
    { title: "Logout ", src: Setting, gap: true, link: "logout" },

];

export const HodSideBar = [
    { title: "Dashboard", src: Chart_fill, link: "/hodLogin" },
    // { title: "TBD", src: Chat, link: '/hodLogin' },
    { title: "Applications", src: Folder, gap: true, link: "/hodLogin/application" },
    { title: "Archive ", src: Folder, gap: true, link: "/hodLogin/archive" },
    { title: "Logout ", src: Setting, gap: true, link: "logout" },

];

export const DeanSideBar = [
    { title: "Dashboard", src: Chart_fill, link: "/deanLogin" },
    // { title: "TBD", src: Chat, link: '/deanLogin' },
    { title: "Applications", src: User, gap: true, link: "/deanLogin/application" },
    { title: "Archive ", src: Folder, gap: true, link: "/deanLogin/archive" },
    { title: "Logout ", src: Setting, gap: true, link: "logout" },
];