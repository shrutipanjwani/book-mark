var myData = {
    1: {
        imageUrl: "1.png",
        text: "Caption 1"
    }, 
    2: {
        imageUrl: "2.png",
        text: "Caption 2"
    }, 
    3: {
        imageUrl: "3.png",
        text: "Caption 3"
    }, 
    4: {
        imageUrl: "4.png",
        text: "Caption 4"
    }, 
    5: {
        imageUrl: "5.png",
        text: "Caption 5"
    }
};

function changeImage(){
    var randomNumber = Math.floor((Math.random() * 10) + 1);
    document.getElementById("background").style.background = "url('"+myData[randomNumber].imageUrl+"')";
    document.getElementById("text-box").innerHTML = myData[randomNumber].text;
}
document.getElementById("my-button").addEventListener("click",changeImage);