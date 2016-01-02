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

import styles from './style';
import React from 'react';
import ProjectToReview from '../ProjectToReview';

export default function DeclarationSection(props) {
  const projects = props.declarationsToReview;

  const projectsJSX = projects.map((project, index) => {
    return (
      <ProjectToReview
        key={project.id}
        project={project}
        last={index === projects.length - 1}
      />
    );
  });

  return (
    <div className={`${styles.container} ${props.className}`} name='Declaration Section'>
      <div className={styles.title}>
        PROJECT DECLARATIONS
      </div>
      <div className={styles.body}>
        {projectsJSX}
      </div>
    </div>
  );
}
