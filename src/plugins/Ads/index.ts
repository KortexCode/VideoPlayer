import MediaPlayer from "../../MediaPlayer";
import Ads, {Ad} from "./Ads";

export default class AdsPlugin{
    ads:Ads;
    currentAd:Ad;
    constructor(){
        this.ads = Ads.getInstance();
    }
    run(player:MediaPlayer){
        player.video.addEventListener("timeupdate", ()=>{
            const currentTime = Math.floor(player.video.currentTime);
            if(currentTime % 30 === 0){
                this.renderAd();
            }
        })
    }
    private renderAd(){
        if(this.currentAd){
            return;
        }
        const ad:any = this.ads.getAds();
        this.currentAd = ad;
        console.log(ad);
    }
}