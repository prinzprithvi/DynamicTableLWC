import { LightningElement,track } from 'lwc';
import getRecords from '@salesforce/apex/DynamicTableLWCController.getRecords';
export default class DynamicTableLWC extends LightningElement {

    @track message;
    @track error;

    connectedCallback() {
        let fieldAPIs = ['Name','Account.Name','Title'];
        let contact = "Contact";
        let accountName = "Account.Name:Company Name";
        getRecords({"fieldAPIs": fieldAPIs,"sObjectType":contact,"replaceHeaders":accountName}).then(result => {
            this.message = result;
            this.error = undefined;
            let dvTable = this.template.querySelector('.mainTableDiv');
            let objectValue   = result.sObjectData;
            let fieldList     = result.fieldList;
            
            debugger;
            /* Create Dynamic Table */
            let sObjectDataTableHeader = [];
            // Create table Header
            for (let i=0; i <  fieldList.length; i++) {
                sObjectDataTableHeader.push(fieldList[i].label);
            }
            // eslint-disable-next-line no-console
            console.log(sObjectDataTableHeader);
            //Get the count of columns.
            let columnCount = sObjectDataTableHeader.length;
            //Create a HTML Table element.
            let table = document.createElement("TABLE");
            table.classList.add("slds-table");
            table.classList.add("slds-table_bordered");
            table.classList.add("slds-table_cell-buffer");
            table.style="table-layout: fixed;width: 100%;";
            
            //Add the header row.
            let row = table.insertRow(-1);
            row.classList.add("slds-text-title_caps");

            for (let i = 0; i < columnCount; i++) {
                let headerCell = document.createElement("TH");
                headerCell.setAttribute("scope", "col");

                let div = document.createElement("DIV");
                div.className = "slds-truncate";
                div.title = sObjectDataTableHeader[i];
                div.innerHTML = sObjectDataTableHeader[i];
                headerCell.appendChild(div);
                row.appendChild(headerCell);
            }
            dvTable.innerHTML = "";
            dvTable.appendChild(table);
            /* Create Dynamic Table End */
            
            if(objectValue.length){
                for(let j=0; j < objectValue.length; j++){
                    // Dynamic table Row
                    row = table.insertRow(-1);
                    // Dynamic Table Row End
                    for (let i=0; i <  fieldList.length; i++) {
                        // Dynamic table Row
                        let cell = row.insertCell(-1);
                        let div = document.createElement("DIV");
                        div.className = "slds-truncate";

                        if(i == 0){
                            let a = document.createElement("A");

                            let headerVal = '';
                            if(fieldList[i].apiName != undefined && fieldList[i].apiName.indexOf('.') != -1){
                                let parentTree = fieldList[i].apiName.split(".");
                                if(parentTree.length > 1 && objectValue[j].hasOwnProperty([parentTree[0]][parentTree[1]]))
                                    headerVal = objectValue[j][parentTree[0]][parentTree[1]];
                            }
                            if(headerVal != '')
                                    a.innerHTML = headerVal;
                            else
                                a.innerHTML = objectValue[j][fieldList[i].apiName];
                            a.setAttribute("name",objectValue[j].Id);
                            
                            a.addEventListener("click",function(){
                                //let records = component.get("v.searchResult");
                                let rec = this.getAttribute("name");
                                

                            },false);
                            div.appendChild(a);
                        }else{

                            if(fieldList[i].dataType == "BOOLEAN"){
                                let checkbox = document.createElement("INPUT");
                                checkbox.type = "checkbox";
                                checkbox.name = "name";
                                let headerVal = '';
                                if(fieldList[i].apiName != undefined && fieldList[i].apiName.indexOf('.') != -1){
                                    let parentTree = fieldList[i].apiName.split(".");
                                    if(parentTree.length > 1 && objectValue[j].hasOwnProperty([parentTree[0]][parentTree[1]]))
                                        headerVal = objectValue[j][parentTree[0]][parentTree[1]];
                                }
                                if(headerVal != '')
                                    checkbox.checked = headerVal;
                                else
                                    checkbox.checked = objectValue[j][fieldList[i].apiName];
                                checkbox.id = objectValue[j].Id;
                                checkbox.disabled = true;
                                div.appendChild(checkbox);
                            }else{

                                let headerVal = '';
                                if(fieldList[i].apiName != undefined && fieldList[i].apiName.indexOf('.') != -1){
                                    let parentTree = fieldList[i].apiName.split(".");
                                    if(parentTree.length > 1 && objectValue[j].hasOwnProperty([parentTree[0]][parentTree[1]]))
                                        headerVal = objectValue[j][parentTree[0]][parentTree[1]];
                                }
                                if(headerVal != '')
                                    div.innerHTML = headerVal;
                                else if(objectValue[j][fieldList[i].apiName] != undefined)
                                    div.innerHTML = objectValue[j][fieldList[i].apiName];
                                else 
                                    div.innerHTML = "";

                                
                                
                            }

                            
                        }
                        cell.appendChild(div);
                    }
                }
            }
        }).catch(error => {
            this.message = undefined;
            this.error = error;
        });
    }
    
}