let i = 0  ; 
// add promises  
let output_file_name; 
let databaseReference =  firebase.database().ref().child('displayImage/currentIndex') ;
databaseReference.on('value',function (snapshot){
    i = snapshot.val();
    firebase.storage().ref().child('input_datasets/').listAll().then(function(result){
        output_file_name = parseInt(result.items[i].name.split('.')[0]);
        console.log(i,'displaying',output_file_name );        
        displayImage( i, result.items[i]);
    }).catch((err) =>  alert('Error Occured 😑' + `${err}`));
})
// database working 
 
var ctx = canvas.getContext('2d');
let img = new Image();
var imageWidth = 600, imageHeight = 400 ;
document.querySelector('#submit').addEventListener('click',function(){

        const imageDataURL = canvas.toDataURL('image/jpeg') ;
        // console.log(imageDataURL);
        let path = 'output/' + `${output_file_name}/` + `output_${output_file_name}_` + `${new Date()}` ;
        firebase.storage().ref().child(path).putString(imageDataURL,'data_url').then(function(snapshot){
            firebase.database().ref().child('displayImage').update({'currentIndex': i+1})
            alert('Image submitted!! Thanks for your response 😊')
            
            location.reload();
        }).catch(() => alert('Oops !!! Data not submitted 😣'));
})

img.onload = function(){
    img.crossOrigin = 'anonymous'
    ctx.drawImage( img, 0, 0, 600, 400);
}
function displayImage( row, images){
    images.getDownloadURL().then(function(url){
        const URL = url ;
        var str = '<img src="' + URL + '">';
        img.src = URL ;
        
        document.querySelector("canvas").style.backgroundImage = 'URL("' + img.src + '")';
        document.querySelector('canvas').style.backgroundSize = "600px 400px"

        console.log(url);
    });
}    
   