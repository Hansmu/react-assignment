import React, { Component } from 'react';

export default class Header extends Component {

  renderNavbar() {
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">React Node Assignment</a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Nodes</a></li>
              <li><a href="#">Nodes Save And Load</a></li>
            </ul>
          </div>
        </nav>
    );
  }


  render() {
    return (
        <div>
          { this.renderNavbar() }
          { this.props.children }
        </div>
    );
  }
}
