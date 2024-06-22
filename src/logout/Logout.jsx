import { authContext, useAuth } from '../context/AuthContext';
import logout from './logout.css';

export default function Logout() {

    const auth = useAuth();

    const onHandleButtonLogout = async () => {
        await auth.logout().then((res) => {
            window.location.href = '/';
        }).catch((error) => {
            console.error('Error:', error)
        });
    }
    return(
        <div className="button-logout">
            <button onClick={onHandleButtonLogout}>Logout</button>
        </div>
    )
}