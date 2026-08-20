import React, { Component } from "react";
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home({ resumeData }) {
  return (
    <>
      <Header data={resumeData.main} />
      <About data={resumeData.main} />
      <Resume data={resumeData.resume} />
      <Portfolio data={resumeData.portfolio} />
      <Testimonials data={resumeData.testimonials} />
      {/* Might add References component here or another page  */}
      <References />
      <Contact data={resumeData.main} />
      <Footer data={resumeData.main} />
    </>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeData: {},
    };
  }

  async getResumeData() {
    try {
      const response = await fetch("/resumeData.json", { cache: "no-cache" });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      this.setState({ resumeData: await response.json() });
    } catch (err) {
      console.error("Could not load resumeData.json:", err);
    }
  }

  componentDidMount() {
    this.getResumeData();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/resume" element={<ResumeHTML />} />
            <Route path="*" element={<Home resumeData={this.state.resumeData} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
export default App;
