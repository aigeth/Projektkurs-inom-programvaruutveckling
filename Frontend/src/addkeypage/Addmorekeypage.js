import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Data from "../Data";
import XLSX from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Addmorekeypage.css";

class Addonekeypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */,
      keys: [],
      games: [],
      platforms: [],
      regions: [],
      date: Date.now(),
      message: "",
    };
    this.handleFile = this.handleFile.bind(this);
    this.exportFile = this.exportFile.bind(this);
  }

  componentDidMount() {
    var data = new Data();
    data.getPlatforms().then((responseJson) => {
      var platforms = [];
      responseJson.map((platform) => {
        platforms.push({ value: platform.name, label: platform.name });
      });
      this.setState({ platforms: platforms });
    });
    data.getGames().then((responseJson) => {
      var games = [];
      responseJson.map((game) => {
        games.push({ value: game.name, label: game.name });
      });
      this.setState({ games: games });
    });
    data.getRegions().then((responseJson) => {
      var regions = [];
      responseJson.map((region) => {
        regions.push({ value: region.name, label: region.name });
      });
      this.setState({ regions: regions });
    });
  }

  /*This function is called whenever the user selects a game. */
  gameChangeHandler = (selectedGame, index) => {
    if (selectedGame == null) selectedGame = [];
    var keys = this.state.keys;
    keys[index].game.name = selectedGame.value;
    this.setState({ keys: keys });
  };

  /*This function is called whenever the user selects a region. */
  regionChangeHandler = (selectedRegion, index) => {
    if (selectedRegion == null) selectedRegion = [];
    var keys = this.state.keys;
    keys[index].region.name = selectedRegion.value;
    this.setState({ keys: keys });
  };

  /*This function is called whenever the user selects a platform. */
  platformChangeHandler = (selectedPlatform, index) => {
    if (selectedPlatform == null) selectedPlatform = [];
    var keys = this.state.keys;
    keys[index].platform.name = selectedPlatform.value;
    this.setState({ keys: keys });
  };

  /*This function is called whenever the user selects the startdate. */
  startDateChangeHandler = (selectedStartDate, index) => {
    var keys = this.state.keys;
    keys[index].startDate = selectedStartDate;
    this.setState({ keys: keys });
  };

  /*This function is called whenever the user selects the enddate. */
  endDateChangeHandler = (selectedEndDate, index) => {
    var keys = this.state.keys;
    keys[index].endDate = selectedEndDate;
    this.setState({ keys: keys });
    console.log(selectedEndDate.toLocaleDateString());
  };

  handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      console.log(XLSX.read(bstr, { type: rABS ? "binary" : "array" }));
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      console.log(data);
      var keys = [];
      data.map((a) => {
        keys.push({
          id: a[0],
          game: { name: "" },
          platform: { name: "" },
          region: { name: "" },
          startDate: null,
          endDate: null,
          uploader: JSON.parse(localStorage.getItem("user")),
        });
      });
      this.setState({ keys: keys });
      console.log(JSON.stringify(keys));
      /* Update state */
      // this.setState({ data: data, cols: make_cols(ws['!ref']) });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  exportFile() {
    var data = new Data();
    var keys = [];
    var isFilled = true;
    var keys = this.state.keys;
    for (var i = 0; i < this.state.keys.length; i++) {
      if (
        keys[i].game.name == "" ||
        keys[i].platform.name == "" ||
        keys[i].region.name == "" ||
        keys[i].startDate == null ||
        keys[i].endDate == null
      ) {
        isFilled = false;
      }
    }
    if (isFilled) {
      var keys = [];
      this.state.keys.map((key) => {
        keys.push({
          id: key.id,
          game: key.game,
          region: key.region,
          platform: key.platform,
          startDate: key.startDate.toLocaleDateString(),
          endDate: key.endDate.toLocaleDateString(),
          uploader: JSON.parse(localStorage.getItem("user")),
        });
      });
      data.addKeys(keys).then((responseJson) => {
        if (responseJson.response) {
          this.setState({
            message: responseJson.response,
          });
        } else {
          this.setState({
            message: "Error: Internal server error",
          });
        }
      });
      this.setState({
        keys: [],
      });
      this.setState({ date: Date.now() });
    } else {
      this.setState({
        message: "Error: Please fill in all fields",
      });
    }
  }

  render() {
    return (
      <div class="container">
        <div class="row">
          <div style={{ marginTop: 65, marginLeft: 330 }}>
            <text className="text-muted" style={{ fontSize: 15 }}>
              {this.state.message}
            </text>
          </div>
        </div>
        <div class="row">
          <div style={{ marginTop: 5, marginLeft: 330 }}>
            <DragDropFile handleFile={this.handleFile}>
              <DataInput handleFile={this.handleFile} data={this.state.date} />
            </DragDropFile>
          </div>
          <div>
            <button
              disabled={!this.state.keys.length}
              className="btn btn-secondary btn-sm m-2"
              onClick={this.exportFile}
            >
              Upload
            </button>
          </div>
        </div>
        {this.state.keys.length ? (
          <div class="row">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <th>Id</th>
                  <th>Game</th>
                  <th>Platform</th>
                  <th>Region</th>
                  <th>Start date</th>
                  <th>End date</th>
                </thead>
                <tbody>
                  {this.state.keys.map((key, index) => {
                    return (
                      <tr>
                        <td>{key.id}</td>
                        <td>
                          <Select
                            options={this.state.games}
                            onChange={(e) => this.gameChangeHandler(e, index)}
                          />
                        </td>
                        <td>
                          <Select
                            options={this.state.platforms}
                            onChange={(e) =>
                              this.platformChangeHandler(e, index)
                            }
                          />
                        </td>
                        <td>
                          <Select
                            options={this.state.regions}
                            onChange={(e) => this.regionChangeHandler(e, index)}
                          />
                        </td>
                        <td>
                          <DatePicker
                            selected={key.startDate}
                            className="form-control"
                            onChange={(e) =>
                              this.startDateChangeHandler(e, index)
                            }
                            dateFormat="dd/MM/yyy"
                            placeholder="Start date"
                          />
                        </td>
                        <td>
                          <DatePicker
                            selected={key.endDate}
                            className="form-control"
                            onChange={(e) =>
                              this.endDateChangeHandler(e, index)
                            }
                            dateFormat="dd/MM/yyy"
                            placeholder="End date"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div className="form-group">
        <input
          type="file"
          className="form-control"
          id="file"
          key={this.props.data}
          accept={SheetJSFT}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
class OutTable extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {this.props.cols.map((c) => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((r, i) => (
              <tr key={i}>
                {this.props.cols.map((c) => (
                  <td key={c.key}>{r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
const make_cols = (refstr) => {
  return [
    {
      name: "ID",
      key: 0,
    },
    {
      name: "Game",
      key: 1,
    },
    {
      name: "Platform",
      key: 2,
    },
    {
      name: "Region",
      key: 3,
    },
    {
      name: "Status",
      key: 4,
    },
  ];
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

export default Addonekeypage;
