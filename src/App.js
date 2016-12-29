import React, { Component } from 'react';
import * as firebase from "firebase";

import AppBar from 'material-ui/AppBar';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { TableHeader, TableHeaderColumn } from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import NewEntryForm from './NewEntryForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      checkins: []
    }
  }

  componentDidMount() {
    firebase.database().ref("/checkins").on("value", snapshot => {
      const checkins = snapshot.val();
      this.setState({
        checkins: Object.keys(checkins).reverse().map(k => {
          return {
            key: k,
            date: checkins[k].createdAt,
            weight: checkins[k].weight,
            fat: checkins[k].fat,
            waist: checkins[k].waist
          }
        })
      })
    });
  }

  render() {
    const tableCellStyle = {
      padding: "10px",
      textAlign: "center",
      textOverflow: "none"
    };
    const tableMenuCellStyle = {
      padding: "0px",
      width: "30px"
    }

    const iconButton = (
      <IconButton style={tableMenuCellStyle}><MoreVertIcon /></IconButton>
    );

    const LoadingSpinner = (
      <div style={{ marginTop: "30px", textAlign: "center", position: "relative" }}>
        <RefreshIndicator
          size={40}
          left={10}
          top={0}
          status="loading"
          style={{ display: "inline-block", position: "relative" }}
        />
      </div>
    );


    const rows = this.state.checkins.map(checkin => {
      const date = new Date(checkin.date);
      return (
        <TableRow key={ checkin.key }>
          <TableRowColumn style={ tableCellStyle }>
            { `${date.getDate()}/${date.getMonth()}` }
            <br />
            { date.getFullYear() }
          </TableRowColumn>
          <TableRowColumn style={ tableCellStyle }>
            { checkin.weight } kg
          </TableRowColumn>
          <TableRowColumn style={ tableCellStyle }>
            { checkin.fat } %
          </TableRowColumn>
          <TableRowColumn style={ tableCellStyle }>
            { checkin.waist } cm
          </TableRowColumn>
          <TableRowColumn style={ tableMenuCellStyle }>
            <IconMenu
              iconButtonElement={iconButton}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Edit" />
              <MenuItem primaryText="Delete" />
            </IconMenu>
          </TableRowColumn>
        </TableRow>
      );
    });

    const table = (
      <Table selectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={ tableCellStyle }>Date</TableHeaderColumn>
            <TableHeaderColumn style={ tableCellStyle }>Weight</TableHeaderColumn>
            <TableHeaderColumn style={ tableCellStyle }>Fat</TableHeaderColumn>
            <TableHeaderColumn style={ tableCellStyle }>Waist</TableHeaderColumn>
            <TableHeaderColumn style={ tableMenuCellStyle }></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          { rows }
        </TableBody>
      </Table>
    );


    return (
      <div className="App">
        <AppBar title="FatLog" showMenuIconButton={false} />
        <NewEntryForm />
        { (this.state.checkins.length === 0) ? LoadingSpinner : table }
      </div>
    );
  }
}
export default App;
