import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const COLUMNS = [
    { label: 'Id', fieldName: "Id" },
    { label: 'Name', fieldName: "Name" }
];

export default class LazyLoadingComp extends LightningElement {
    accounts = [];
    columns = COLUMNS;
    rowSize = 5;
    rowOffSet = 0;
    enableInfiniteLoading = false;

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            let response = await getAccounts({ limitSize: this.rowSize, offset: this.rowOffSet });
            if (response) {
                this.accounts = [...this.accounts, ...response];
                this.enableInfiniteLoading = (response.length == this.rowSize || response.length != 0);
            }
        } catch (error) {
            console.log('Something went wrong while fetching data - ' + error);
        }
    }

    async loadMoreHandler(event) {
        let target = event.target;
        target.isLoading = true;
        this.rowOffSet = this.rowOffSet + this.rowSize;
        await this.loadData();
        target.isLoading = false;
    }

}