const totalSeconds = 86400;
const totalYear = getTotalDaysInYear(new Date());
const tickerInMillis = 500;

const progressBarDay = document.getElementById('pbday');
const textDay = document.getElementById('tbday');

const progressBarYear = document.getElementById('pbyear');
const textYear = document.getElementById('tbyear');

function refresh() {
    
    function controller() {
        var x = new Date();
        
        var dayPercent = getPercentage(getSecondsOfTheDay(x),totalSeconds);
        var yearPercent = getPercentage(getDaysPassed(x),totalYear);

        console.log("day", getSecondsOfTheDay(x), dayPercent, progressBarDay);
        console.log("year", getDaysPassed(x), yearPercent);
        

        refreshBar(progressBarDay, textDay, dayPercent);
        refreshBar(progressBarYear, textYear, yearPercent);
    }
    controller();
}

refresh()
setInterval(refresh, tickerInMillis);

// document.addEventListener('DOMContentLoaded', function () {
// });

function refreshBar(progressBar, text, percent) {
    var p = String(percent)+"%";
    progressBar.style.width = p;
    text.innerHTML= p;

    if(percent<20) {
         progressBar.classList.add("box1");
    }else if(percent<40) {
         progressBar.classList.add("box2");
    }else if(percent<60) {
         progressBar.classList.add("box3");
    }else if(percent<80) {
         progressBar.classList.add("box4");
    }else{
         progressBar.classList.add("box5");
    }

}

function getSecondsOfTheDay(time) {
    return time.getHours()*60*60 + time.getMinutes()*60 + time.getSeconds();
}

function getPercentage(num, den) {
    if(den == -1) {
        return -1;
    }
    return ((num/den)*100).toFixed(3);
}

function getTotalDaysInYear(time) {
    isLeapYear = function() {
        year = time.getFullYear();
        if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
            return true;
        }
        return false;
    }
    return !isLeapYear()?365:366;
}

// days passed in the year
function getDaysPassed(today) {
  // Create a new Date object representing January 1st of the same year as the provided date
  var jan1 = new Date(today.getFullYear(), 0, 1);
  return Math.ceil((today - jan1 + 1) / 86400000);
}
