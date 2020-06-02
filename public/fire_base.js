let i = 0;
let output_file_name;
let maxSubmit = 10;
console.log( 'js', window.innerWidth, window.innerHeight) ;
var ctx = canvas.getContext("2d");
let loading = new Image();
loading.src = 'loading.png';
let canvasHeight,canvasWidth;
// canvasWidth = 600;
// canvasHeight = 400; 
canvasWidth = 0.44*window.innerWidth;
canvasHeight = 0.6667*canvasWidth;
// canvasWidth = Math.min(600.0,canvasWidth);
// canvasHeight = Math.min(400.0,canvasHeight);
ctx.canvas.width = canvasWidth ;
ctx.canvas.height = canvasHeight; 
console.log(canvasWidth ,canvasHeight,'#canvas'); 
document.querySelector('canvas').style.backgroundImage = 'URL(loading.png)' 
document.querySelector("canvas").style.backgroundSize =`${canvasWidth}px ${canvasHeight}px`
        
let databaseReference = firebase.database().ref().child("displayImage/currentIndex");
databaseReference.on("value", function (snapshot) {
    i = snapshot.val();
    i %= 1003;
    firebase.storage().ref()
        .child("input_datasets/")
        .listAll()
        .then(function (result) {
            output_file_name = parseInt(result.items[i].name.split(".")[0]);
            console.log(i, "displaying", output_file_name);
            displayImage(i, result.items[i]);
        })
        .catch((err) => alert("Error Occured 😑" + `${err}`));
});
// database working
let userSession = 0;
document.querySelector("#submit").addEventListener("click", function () {
    userSession++;
    const imageDataURL = canvas.toDataURL("image/jpeg");
    // console.log(imageDataURL);
    let path ="output/" +`${output_file_name}/`+`output_${output_file_name}_` +`${new Date()}`;
    firebase.storage().ref()
        .child(path)
        .putString(imageDataURL, "data_url")
        .then(function (snapshot) {
            firebase.database().ref()
                .child("displayImage").update({ currentIndex: i + 1 });
            console.log("image session", userSession);
 
            document.getElementById("moreToGo").innerHTML = maxSubmit - userSession;
            if (userSession == maxSubmit - 1) {
                document.querySelector("#submit").value = "submit";
            }
            if (userSession == maxSubmit) {
                alert("Images submitted!! Thanks for your response 😊");
                window.location = window.location.href
            }
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            document.querySelector("canvas").style.backgroundImage = 'URL("' + 'loading.png' + '")' 
            document.querySelector("canvas").style.backgroundSize =`${canvasWidth}px ${canvasHeight}px`
        
            // img.src = 'loading.png';
        })
        .catch(() => alert("Oops !!! Data not submitted 😣"));
});
let img = new Image();
img.onload = function() { 
    console.log('0image',this.width,this.height);
    img.crossOrigin = "anonymous";
    ctx.drawImage(img, 0, 0, 316, 211);  
};   
    
function displayImage(row, images) {
    images.getDownloadURL().then(function (url) {
        const URL = url;
        var str = '<img src="' + URL + '">';
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        img.src = URL; 
    
        document.querySelector("canvas").style.backgroundImage =
            'URL("' + img.src + '")';
        document.querySelector("canvas").style.backgroundSize =`${canvasWidth}px ${canvasHeight}px`
        // console.log(url);
    });
}
function eraseAll() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
} 