
    let i = 0;
    let output_file_name;


    var ctx = canvas.getContext("2d");
    let loading = new Image();
    loading.src = 'loading.png';
    let canvasHeight,canvasWidth; 


    canvasWidth = 0.44*window.innerWidth;
    canvasHeight = 0.6667*canvasWidth;
    canvasWidth = Math.min(600.0,canvasWidth);
    canvasHeight = Math.min(400.0,canvasHeight);
    ctx.canvas.width = canvasWidth ;
    ctx.canvas.height = canvasHeight; 
    // console.log(canvasWidth ,canvasHeight,'#canvas'); 

    document.querySelector('canvas').style.backgroundImage = 'URL(loading.png)' 
    document.querySelector("canvas").style.backgroundSize =`${canvasWidth}px ${canvasHeight}px`
    let database_value = 0 ;     
    // let databaseReference = firebase.database().ref().child("displayImage/currentIndex");
    // firebase.storage().ref().child("input_datasets/").listAll().then(function(result){
        // console.log(result.items.length,'total input files')
    // })

    // databaseReference.on("value", function (snapshot) {
        // i = snapshot.val();
        database_value = Math.floor(Math.random()*1712);
        firebase.storage().ref()
            .child("input_datasets/")
            .listAll()
            .then(function (result) {
                output_file_name = parseInt(result.items[database_value].name.split(".")[0]);
                console.log( database_value, "displaying", output_file_name);
                displayImage( database_value, result.items[database_value]);
            })
            .catch((err) => alert("Error Occured 😑" + `${err}`));
    // });
    // database workings
    document.querySelector("#submit").addEventListener("click", function () {
        const imageDataURL = canvas.toDataURL("image/jpeg");
        // console.log(imageDataURL);
        let path ="output/" +`${output_file_name}/`+`output_${output_file_name}_` +`${new Date()}`;
        // updating database
        firebase.storage().ref()
            .child(path).putString(imageDataURL, "data_url").then(function (snapshot) {
            // firebase.database().ref().child("displayImage").update({ currentIndex: i + 1 });
                console.log("image session", userSession);
     
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
        // ctx.drawImage(img, 0, 0, 316, 211);  
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
 

    function Stop(){
        alert('Thanks! For your response 😊');
        // it should work 
        // lemme try once more
        document.querySelector('canvas').style.backgroundImage = 'URL(samsung.jpeg)' 
        document.querySelector("canvas").style.backgroundSize =`${canvasWidth}px ${canvasHeight}px`
  
        // location.reload();
        // window.close();
    }