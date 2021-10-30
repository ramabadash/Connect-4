"use strict"
import _ from 'lodash';
import './style.css';

import Controller from './controller';

localStorage.setItem("scores", JSON.stringify({"yellow" : 0, "red": 0}));
const app = new Controller();

app.run();