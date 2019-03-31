
function sayNewMessage() {
    let msgtype = Math.floor(Math.random()*15);
    let websitename = window.location.href.split("/")[2];
    let date = new Date;
    switch(msgtype) {
        case 0: garfield.say("I hate Mondays..."); break;
        case 1: garfield.say("Now where could my pipe be..."); break;
        case 2: garfield.say("Lasagna first - then I talk"); break;
        case 3: garfield.say("Why are you on "+websitename+"?"); break;
        case 4: garfield.say("I love the world wide web!"); break;
        case 5: garfield.say("9/11 was an inside job"); break;
        case 6: garfield.say("Check out this great youtube video: https://www.youtube.com/watch?v=9bZkp7q19f0"); break;
        case 7: garfield.say("I'm hungry. For Lasaga."); break;
        case 8: garfield.say("Garfield isn't actually funny, the comic is only popular because of the design of the cat, Garfield."); break;
        case 9: garfield.say("yum yum yum I love to guzzle cum"); break;
        case 10:garfield.say("Our Father, Who art in Heaven, hallowed be Thy name; Thy Kingdom come, Thy will be done on earth as it is in Heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen. "); break;
        case 11:garfield.say("heh what if u had mac and cheese with a side of glaric bed"); break;
        case 12:garfield.say("It is "+((date.getHours()-1)%12+1)+" "+(date.getMinutes()<10?"o ":"")+date.getMinutes()+" "+(date.getHours()>=12?"PM":"AM")); break;
        case 13:garfield.say("I love to play ping pong all day long.");
        case 14:garfield.say(`All this time, I can't believe I couldn't see
        Kept in the dark, but you were there in front of me
        I've been sleeping a thousand years, it seems
        Got to open my eyes to everything!
        Without a thought, without a voice, without a soul
        (Don't let me die here...)
        There must be something more!
        Bring me to life!"`);
    }
    setTimeout(sayNewMessage, 20000);
}
setTimeout(sayNewMessage, 5000);

