var storage = firebase.storage();
let storageRef = storage.ref();
let i = 0  ;
console.log(i,'before')
// add promises 
// cors policy error 
// mouse control

storageRef.child('output/').listAll().then(function( result){
    // displayImage( i, result.items[i]);
    i = result.items.length ; 
}); 
console.log(i,'after');
storageRef.child('datasets/').listAll().then(function( result){
    console.log(i,'displaying');
    displayImage( i, result.items[i]);
});
var ctx = canvas.getContext('2d');
let img = new Image();
var imageWidth, imageHeight;
img.crossOrigin = 'null';
img.onload = function(){ 
    imageWidth = img.naturalWidth ;
    imageHeight = img.naturalHeight ;
    // console.log(imageWidth,imageHeight);
    document.querySelector('canvas').width = imageWidth;
    document.querySelector('canvas').height = imageHeight;
    ctx.drawImage(img,0,0,imageWidth,imageHeight);
};  

document.querySelector('#submit').addEventListener('click',function(){
    // i++ ;
    const imageDataURL = canvas.toDataURL('image/jpeg') ;
    console.log(imageDataURL);
    const ref = firebase.storage().ref();
    ref.child( 'output/'+  `${new Date()}-base64`).putString(imageDataURL,'data_url').then(function(snapshot){
        alert('Image submitted! Thanks for your response 😊')
    });
    setTimeout(function(){
        location.reload();
    },2000);
    // document.querySelector('#canvasSaved').src = imageDataURL;
    // location.reload();
});

function displayImage( row, images){
    images.getDownloadURL().then(function(url){
        var str = '<img src="' + url + '">';

        img.src = url ;
        document.querySelector("canvas").style.backgroundImage = 'url("' + img.src + '")';
      
        console.log(url);
    });
}