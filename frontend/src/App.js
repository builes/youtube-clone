import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadVideo from "./components/UploadVideo";
import Home from "./components/Home";
import resultsSearch from "./components/resultsSearch";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route exact path="/uploadvideo" component={UploadVideo} />
        <Route exact path="/" component={Home} />
        <Route exact path="/video/:id" component={Home} />
        <Route exact path="/resultssearch" component={resultsSearch} />
      </div>
    </Router>
  );
}

export default App;
