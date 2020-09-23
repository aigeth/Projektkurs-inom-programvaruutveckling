import React from "react";
import Select from 'react-select';
import Data from '../Data';
import XLSX from 'xlsx';
import Checkbox from 'react-simple-checkbox';
import "./Viewkeyspage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const status = [
  { value: 'Available', label: 'Available' },
  { value: 'Taken', label: 'Taken' },
  { value: 'Expired', label: 'Expired' }
]

/** View keys class, 
 * used to display all existing keys. The user can search for specific keys by 
 * selecting one or multiple of the following: game title, region, platform and key status.
 * If all fields are left unselected, all existing keys will be fetched.
 * 
 * To download, delete or comment keys, a user must select keys by checking the checkbox
 * beside each key. Users are not authorized to delete other users keys, this is an admin privilege.
 * 
 * Keys are downloaded as an excel file which contains all relevant information about the selected keys.
 * 
 * @author Kamile Juvencius
 */
class ViewKeyspage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: [], region: [], platform: [], searchResults: [],
      checkBox: {}, status: [], selectedKeys: [], platforms: [],
      games: [], regions: [], selectAll: false, message: "", comment: "", addingComment: false, startDate: null, endDate: null
    };
  }
  /* This function runs after the component has been rendered.
    Fetches all existing games, platforms and regions from the database. */
  componentDidMount() {
    var data = new Data();
    data.getPlatforms()
      .then(responseJson => {
        var platforms = [];
        responseJson.forEach(platform => {
          platforms.push({ value: platform.name, label: platform.name });
        })
        this.setState({ platforms: platforms });
      })
    data.getGames()
      .then(responseJson => {
        var games = [];
        responseJson.forEach(game => {
          games.push({ value: game.name, label: game.name });
        })
        this.setState({ games: games });
      })
    data.getRegions()
      .then(responseJson => {
        var regions = [];
        responseJson.forEach(region => {
          regions.push({ value: region.name, label: region.name });
        })
        this.setState({ regions: regions });
      })
  }
  /* This function is called when the user presses the "Search" button. 
    It fetches relevant data from the database and updates the table. */
  searchHandler = (event) => {
    this.resetSelected();
    var games = [];
    this.state.game.forEach(game => {
      games.push(game.value);
    })
    var regions = [];
    this.state.region.forEach(region => {
      regions.push(region.value);
    })
    var platforms = [];
    this.state.platform.forEach(platform => {
      platforms.push(platform.value);
    })
    var statuses = [];
    this.state.status.forEach(status => {
      statuses.push(status.value);
    })
    var startDate = null;
    var endDate = null;
    if(this.state.startDate != null && this.state.endDate != null) {
      startDate = this.state.startDate.toLocaleDateString();
      endDate = this.state.endDate.toLocaleDateString();
    }
    var data = new Data();
    data.search(games, platforms, regions, statuses, startDate, endDate)
      .then(responseJson => {

        var newData = responseJson;
        newData.forEach(newData => {
          newData.platform = newData.platform.name;
          newData.region = newData.region.name;
          newData.game = newData.game.name;
          if (newData.uploader != null)
            newData.uploader = newData.uploader.eMail;
          else
            newData.uploader = "Deleted user";
        })

        this.setState({ message: "" });
        this.updateTableData(newData);
      });
  };
  /* This function resets all the "Select..." fields of the search field.*/
  resetSearchHandler = (event) => {
    this.setState({
      game: [],
      region: [],
      platform: [],
      status: [],
      startDate: null, 
      endDate: null
    });
  };
  /* This function is called whenever the user selects/unselects a game in the search field. */
  gameChangeHandler = selectedGame => {
    if (selectedGame == null) selectedGame = [];
    this.setState({ game: selectedGame });
  };
  /* This function is called whenever the user selects/unselects a region in the search field. */
  regionChangeHandler = selectedRegion => {
    if (selectedRegion == null) selectedRegion = [];
    this.setState({ region: selectedRegion });
  };
  /* This function is called whenever the user selects/unselects a platform in the search field. */
  platformChangeHandler = selectedPlatform => {
    if (selectedPlatform == null) selectedPlatform = [];
    this.setState({ platform: selectedPlatform });
  };
  /* This function is called whenever the user selects/unselects a key status in the search field. */
  statusChangeHandler = selectedStatus => {
    if (selectedStatus == null) selectedStatus = [];
    this.setState({ status: selectedStatus });
  };
   /*This function is called whenever the user selects the startdate. 
  Sets the 'startDate' attribute. */
  startDateChangeHandler = (selectedStartDate) => {
    this.setState({ startDate: selectedStartDate });
  };
  /*This function is called whenever the user selects the enddate. 
  Sets the 'endDate' attribute. */
  endDateChangeHandler = (selectedEndDate) => {
    this.setState({ endDate: selectedEndDate });
  };
  /*This function is called when we have received data from the database and want to update the table. */
  updateTableData = (newData) => {
    this.setState({ searchResults: newData });
  };
  /* This function unselects all of the selected keys. */
  resetSelected = () => {
    this.setState({ selectAll: false });
    let all = this.state.checkBox;
    this.state.searchResults.forEach(searchResults => {
      all[searchResults.id] = false;
    })
    this.setState({ checkBox: all, selectedKeys: [], addingComment: false });
  };
  /* This function is called whenever the user selects/unselects a key. The selected key is 
    pushed/filtered to/from the selectedKeys array. If a selected key is being commented and the 
    user unselects a key without confirming the comment, the comment field will close and
    the key will remain uncommented. */
  checkboxChangeHandler = (key) => {
    let ischeckedBox = this.state.checkBox;
    if (ischeckedBox[key.id]) {
      this.setState({
        selectedKeys: this.state.selectedKeys.filter(item => item.id !== key.id)
      });
      if (this.state.selectedKeys.length === 1) {
        this.setState({ addingComment: false });
      }
    }
    else
      this.state.selectedKeys.push(key);

    ischeckedBox[key.id] = !ischeckedBox[key.id];
    this.setState({ checkedBox: ischeckedBox });
  };
  /* This function is called whenever the user wants to select/unselect all visible keys.
    If the selected keys are being commented and the user unselects the keys without confirming 
    the comment, the comment field will close and the keys will remain uncommented. */
  selectAllhandler = () => {
    this.setState({ selectAll: !this.state.selectAll });
    let all = this.state.checkBox;
    this.state.searchResults.forEach(searchResults => {
      all[searchResults.id] = !this.state.selectAll;
    })
    this.setState({ checkBox: all });

    if (!this.state.selectAll)
      this.setState({ selectedKeys: this.state.searchResults });
    else 
      this.setState({ selectedKeys: [], addingComment: false });
  };
  /* This function is called whenever the user presses the "Dowload selected keys" button.
    The keys in the selectedKeys array will be downloaded to the users computer as 
    an Excel file containing information about the selected keys. All available keys will
    be changes to "Taken" in the database. */
  downloadKey = () => {
    if (this.state.selectedKeys.length !== 0) {
      var data = new Data();
      for (var i = 0; i < this.state.selectedKeys.length; i++) {
        data.registerKey(this.state.selectedKeys[i].id);
      }
      let binaryWS = XLSX.utils.json_to_sheet(this.state.selectedKeys);
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, binaryWS, 'Keys')
      XLSX.writeFile(wb, 'keys.xlsx');
      this.setState({ message: "" });

      var keys = this.state.searchResults;
      keys.forEach(key => {
        for (var i = 0; i < this.state.selectedKeys.length; i++) {
          if (key.id === this.state.selectedKeys[i].id) {
            if (key.status !== "Expired")
              key.status = "Taken";
          }
        }
      })
      this.setState({ searchResults: keys });
    }
    else
      this.setState({ message: "You need to select a key to download" });
  };
  /* This function is called whenever the user presses the "Delete selected keys" button.
    The keys in the selectedKeys array will be deleted from the database if the user has the
    privilege to delete them. */
  deleteKeys = () => {
    if (this.state.selectedKeys.length !== 0) {
      var keysToDelete = this.state.selectedKeys;
      var filteredSearchResults = this.state.searchResults;
      var keys = [];
      var authorization = true;

      keysToDelete.forEach(keysToDelete => {
        keys.push({
          id: keysToDelete.id,
          game: { name: keysToDelete.name },
          platform: { name: keysToDelete.platform },
          region: { name: keysToDelete.region },
          status: keysToDelete.status,
        })
        const role = JSON.parse(localStorage.getItem('user')).role;
        const eMail = JSON.parse(localStorage.getItem('user')).eMail;
        if (role === 'ADMIN') {
          filteredSearchResults = filteredSearchResults.filter(item => item.id !== keysToDelete.id);
        }
        if (role === 'USER') {
          if (keysToDelete.uploader === eMail) {
            filteredSearchResults = filteredSearchResults.filter(item => item.id !== keysToDelete.id);
          }
          else
            authorization = false;
        }
        this.resetSelected();
      })
      this.setState({ selectedKeys: [], searchResults: filteredSearchResults });

      var data = new Data();
      data.deleteKeys(keys).then(responseJson => {
        if (responseJson.response) {
          this.setState({ message: responseJson.response })
          if (authorization === false)
            this.setState({ message: "You can only delete keys that you have uploaded, " + responseJson.response })
        }
        else
          this.setState({ message: "Error: Internal server error" });
      })
      this.setState({ message: "" });
    }
    else
      this.setState({ message: "You need to select a key to delete" });
  };
  /* Changes the comment field value whenever the user types. */ 
  commentHandler = (event) => {
    this.setState({ comment: event.target.value });
  };
  /* This function is called when the user presses the "Comment" button. Empty comments
    are not pushed to the database.  */
  addCommentHandler = () => {
    if (this.state.selectedKeys.length !== 0) {
      this.setState({ message: "" });
      if (this.state.addingComment) {
        this.state.selectedKeys.forEach(selectedKeys => {
          var data = new Data();
          data.commentKey(selectedKeys.id, this.state.comment)
            .then(responseJson => {
              if (responseJson.response) {
                this.setState({
                  message: responseJson.response
                })
                var keys = this.state.searchResults;
                keys.forEach(key => {
                  if (key.id === selectedKeys.id) {
                    key.comment = this.state.comment;
                  }
                })
                this.setState({
                  searchResults: keys
                });
              }
              else if (this.state.comment.length === 0) 
                this.setState({ message: "Error: Comment field is empty" })
              else 
                this.setState({ message: "Error: Internal server error" })
            })
        })
        this.resetSelected();
      }
      this.setState({ addingComment: !this.state.addingComment });
    }
    else
      this.setState({ message: "You need to select a key to comment" });
  };
  render() {
    return (
      <div>
        <div class="container" style={{ width: 1000 }}>
          <h1 style={{ color: "black", marginTop: 20 }} className="p-4">
            View keys
        </h1>
          <div class="row" style={{ marginTop: 30 }}>
            <div class="col" style={{ color: "black" }}>
              <Select
                className="selectpicker"
                placeholder='Select game...'
                options={this.state.games}
                value={this.state.game}
                isMulti
                onChange={this.gameChangeHandler} />
            </div>
            <div class="col" style={{ color: "black" }}>
              <Select
                className="selectpicker"
                placeholder='Select status...'
                options={status}
                value={this.state.status}
                isMulti
                onChange={this.statusChangeHandler} />
            </div>
          </div>
          <div class="row" style={{ marginTop: 10 }}>
            <div class="col" style={{ color: "black" }}>
              <Select
                className="selectpicker"
                placeholder='Select regions...'
                options={this.state.regions}
                value={this.state.region}
                isMulti
                onChange={this.regionChangeHandler} />
            </div>
            <div class="col" style={{ color: "black" }}>
              <Select
                className="selectpicker"
                placeholder='Select platforms...'
                options={this.state.platforms}
                value={this.state.platform}
                isMulti
                onChange={this.platformChangeHandler} />
            </div>
          </div>
          <div class="row" style={{ marginTop: 10 }}>
            <div class="col" style={{ color: "black", marginRight: 170 }}>
              Start date
              {' '}
            <DatePicker
                className="form-control"
                selected={this.state.startDate}
                onChange={this.startDateChangeHandler}
                value={this.state.startDate}
                dateFormat="dd/MM/yyy"
              />
            </div>
            <div class="col" style={{ color: "black", marginRight: 177,  }}>
              End date
              {' '}
            <DatePicker
                className="form-control"
                selected={this.state.endDate}
                onChange={this.endDateChangeHandler}
                value={this.state.endDate}
                dateFormat="dd/MM/yyy"
              />
            </div>
          </div>

          <div class="row" style={{ marginTop: 20, marginLeft: 3 }}>
            <div>
              <input
                className="btn btn-secondary btn-md m-0"
                type="submit"
                value="Search"
                onClick={this.searchHandler} />
            </div>
            <div style={{ marginLeft: 10 }}>
              <input
                className="btn btn-secondary btn-md m-0"
                type="submit"
                value="Reset"
                onClick={this.resetSearchHandler} />
            </div>
          </div>
        </div>
        <div class="container" style={{ marginTop: 30 }}>
          <table class="table table-bordered table-striped">
            <thead>
              <tr>
                <th>
                  <Checkbox size='3' checked={this.state.selectAll} onChange={this.selectAllhandler}></Checkbox>
                </th>
                <th>Game</th>
                <th>Platform</th>
                <th>Region</th>
                <th>Status</th>
                <th>Uploader</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody id="myTable">
              {
                (this.state.searchResults.length === 0) ?
                  <td colSpan="7">No keys found</td>
                  :
                  this.state.searchResults.map(searchResults => {
                    return (
                      <tr>
                        <td>
                          <Checkbox
                            size='3'
                            backAnimationDuration='180'
                            tickAnimationDuration='500'
                            checked={this.state.checkBox[searchResults.id]}
                            onChange={() => this.checkboxChangeHandler(searchResults)}>
                            {searchResults}
                          </Checkbox>
                        </td>
                        <td>{searchResults.game}</td>
                        <td>{searchResults.platform}</td>
                        <td>{searchResults.region}</td>
                        <td>{searchResults.status}</td>
                        <td>{searchResults.uploader}</td>
                        <td>{searchResults.comment}</td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
          <text className="text-muted" style={{ fontSize: 15 }}>
            {this.state.message}
          </text>
          <p></p>

          {this.state.addingComment ?
            <input
              placeholder="Enter comment"
              class="form-control"
              type="comment"
              name="comment"
              onChange={this.commentHandler}>
            </input>
            : void 0}

          <p></p>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={this.addCommentHandler}>
            Comment ({this.state.selectedKeys.length})
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={this.downloadKey}>
            Download ({this.state.selectedKeys.length})
          </button>
          &nbsp;&nbsp;&nbsp;
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={this.deleteKeys}>
            Delete ({this.state.selectedKeys.length})
          </button>
        </div>
      </div>
    );
  }
}
export default ViewKeyspage;