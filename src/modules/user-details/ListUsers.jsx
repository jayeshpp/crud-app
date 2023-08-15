import { useEffect } from "react"
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserAsync, getUserDetailsAsync, getUserList, getUserListStatus, updateUserToEdit } from "./userDetails.slice";
import UserList from './components/UserList'
import { ModuleHeading } from "components/module-head";

/**
 * TODO: shimmer, pagination
 * @returns User details 
 */
function ListUserDetails() {
    const dispatch = useDispatch()
    const userList = useSelector(getUserList)
    const userListApiStatus = useSelector(getUserListStatus)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getUserDetailsAsync())
    }, [])

    function handleAddUser() {
        dispatch(updateUserToEdit(null))
        navigate('/add')
    }

    function handleDeleteUser(id) {
        dispatch(deleteUserAsync(id))
    }

    function handleEditUser(id) {
        dispatch(updateUserToEdit(null))
        navigate(`/edit/${id}`)
    }

    return (
        <>
            <ModuleHeading title='User Details' renderRHS={
                <Button variant="contained" onClick={handleAddUser}>Add New</Button>
            } />
            {userListApiStatus === 'loading' ?
                'loading' :
                userListApiStatus === 'succeeded' ?
                    <UserList
                        handleDeleteUser={handleDeleteUser}
                        handleEditUser={handleEditUser}
                        data={userList}
                    /> :
                    userListApiStatus === 'failed' ?
                        'Something went wrong' : ''
            }
        </>
    )
}

export default ListUserDetails