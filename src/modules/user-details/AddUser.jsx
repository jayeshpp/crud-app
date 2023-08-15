import { useDispatch } from 'react-redux';
import { addUserAsync } from './userDetails.slice';
import { ModuleHeading } from 'components/module-head';
import AddUserForm from './components/AddUserForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let initialValues = {
        first_name: '',
        last_name: '',
        contact_number: '',
        address_1: '',
        address_2: '',
        post_code: '',
        country: '',
        region: '',
        town: '',
    }

    const handleSubmit = async (values, formikBag) => {
        dispatch(addUserAsync(values))
        formikBag.resetForm()
        navigate('/')
        toast.success('User added successfully');
    }

    return <>
        <ModuleHeading title={'Add user'} enableBack />
        <div className='module-card'>
            <AddUserForm initialValues={initialValues} onSubmit={handleSubmit} />
        </div>
    </>
}

export default AddUser
