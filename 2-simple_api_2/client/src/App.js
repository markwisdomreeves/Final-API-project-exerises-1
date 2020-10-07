import React, { Component } from 'react';
import axios from "axios";
import './App.css';


class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToUpdate: null,
    idToDelete: null,
    objectToUpdate: null
    // backendApiUrl: null
  };


  // Global Backend URL variable
  // backendApiUrl = 'http://localhost:3001/api';


  // when component mounts, the first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getAllDataFromDB();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getAllDataFromDB, 20000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // You should never let a process live forever
  // You should always kill a process every time we are done using it
  // componentWillUnmount() {
  //   if (this.state.intervalIsSet) {
  //     clearInterval(this.state.intervalIsSet);
  //     this.setState({ intervalIsSet: null });
  //   }
  // }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // This is our first GET method that uses our backend api to
  // fetch / get All data from our database
  getAllDataFromDB = () => {
    // fetch(`${backendApiUrl}/getAllData`)
    fetch("http://localhost:3001/api/getAllData")
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our createSingleData method uses our backend api
  // to create new query or data into our database
  createSingleDataIntoDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/createSingleData', {
      id: idToBeAdded,
      message: message,
    });

  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDataInToDB = (idToUpdate, newDataToUpdate) => {
    let objectIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((singleData) => {
      if (singleData.id === idToUpdate) {
        objectIdToUpdate = singleData._id;
      };
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objectIdToUpdate,
      update: {
        message: newDataToUpdate,
      }
    })
  }


  // our delete method that uses our backend api
  // to remove existing database information
  deleteSingleDataFromDB = (idToDelete) => {
    parseInt(idToDelete);
    let objectIdToDelete = null;
    this.state.data.forEach((singleData) => {
      if (singleData.id === idToDelete) {
        objectIdToDelete = singleData._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objectIdToDelete
      },
    });
  };



  // Here is our UI
  render() {
    const { data } = this.state;
    // const { 
    //       createSingleDataIntoDB, 
    //       getAllDataFromDB, 
    //       updateDataInToDB, 
    //       deleteSingleDataFromDB 
    //     } = this;
    return (
      <div className="container mt20">
        <ul className="form-group">
          {data.length <= 0
            ? 'Please wait, We are fetching the data from the Database'
            : data.map((singleDataFromDB) => (
              <li className="form-control p10" key={data.message}>
                <span className="text-secondary">id: </span> {singleDataFromDB.id} <br />
                <span className="text-secondary"> data: </span>
                {singleDataFromDB.message}
              </li>
            ))
          }
        </ul>
          <div className="form-group p10">
            <input
              className="form-control" 
              type="text"
              onClick={(e) => this.setState({ message: e.target.value })}
              placeholder="Add something into the database"
              // style={{ width: '200px' }}
            />
            <button
             type="button" className="btn btn-primary"
             onClick={() => this.createSingleDataIntoDB(this.state.message)}>
                CREATE NEW DATA
            </button>
          </div>

          <div className="form-group p10">

            <button
             type="button" className="btn btn-primary"
             onClick={() => this.getAllDataFromDB(this.state.message)}>
                GET ALL DATA FROM THE DATABASE
            </button>
          </div>

          <div className="form-group p10">
            <input
              className="form-control" 
              type="text"
              onClick={(e) => this.setState({ idToDelete: e.target.value })}
              placeholder="Please enter the ID of the item you want to delete"
              // style={{ width: '200px' }}
            />
            <button 
             type="button" className="btn btn-primary"
             onClick={() => this.deleteSingleDataFromDB(this.state.idToDelete)}>
                DELETE DATA
            </button>
          </div>

          <div className="form-group p10">
            <input
              className="form-control" 
              type="text"
              onClick={(e) => this.setState({ idToUpdate: e.target.value })}
              placeholder="Please enter the value of the item you want to update"
              // style={{ width: '200px' }}
            />
            <input
              className="form-control" 
              type="text"
              onClick={(e) => this.setState({ updateToApply: e.target.value })}
              placeholder="Please enter the new value you want to update with"
              // style={{ width: '200px' }}
            />
            <button 
              type="button" className="btn btn-primary"
              onClick={() => this.updateDataInToDB(this.state.idToUpdate, this.state.updateToApply)}
            >
              UPDATE/CHANGE/REPLACE DATA
            </button>
          </div>
      </div>
    )
  }

}



export default App;

