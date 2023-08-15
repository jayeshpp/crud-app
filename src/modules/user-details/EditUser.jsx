import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFetchByIdStatus,
  getUserDetailsByIdAsync,
  updateUserAsync,
  updateUserToEdit,
  userToEdit,
} from "./userDetails.slice";
import { ModuleHeading } from "components/module-head";
import AddUserForm from "./components/AddUserForm";
import { toast } from "react-toastify";
import ErrorPage from "components/error";

function EditUser() {
  const { id } = useParams();
  const userData = useSelector(userToEdit);
  const status = useSelector(getFetchByIdStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    dispatch(updateUserAsync({ values, id }));
    dispatch(updateUserToEdit(values));
    navigate("/");
    toast.success("User updated successfully");
  };

  useEffect(() => {
    if (id) {
      dispatch(getUserDetailsByIdAsync(id));
    }
  }, [id]);

  return (
    <>
      <ModuleHeading title={"Edit user"} enableBack />
      <div className="module-card">
        {status === "failed" ? (
          <ErrorPage />
        ) : (
          userData && (
            <AddUserForm initialValues={userData} onSubmit={handleSubmit} />
          )
        )}
      </div>
    </>
  );
}

export default EditUser;
