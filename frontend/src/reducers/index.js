import { combineReducers } from "redux";

import auth from "./auth";
import blog from "./blog";

export default combineReducers({ auth, blog });
