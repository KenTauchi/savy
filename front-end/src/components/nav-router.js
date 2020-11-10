import React from "react";
import { Switch, Route } from "react-router-dom";
import RecyclingCanada from "./recycling-canada/recycling-canada";
import WasteManagement from "./waste-management/waste-management";
import Explore from "./explore/explore";
import Contact from "./contact/contact";
import Quiz from "./quiz/quiz";
import QuizStarter from "./quiz/quiz-starter/QuizStarter";

const NavRouter = () => (
  <Switch>
    <Route exact path="/" component={RecyclingCanada} />
    <Route path="/waste-management" component={WasteManagement} />
    <Route path="/challenges/rule" component={QuizStarter} />
    <Route exact path="/challenges" component={Quiz} />
    <Route path="/explore" component={Explore} />
    <Route path="/contact" component={Contact} />
  </Switch>
);

export default NavRouter;
