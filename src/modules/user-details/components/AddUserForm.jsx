import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, TextField, Button } from '@mui/material';
import { createUserStatus, userToEdit } from '../userDetails.slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    first_name: Yup.string().min(3, 'Too short').max(50, 'Too long!').required('Required'),
    last_name: Yup.string().min(3, 'Too short').max(50, 'Too long!').required('Required'),
    contact_number: Yup.number().required('Required'), // TODO: need to modify to accept patterns
    address_1: Yup.string().min(3, 'Too short').max(150, 'Too long!').required('Required'),
    address_2: Yup.string().min(3, 'Too short').max(150, 'Too long!').required('Required'),
    post_code: Yup.string().required('Required'),//can be validated based on different pattern. for now keeping it string
    country: Yup.string().required('Required'),// can be a dropdown, for now keeping it input/string
    region: Yup.string().required('Required'),// can be a dropdown, for now keeping it input/string
    town: Yup.string().required('Required'),// can be a dropdown, for now keeping it input/string
});

function AddUserForm({ initialValues, onSubmit }) {
    const navigate = useNavigate()
    const status = useSelector(createUserStatus)
    const userToEditData = useSelector(userToEdit)
    const isLoading = status === 'loading'

    const handleCancel = () => {
        navigate('/')
    }

    const { errors, touched, values, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <form
            onSubmit={handleSubmit}
        >
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <TextField
                        name="first_name"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        error={touched.first_name && Boolean(errors.first_name)}
                        helperText={touched?.first_name && errors?.first_name}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name="last_name"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                        error={touched.last_name && Boolean(errors.last_name)}
                        helperText={touched?.last_name && errors?.last_name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="contact_number"
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.contact_number}
                        error={touched.contact_number && Boolean(errors.contact_number)}
                        helperText={touched?.contact_number && errors?.contact_number}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="address_1"
                        label="Address 1"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address_1}
                        error={touched.address_1 && Boolean(errors.address_1)}
                        helperText={touched?.address_1 && errors?.address_1}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        name="address_2"
                        label="Address 2"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address_2}
                        error={touched.address_2 && Boolean(errors.address_2)}
                        helperText={touched?.address_2 && errors?.address_2}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name="post_code"
                        label="Postcode"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.post_code}
                        error={touched.post_code && Boolean(errors.post_code)}
                        helperText={touched?.post_code && errors?.post_code}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name="country"
                        label="Country"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        error={touched.country && Boolean(errors.country)}
                        helperText={touched?.country && errors?.country}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name="region"
                        label="Region"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.region}
                        error={touched.region && Boolean(errors.region)}
                        helperText={touched?.region && errors?.region}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        name="town"
                        label="Town"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.town}
                        error={touched.town && Boolean(errors.town)}
                        helperText={touched?.town && errors?.town}
                    />
                </Grid>
                <Grid item xs={12} className='text-right'>
                    <Button variant='outlined' disabled={isLoading} className='mr-2' onClick={handleCancel}>Cancel</Button>
                    <Button variant='contained' type='submit' disabled={isLoading}>{userToEditData ? 'Update' : 'Add'}</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddUserForm
