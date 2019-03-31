
function sayNewMessage() {
    let msgtype = Math.floor(Math.random()*28);
    let websitename = window.location.href.split("/")[2];
    let date = new Date;
    let christmas = new Date;
    christmas.setMonth(11);
    christmas.setDate(25);
    let daysUntilChristmas = Math.floor((christmas.getTime() - date.getTime())/(1000*60*60*24));
    switch(msgtype) {
        case 0: garfield.say("I hate Mondays..."); break;
        case 1: garfield.say("Now where could my pipe be..."); break;
        case 2: garfield.say("Lasagna first - then I talk"); break;
        case 3: garfield.say("Why are you on "+websitename+"?"); break;
        case 4: garfield.say("I love the world wide web!"); break;
        case 5: garfield.say("9/11 was an inside job"); break;
        case 6: garfield.say("Check out this great youtube video: https://www.youtube.com/watch?v=9bZkp7q19f0"); break;
        case 7: garfield.say("I'm hungry. For Lasaga."); break;
        case 8: //garfield.say("Garfield isn't actually funny, the comic is only popular because of the design of the cat, Garfield."); break;
        case 9: //garfield.say("yum yum yum I love to guzzle cum"); break;
        case 10:garfield.say("Our Father, Who art in Heaven, hallowed be Thy name; Thy Kingdom come, Thy will be done on earth as it is in Heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen. "); break;
        case 11:garfield.say("heh what if u had mac and cheese with a side of glaric bed"); break;
        case 12:garfield.say("It is "+((12+date.getHours()-1)%12+1)+" "+(date.getMinutes()<10?"o ":"")+date.getMinutes()+" "+(date.getHours()>=12?"PM":"AM")); break;
        case 13://garfield.say("I love to play ping pong all day long."); break;
        case 14:garfield.say(`Gee, I hope this wins the challenge`); break;
        case 15:garfield.say("Roses are red, violets are blue, let's play Donkey Kong Country 2"); break;
        case 16:garfield.say("Don't be frontin son, no seeds on the bun"); break;
        case 17:garfield.say("Boom! Headshot!"); break;
        case 18://garfield.say("It's peanut butter jelly time!"); break;
        case 19:garfield.say("Mark Zuckerberg for prison"); break;
        case 20:garfield.say("Hey VSauce, Michael here"); break;
        case 21:garfield.say("You've got mail!"); break;
        case 22://garfield.say("aeiou. aeiou. John Madden!"); break;
        case 23:garfield.say("Only "+daysUntilChristmas+" days until Christmas!"); break;
        case 24:garfield.say("Remember when you used to be happy?"); break;
        case 25:garfield.say("Face it. The future is bleak. Can you even imagine what the world will be like in ten years?"); break;
        case 26:garfield.say("The large hadron collider is a hoax by the Swedish government to cover up underwater drone strikes on Denmark."); break;
        case 27:garfield.say("Bored? Try visiting mouseinthe.house"); break;
    }
    setTimeout(sayNewMessage, 12000);
}
setTimeout(sayNewMessage, 5000);

