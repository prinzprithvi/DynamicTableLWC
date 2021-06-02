import { LightningElement,track } from 'lwc';

export default class DynamicTableWrapperLWC extends LightningElement {
    @track fieldapis = ['Name','Account.Name','Title','Email'];
    @track objname = 'Contact';
    @track replaceheaders='Account.Name:Company Name';
}