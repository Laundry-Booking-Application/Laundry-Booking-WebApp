import {Button, Table} from "react-bootstrap";

const UsersListView = ({ usersList, deleteUser }) => {

    return (
        <>
            <div className="usersListContainer m-auto">
                <h1 className="textCenter p-3">Registered users list:</h1>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Personal number</th>
                            <th>Username</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map(userEntry =>
                            <tr key={userEntry.username}>
                                <td>{userEntry.firstName}</td>
                                <td>{userEntry.lastName}</td>
                                <td>{userEntry.personalNumber}</td>
                                <td>{userEntry.username}</td>
                                <td>
                                {<Button size= "sm" variant="outline-dark" onClick={e => { e.preventDefault(); deleteUser(userEntry.username); }}>Delete user</Button>}
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </>)

}


export default UsersListView;
