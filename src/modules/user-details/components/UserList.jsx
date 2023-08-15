import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import { getFullname } from "utils";

/**
 * user list table
 * TODO: pagination
 * @param {data, handleDeleteUser, handleEditUser}
 * @returns Table
 */

function UserList({ data, handleDeleteUser, handleEditUser }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user listing">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Postcode</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Town</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody data-testid="user-table">
          {data?.length ? (
            data?.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {getFullname(user.first_name, user.last_name)}
                </TableCell>
                <TableCell>{user.contact_number}</TableCell>
                <TableCell>
                  {user.address_1}, {user.address_2}
                </TableCell>
                <TableCell>{user.post_code}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.region}</TableCell>
                <TableCell>{user.town}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => handleEditUser(user.id)}
                    data-testid={`edit-${index}`}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteUser(user.id)}
                    data-testid={`delete-${index}`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8}>
                <Typography textAlign="center">No records found!</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserList;
