import React, { Component } from "react";

import bg from "./dh47.jpg";
import withCheckLogin from "../../containers/with_check_login";

@withCheckLogin
class Home extends Component {
  render() {
    return (
      <div>
        <img src={bg} alt="bg" />
      </div>
    );
  }
}
export default Home;
