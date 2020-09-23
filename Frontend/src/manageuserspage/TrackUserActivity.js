import React, { Component } from "react";
import Data from "../Data";

/** Track user activity class, 
 * used to display all user activity on the web application by fetching data from the database.
 * Admins can see which user performed which action and at what time and date. 
 * The latest activity is at the top of the table.
 * 
 * @author Kamile Juvencius
 */
class UserActivity extends Component {
  /* Initializes the states. Retrieves all web application activities from the database. */
  constructor(props) {
    super(props);
    this.state = { activity: [] };

    var data = new Data();
    data.getActivity().then((responseJson) => {
      responseJson.reverse();
      this.setState({ activity: responseJson });
    });
  }
  /* This function is called after the HTML render has finished loading. 
    It signals that the component and all its sub-components have rendered properly.
    If an ordinary user somehow gets access to this class, the user will be 
    redirected to the "View keys" page. */
  componentDidMount() {
    if (JSON.parse(localStorage.getItem('user')).role !== 'ADMIN') {
      this.props.history.push('/menu/viewkeys');
    }
  }
  render() {
    return (
      <div class="container" style={{ marginTop: 30 }}>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody id="myTable">
            {
              (this.state.activity.length === 0) ?
                <td colSpan="5">No activity</td>
                :
                this.state.activity.map((activity) => {

                  return (
                    <tr>
                      <td>{activity.username}</td>
                      <td>{activity.log}</td>
                      <td>{activity.date}</td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserActivity;
