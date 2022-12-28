import MediaPlayer from "../../MediaPlayer";
import Ads, {Ad} from "./Ads";

export default class AdsPlugin{
    private ads:Ads;
    private currentAd:Ad | any;
    private adsContainer:HTMLElement;
    constructor(){
        this.ads = Ads.getInstance();
        this.adsContainer = document.createElement("div");

    }
    run(player:MediaPlayer){
        player.container.appendChild(this.adsContainer);
        player.video.addEventListener("timeupdate", ()=>{
            const currentTime = Math.floor(player.video.currentTime);
            if(currentTime % 30 === 0){
                this.renderAd();
            }
        });
    }
    private renderAd(){
        if(this.currentAd){
            return;
        }
        const ad:any = this.ads.getAds();
        this.currentAd = ad;
        this.adsContainer.innerHTML = `
        <div class="ads">
            <a class="ads__links" href="${this.currentAd.url}" target="_blank">
                <img class="ads__img" src="${this.currentAd.imageUrl}"/>
                <div class="ads__info">
                    <h5 class="ads__title">${this.currentAd.title}</h5>
                    <p class="ads__body">${this.currentAd.body}</p>
                </div>
            </a>
        </div>
        `;
        setTimeout(()=>{
            this.currentAd = null;
            this.adsContainer.innerText="";
        }, 10000);

    }
}