
function sayNewMessage() {
    if (garfield && garfield.currentState != STATE_DRAGGING) {
        let msgtype = Math.floor(Math.random()*13);
        let websitename = window.location.href.split("/")[2];
        let date = new Date;
        switch(msgtype) {
            case 0: bubble.show("I hate Mondays..."); break;
            case 1: bubble.show("Now where could my pipe be..."); break;
            case 2: bubble.show("Lasagna first - then I talk"); break;
            case 3: bubble.show("Why are you on "+websitename+"?"); break;
            case 4: bubble.show("I love the world wide web!"); break;
            case 5: bubble.show("9/11 was an inside job"); break;
            case 6: bubble.show("Check out this great youtube video: https://www.youtube.com/watch?v=9bZkp7q19f0"); break;
            case 7: bubble.show("I'm hungry. For Lasaga."); break;
            case 8: bubble.show("Garfield isn't actually funny, the comic is only popular because of the design of the cat, Garfield."); break;
            case 9: bubble.show("yum yum yum I love to guzzle cum"); break;
            case 10:bubble.show("Our Father, Who art in Heaven, hallowed be Thy name; Thy Kingdom come, Thy will be done on earth as it is in Heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen. "); break;
            case 11:bubble.show("heh what if u had mac and cheese with a side of glaric bed"); break;
            case 12:bubble.show("It is "+((date.getHours()-1)%12+1)+" "+(date.getMinutes()<10?"o ":"")+date.getMinutes()+" "+(date.getHours()>=12?"PM":"AM")); break;
        }
    } else {
        bubble.show("Hey, put me down!");
    }
    setTimeout(sayNewMessage, 5000);
}
setTimeout(sayNewMessage, 5000);

