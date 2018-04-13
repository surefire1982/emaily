import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        // don't show anything if still loading
        return
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        )
      default:
        // not null, not false, must be logged in
        return (
          <li>
            <a>Logout</a>
          </li>
        )
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Emaily</a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)
