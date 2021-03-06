/*
 The Conflict of Interest (COI) module of Kuali Research
 Copyright © 2005-2016 Kuali, Inc.

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

import React from 'react';//eslint-disable-line no-unused-vars
import sd from 'skin-deep';
import assert from 'assert';
import {TravelLogHeader} from '../../../../../../client/scripts/components/user/travel-log/travel-log-header';

/*global describe, it */

describe('TravelLogHeader', () => {
  it('should render h2 element with Travel Log text', () => {
    const travelLogHeader = sd.shallowRender(<TravelLogHeader/>);
    const dom = travelLogHeader.getRenderOutput();
    assert.equal('Travel Log', dom.props.children.props.children);
  });
});
