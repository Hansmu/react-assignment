import React, { Component } from 'react';

export default class Header extends Component {

  renderNavbar(currentPath, navigateTo) {
      const isInNodesView = currentPath === '/';

      return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand"
                 onClick={() => navigateTo('/')}
                 href="#">
                  React Node Assignment
              </a>
            </div>
            <ul className="nav navbar-nav">
              <li className={ isInNodesView ? 'active' : '' }
                  onClick={() => navigateTo('/')}>
                  <a href="#">Nodes</a>
              </li>
              <li className={ isInNodesView ? '' : 'active' }
                  onClick={() => navigateTo('nodes/io')}>
                  <a href="#">Nodes IO</a>
              </li>
            </ul>
          </div>
        </nav>
    );
  }


  render() {
      return (
          <div>
              { this.renderNavbar(this.props.location.pathname, this.props.router.push) }
              { this.props.children }
          </div>
    );
  }
}
