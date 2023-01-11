import {Component, OnInit, RegisteredComponent} from "../../Component";

@RegisteredComponent
export class MyCheckboxComponent extends Component implements OnInit {
    private content?: HTMLDivElement;
    private leftHalf?: NodeListOf<Element>;
    private rightHalf?: NodeListOf<Element>;

    async onInit() {
        this.content = document.createElement("div");
        this.content.innerHTML = `

<div class="checkbox-container">
    <div style="z-index: 1">
        <div class="checkbox-part clipped">
            <div class="checkbox-circle">
                <div class="circle-half">
                    <div></div>
                </div>
                <div class="circle-half circle-half-right">
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="checkbox-part">
            <div class="checkbox-circle">
                <div class="circle-half">
                    <div></div>
                </div>
                <div class="circle-half circle-half-right">
                    <div></div>
                </div>
            </div>
        </div>
    </div>
    <div class="background-checkbox"></div>
</div>
`

        this.append(this.content);

        this.leftHalf = this.querySelectorAll(".circle-half> div");
        this.rightHalf = this.querySelectorAll(".circle-half-right> div");

        this.progress = this.progress_;
    }

    private progress_ = 0;

    get progress(){
        return this.progress_;
    }

    set progress(progress_: number){
        if(progress_ > 1) progress_ %= 1;
        this.progress_ = progress_;

        if(!this.leftHalf || !this.rightHalf) return;

        let p1 = 180 - Math.min(progress_ * 2, 1) * 180;

        this.leftHalf.forEach((element) => {
            (<HTMLDivElement>element).style.transform = `rotate(${Math.round(p1)}deg)`
        });


        let p2 = 180 - Math.max(progress_ * 2 - 1, 0) * 180;

        this.rightHalf.forEach((element) => {
            (<HTMLDivElement>element).style.transform = `rotate(${Math.round(p2)}deg)`
        });
    }
}