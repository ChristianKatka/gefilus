import { Component, ViewChild } from '@angular/core';
import {
  BryntumGanttComponent,
  BryntumGanttProjectModelComponent,
} from '@bryntum/gantt-angular';
import { ganttConfig, projectConfig } from './gant.config';

@Component({
  selector: 'app-gant',
  templateUrl: 'gant.container.html',
  styleUrl: 'gant.container.scss',
})
export class GantContainerComponent {
  startDate = new Date(2022, 0, 1);

  tasks = [
    {
      id: 1,
      name: 'Write docs',
      expanded: true,
      children: [
        {
          id: 6,
          name: 'Proof-read docs',
          startDate: '2022-01-02',
          endDate: '2022-01-09',
        },
        {
          id: 3,
          name: 'Release docs',
          startDate: '2022-01-09',
          endDate: '2022-01-10',
        },
      ],
    },
  ];

  dependencies = [{ fromTask: 6, toTask: 3 }];

  ganttConfig = ganttConfig;
  projectConfig = projectConfig;

  @ViewChild('gantt') ganttComponent!: BryntumGanttComponent;
  @ViewChild('project') projectComponent!: BryntumGanttProjectModelComponent;
}
