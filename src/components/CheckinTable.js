import React, { Component } from "react";

import { Table, TableBody, TableRow, TableRowColumn } from "material-ui/Table";
import { TableHeader, TableHeaderColumn } from "material-ui/Table";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

const styles = {
  tableCellStyle: {
    padding: "10px",
    textAlign: "center",
    textOverflow: "none"
  },
  tableMenuCellStyle: {
    padding: "0px",
    width: "30px"
  }
};


export default class CheckinTable extends Component {
  header() {
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn style={ styles.tableCellStyle }>Date</TableHeaderColumn>
          <TableHeaderColumn style={ styles.tableCellStyle }>Weight</TableHeaderColumn>
          <TableHeaderColumn style={ styles.tableCellStyle }>Fat</TableHeaderColumn>
          <TableHeaderColumn style={ styles.tableCellStyle }>Waist</TableHeaderColumn>
          <TableHeaderColumn style={ styles.tableMenuCellStyle }></TableHeaderColumn>
        </TableRow>
      </TableHeader>
    );
  }

  menu(key) {
    const iconButton = (
      <IconButton style={ styles.tableMenuCellStyle }><MoreVertIcon /></IconButton>
    );

    const handleDelete = () => {
      this.props.onDelete(key);
    };

    return (
      <IconMenu
        iconButtonElement={iconButton}
        anchorOrigin={{horizontal: "right", vertical: "top"}}
        targetOrigin={{horizontal: "right", vertical: "top"}}
      >
        <MenuItem onTouchTap={handleDelete} primaryText="Delete" />
      </IconMenu>
    );
  }

  rows() {
    return this.props.checkins.map(checkin => {
      const date = new Date(checkin.date);
      return (
        <TableRow key={ checkin.key }>
          <TableRowColumn style={ styles.tableCellStyle }>
            { `${date.getDate()}/${date.getMonth()+1}` }
            <br />
            { date.getFullYear() }
          </TableRowColumn>
          <TableRowColumn style={ styles.tableCellStyle }>
            { checkin.weight } kg
          </TableRowColumn>
          <TableRowColumn style={ styles.tableCellStyle }>
            { checkin.fat } %
          </TableRowColumn>
          <TableRowColumn style={ styles.tableCellStyle }>
            { checkin.waist } cm
          </TableRowColumn>
          <TableRowColumn style={ styles.tableMenuCellStyle }>
            { this.menu(checkin.key) }
          </TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <Table selectable={false}>
        { this.header() }
        <TableBody displayRowCheckbox={false}>
          { this.rows() }
        </TableBody>
      </Table>
    );
  }
}
