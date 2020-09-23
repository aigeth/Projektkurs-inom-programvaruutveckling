import React from "react";
import { Link } from "react-router-dom";
import Data from "../Data";

/*
*@authors
*Aigeth Magendran
*
*/

export default class Manageuserspage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: "",
      edit: {},
      onGoingEdit: false,
      firstname: '',
      lastname: '',
      eMail: '',
      message: ''
    };
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    var data = new Data();
    if(JSON.parse(localStorage.getItem('user')).role != 'ADMIN') {
      this.props.history.push('/menu/viewkeys');
    }
    data.getAllUsers().then((responseJson) => {
      responseJson.reverse();
      this.setState({ "users": responseJson });
    });
  }

  handleDeleteUser(eMail, i) {
    console.log(eMail + " " + i);
    var data = new Data();
    data.removeUser(eMail).then((responseJson) => {
      console.log(JSON.stringify(responseJson));
      if (responseJson.response) {
        if (responseJson.response == ("User " + eMail + " has been removed")) { this.state.users.splice(i, 1); }
        this.setState({ message: responseJson.response });
      }
      else {
        this.setState({ message: "Error: an error occured" });
      }
    });
  }
  handleEditClick = (user) => {

    let editedUsers = this.state.users;
    let tempEdit = this.state.edit;

    if (!this.state.onGoingEdit) {
      console.log("Edit selected");
      tempEdit[user.id] = true;
      this.setState({ onGoingEdit: true, edit: tempEdit, message: "" });
    }
    else {
      if (tempEdit[user.id]) {
        console.log("Edit unselected");
        if (this.state.firstname !== user.firstname && this.state.firstname !== '') {
          console.log("New firstname: ", this.state.firstname);
          editedUsers.map(u => (u.id === user.id ? u.firstname = this.state.firstname : u))
        }
        if (this.state.lastname !== user.lastname && this.state.lastname !== '') {
          console.log("New lastname: ", this.state.lastname);
          editedUsers.map(u => (u.id === user.id ? u.lastname = this.state.lastname : u))
        }
        if (this.state.eMail !== user.eMail && this.state.eMail !== '') {
          console.log("New eMail: ", this.state.eMail);
          editedUsers.map(u => (u.id === user.id ? u.eMail = this.state.eMail : u))
          tempEdit[user.id] = true;
        }
        tempEdit[user.id] = false;
        this.setState({ onGoingEdit: false, firstname: '', lastname: '', eMail: '', edit: tempEdit, users: editedUsers, message: "" });
        this.state.users.map(u => {
          if(u.id == user.id) {
            var data = new Data();
            data.editUser(user);
            this.state.onGoingEdit = false;
          }
        })
      }
      else
        this.setState({ message: "You can only edit one user at a time" });
    }
  };
  handleInputChange(event) {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  };

  render() {
    return (
      <div>
        <Link style={{ fontSize: 30, marginLeft: 55, marginTop: 0 }} to="/menu/manageusers/useractivity">
          <button className="btn btn-secondary btn-md m-2">
            View user activity
            </button>
        </Link>
        <Link style={{ fontSize: 30, marginLeft: 795 }} to="/menu/manageusers/add">
          <button className="btn btn-secondary btn-md m-2">
            Add a user
            </button>
        </Link>
        <div class="container" style={{ marginTop: 30 }}>
          <text className="text-muted" class="text-danger" style={{ fontSize: 15 }}>
            {this.state.message}
          </text>
          <p></p>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="myTable">
              {
                (this.state.users.length == 0) ?
                  <td colSpan="5">No Users found</td>
                  :
                  this.state.users.map((users, i) => {
                    if(users.eMail != JSON.parse(localStorage.getItem('user')).eMail) {
                      return (
                        <tr>
                          <td>
                            {this.state.edit[users.id] ? <input class="form-control" placeholder={users.firstname} type="text" name="firstname" value={this.state.firstname} onChange={this.handleInputChange}></input>
                              : users.firstname}
                          </td>
                          <td>
                            {this.state.edit[users.id] ? <input class="form-control" placeholder={users.lastname} type="text" name="lastname" value={this.state.lastname} onChange={this.handleInputChange}></input>
                              : users.lastname}
                          </td>
                          <td>
                            {this.state.edit[users.id] ? <input class="form-control" placeholder={users.eMail} type="text" name="eMail" value={this.state.eMail} onChange={this.handleInputChange}></input>
                              : users.eMail}
                          </td>
                          <td>
                            {this.state.edit[users.id] ? <input class="form-control" placeholder={users.role} type="text" name="role" value={this.state.role} onChange={this.handleInputChange}></input>
                              : users.role}
                          </td>
                          <td><button className="btn btn-secondary btn-sm m-2" onClick={() => this.handleEditClick(users)}>
                            {this.state.edit[users.id] ? 'Done' : 'Edit'}
                          </button>
                            {this.state.edit[users.id] ?
                              <button className="btn btn-secondary btn-sm m-2" onClick={() => this.handleDeleteUser(users.eMail, i)}>Delete</button>
                              : void 0}
                          </td>
                        </tr>
                      );
                    }
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}