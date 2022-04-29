import React from 'react';
import useModelProp from '../useModelProp';
import privileges from '../privilegeEnum';
import UnauthorizedAccessView from '../views/unauthorizedAccessView';
import UsersListView from '../views/usersListView';
import { toast } from 'react-toastify';
import WaitingDataView from '../views/waitingDataView';

/**
 * The presenter for creating the users list.
 * @returns {UsersListView} UserListView The view that contains the users list page.
 */
function UsersList({ userModel }) {
    const usersList = useModelProp(userModel, "usersList");
    const loginStatus = useModelProp(userModel, 'loginStatus');
    const userPrivilege = useModelProp(userModel, 'privilege');
    const deletionResult = useModelProp(userModel, 'deletionResult');

    React.useEffect(
        function () {
            if (loginStatus) {
                if (userPrivilege === privileges.Administrator) {
                    if (usersList === null) {
                        userModel.listUsers();
                    }
                }
            }
        },
        [userModel, loginStatus, userPrivilege, usersList]
    );

    if (deletionResult !== null) {
        if (deletionResult === true) {
            let cancellationMessage = `The user account has been successfully deleted!`;
            toast.success(cancellationMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            });
            userModel.clearDeletionResult();
        }
        else {
            let cancellationMessage = `An error has occurred while deleting the user account!`;
            toast.error(cancellationMessage, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: true,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored"
            });
            userModel.clearDeletionResult();
        }
    }


    if (loginStatus && userPrivilege === privileges.Administrator) {

        if (usersList === null) {
            return React.createElement(WaitingDataView, {});
        }

        return usersList && React.createElement(UsersListView, {
            usersList: [...usersList],
            deleteUser: (username) => deleteUserProxy(userModel, username),
        });
    }
    else {
        return React.createElement(UnauthorizedAccessView, {});
    }

}

/**
 * Proxy function that facilitates deleting user accounts and shows the confirmation dialog box.
 * @param {UserModel} userModel The application's user model.
 * @param {string} username The username of the account to be deleted.
 */
function deleteUserProxy(userModel, username) {
    let confirmAction = window.confirm(`Are you sure you want to delete the account with the username: ${username} ?`);
    if (confirmAction) {
        userModel.deleteUser(username);
    }
}

export default UsersList;