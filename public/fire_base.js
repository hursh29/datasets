let i = 0;
let output_file_name;
let maxSubmit = 10;
var ctx = canvas.getContext("2d");
let loading = new Image();
loading.src = 'loading.png';
ctx.drawImage(loading, 0, 0, 600, 400)

let img = new Image(); 
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

var imageWidth = 600,
    imageHeight = 400;

document.querySelector("#submit").addEventListener("click", function () {
    userSession++;
    const imageDataURL = canvas.toDataURL("image/jpeg");
    // console.log(imageDataURL);
    let path =
        "output/" +
        `${output_file_name}/` +
        `output_${output_file_name}_` +
        `${new Date()}`;
    firebase.storage().ref()
        .child(path)
        .putString(imageDataURL, "data_url")
        .then(function (snapshot) {
            firebase.database().ref()
                .child("displayImage")
                .update({ currentIndex: i + 1 });
            console.log("image session", userSession);
            document.getElementById("moreToGo").innerHTML = maxSubmit - userSession;
            if (userSession == maxSubmit - 1) {
                document.querySelector("#submit").value = "submit";
            }
            if (userSession == maxSubmit) {
                alert("Images submitted!! Thanks for your response 😊");
                window.location = window.location.href
            }
            ctx.clearRect(0, 0, 600, 400);
            // img.src = 'loading.png';
        })
        .catch(() => alert("Oops !!! Data not submitted 😣"));
});
img.onload = function () {
    img.crossOrigin = "anonymous";
    ctx.drawImage(img, 0, 0, 600, 400);
    console.log("session", userSession);
}; 
function displayImage(row, images) {
    images.getDownloadURL().then(function (url) {
        const URL = url;
        var str = '<img src="' + URL + '">';
        ctx.clearRect(0, 0, 600, 400);
        img.src = URL;

        document.querySelector("canvas").style.backgroundImage =
            'URL("' + img.src + '")';
        document.querySelector("canvas").style.backgroundSize = "600px 400px";
        // console.log(url);
    });
}
function eraseAll() {
    ctx.clearRect(0, 0, 600, 400);
}
