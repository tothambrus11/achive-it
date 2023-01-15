import {Component, OnInit, RegisteredComponent} from "../../core/component";

import "./my-header.style.scss";

@RegisteredComponent({
    name: 'my-header'
})
export class MyHeaderComponent extends Component implements OnInit {

    private prev_!: HTMLAnchorElement;
    private readonly page?: {name: string, url: string};

    constructor(page?: {name: string, url: string}) {
        super();
        this.page = page;
    }

    async onInit() {
        this.prev_ = document.createElement('a');
        if(this.page) {
            this.prev_.innerHTML = '<img src="/achive-it/arrow-back.svg" alt="<-">'+this.page.name;
            this.prev_.href = this.page.url;
        } else {
            this.prev_.style.visibility = 'hidden';
            this.prev_.innerText = 'undefined';
        }
        this.append(this.prev_);

        const logout = document.createElement('a');
        logout.innerText = 'Logout';
        logout.href = '/achive-it/index.html';
        this.append(logout);
    }

}