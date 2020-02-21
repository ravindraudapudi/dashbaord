import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationService } from 'primeng/api';
import { CommonService } from 'src/app/utils/services/common.service';

@Component({
  selector: 'em-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {

  stages: any;
  displayDialog: boolean;
  dialogeHead: string;
  addButton: boolean;
  model : any =  {};
  stageAlert: string = "Stage Required";
  descriptionAlert: string = "description Required";
  OrderAlert : string = "Order Number Required";
  numberExp: RegExp = /^[\d\(\)\-\.+]+$/;
  errorMessage: any;
  confirmHead: string;
  loading: boolean = false;
  @ViewChild ('stageForm')stageform;
  viewOpportunity: any;

  constructor(private configService: ConfigService,
    private commonService: CommonService,
    private _notify: NotificationsService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getAllStages();
    this.getGratnedPrivileges();
  }

  getAllStages() {
    this.configService.getStages().subscribe((res) => {
      if (res) {
        this.stages = res;
      }
    })
  }

  /**
   * 
   * @param title 
   * @param btn 
   */
  showDialog(title: string, btn: boolean) {
    this.displayDialog = true;
    this.dialogeHead = title;
    this.stageform.form.reset();
    if(btn){
      this.model = {};
    }
    this.addButton = btn;
    this.model.stageColor = "black";
    this.errorMessage = "";
  }

  /**
   * To add stage to application
   */
  saveStage(data) {
    this.configService.saveStage(data).subscribe((res => {
      this.responseMessage(res);
    }))
  }


  editStage(data){
    this.showDialog('Edit Stage', false);
      this.model = {...data}
  }

  /**
   * Update Stage
   */
  updateStage(){
    this.configService.updateStage(this.model.id, this.model).subscribe( (res => {
      this.responseMessage(res);
    }))
  }

  /**
   * 
   * @param rowData Confirmation box
   */
  confirmation(rowData) {
    this.confirmHead = 'Confirmation';
    this.confirmationService.confirm({
      message: 'Do you want to delete this Stage?',
      accept: () => {
        this.loading = true;
        let tempData = [];
        this.configService.deleteStage(rowData.id).subscribe(res => {
          this.responseMessage(res);
        });
      }
    });
  }

  /**
   *  To view the response message
   * @param res 
   */
  responseMessage(res) {
    const responseValue = JSON.parse(JSON.stringify(res));
    if (responseValue.responseStatus === '201' || responseValue.responseStatus === '200') {
      this.displayDialog = false;
      this.getAllStages();
      this.model = {};
      this._notify.success('', responseValue.successDescription);
    } else if (responseValue.responseStatus === '500') {
      this.displayDialog = true;
      this.errorMessage = responseValue.successDescription;
    }
  }

  getGratnedPrivileges(){
    this.commonService.getGrantedPrivileges().subscribe((res =>{
      this.viewOpportunity = res.viewOpportunity;
    }))
  }
}
