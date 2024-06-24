import { LoginForm } from "./LoginForm"
// const response = await fetch('http://localhost:5000/api/admin/protected', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': localStorage.getItem('token'),
//     },
// });
// const data = await response.json();


const AdminLogin = () =>{
    return(
        <div className="bg-[#9F7E7E] h-[100vh] flex items-center justify-center">
        <LoginForm formHeading="admin"/>
        </div>
    )
}

export default AdminLogin;