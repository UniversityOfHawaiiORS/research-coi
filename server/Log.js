/*
    The Conflict of Interest (COI) module of Kuali Research
    Copyright © 2015 Kuali, Inc.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>
*/
/* eslint-disable no-console */
import {COIConstants} from '../COIConstants';

class Log {
  info(message) {
    if (process.env.LOG_LEVEL <= COIConstants.LOG_LEVEL.INFO) {
      let date = new Date().toISOString();
      console.info(`${date} INFO  ${message}`);      
    }
  }

  warn(message) {
    if (process.env.LOG_LEVEL <= COIConstants.LOG_LEVEL.WARN) {
      let date = new Date().toISOString();
      console.warn(`${date} WARN  ${message}`);
    }
  }

  error(message) {
    let date = new Date().toISOString();
    console.error(`${date} ERROR ${message}`);
  }
}

export default new Log();
