import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Contact from "./Components/Contact";
import Testimonials from "./Components/Testimonials";
import Portfolio from "./Components/Portfolio";
import ResumeHTML from "./Components/ResumeHTML";
import References from "./Components/References";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

class App extends Component {
  try = () => {
    this.props.history.push("/resume");
  };

  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
    };
  }

  getResumeData() {
    $.ajax({
      url: "/resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/resume" component={ResumeHTML} />

            <Route path="/">
              <Header data={this.state.resumeData.main} />

              <About data={this.state.resumeData.main} routeResume={this.try} />

              <Resume data={this.state.resumeData.resume} />
              <Portfolio data={this.state.resumeData.portfolio} />
              <Testimonials data={this.state.resumeData.testimonials} />
              {/* Might add References component here or another page  */}
              <References />
              <Contact data={this.state.resumeData.main} />
              <Footer data={this.state.resumeData.main} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
