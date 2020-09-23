import React, { Component } from "react";
import Data from "../Data";
import Select from "react-select";


/*
*@authors
*Aigeth Magendran
*
*/


const roles = [
  { value: 'ADMIN', label: 'ADMIN' },
  { value: 'USER', label: 'USER' }
]

class Adduserpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      password: "",
      role: "",
      email: "",
      message: ""
    };
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  //Checks if user is admin else redirect to start page
  componentDidMount () {
    if(JSON.parse(localStorage.getItem('user')).role != 'ADMIN') {
      this.props.history.push('/menu/viewkeys');
    }
  }

  //This handles name changes
  changeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  //This handles role changes
  roleChangeHandler = selectedRole => {
    if (selectedRole == null) selectedRole = [];
    this.setState({ role: selectedRole });
  };


  //This is called when add user is pressed.
  handleAddUser = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(this.state));
    if(this.state.email=="" || this.state.password=="" || this.state.firstname=="" || this.state.lastname=="" || this.state.role == "") {
      this.setState({
        message: "Please fill in all fields"
      });
    }
    else {
      var data = new Data();
      console.log("user to add="+JSON.stringify(this.state.role));
      data.addUser({
        eMail : this.state.email,
        firstname : this.state.firstname,
        lastname : this.state.lastname,
        password : this.state.password,
        role: this.state.role.value
    }).then(responseJson => {
      console.log(JSON.stringify(responseJson));
      if(responseJson.response) {
        this.setState({
          firstname: "",
          lastname: "",
          password: "",
          email: "",
          role: "",
          message: ""
      });
      this.setState({
        message: responseJson.response
      });
      }
      else {
        this.setState({message: "Error: an error occured"});
      }
    })
    }
  }

  render() {
    return (
      <form>
        <h1 style={{ color: "black" }} className="p-4">
          Add user
        </h1>
        <div style={{ color: "black", width: 300, margin: "auto" }}>
          First name
          <input
            placeholder="Enter first name"
            class="form-control"
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={this.changeHandler}
          />
          <p></p>
          Last Name
          <input
            placeholder="Enter last name"
            class="form-control"
            type="text"
            name="lastname"
            value={this.state.lastname}
            onChange={this.changeHandler}
          />
          <p></p>
          Password
          <input
              placeholder="Enter password"
              class="form-control"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.changeHandler}
            />
          <p></p>

          Email
          <input
            placeholder="Enter email"
            class="form-control"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
          />
          <p></p>
          Role
          <Select
            options={roles}
            onChange={this.roleChangeHandler}
            value={this.state.role}
          />
          <p></p>
          <text className="text-muted" style={{ fontSize: 15 }}>
            {this.state.message}
          </text>
          <p></p>
        
          <button className="btn btn-secondary btn-md m-2" onClick={this.handleAddUser}>
            Add User
          </button>
        </div>
      </form>
    );
  }
}
export default Adduserpage;
