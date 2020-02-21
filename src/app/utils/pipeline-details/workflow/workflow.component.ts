import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'em-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit, OnChanges {

  @Input()
  workFlowInputs: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.workFlowInputs.map(element => {
      if (element.stages && element.stages.stage) {
        element.stage = element.stages.stage;
      }
    });
  }

}
