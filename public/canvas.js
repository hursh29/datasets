var ctx = canvas.getContext('2d'); 
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw'; 
document.getElementById('erase').addEventListener('click',function(){
    document.getElementById('mode').innerHTML = 'erase';
    tooltype = 'erase';
}); 
document.getElementById('draw').addEventListener('click',function(){
    document.getElementById('mode').innerHTML = ' draw ✏';
    tooltype = 'draw'
}); 

//Mousedown
$('canvas').on('mousedown touchdown',function(e){
        e.preventDefault();
        last_mousex = mousex = parseInt(e.clientX-this.offsetLeft);
        last_mousey = mousey = parseInt(e.clientY-this.offsetTop);
        mousedown = true;
    })  

//Mouseup
$('canvas').on('mouseup touchup',function(e){
        e.preventDefault();
        mousedown = false;
    })
//Mousemove
$('canvas').on('mousemove touchmove',function(e){
        e.preventDefault();
        mousex = parseInt(e.pageX-this.offsetLeft);
        mousey = parseInt(e.pageY-this.offsetTop);
        if(mousedown) {
            ctx.beginPath();
            if(tooltype == 'draw') {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = 'red';
                ctx.lineWidth = document.getElementById('customRange').value;
    
            } 
            else {
                ctx.globalCompositeOperation = 'destination-out';            
                ctx.lineWidth = document.getElementById('customRange').value;
            }
            ctx.moveTo(last_mousex,last_mousey);
            ctx.lineTo(mousex,mousey);
            ctx.lineJoin = ctx.lineCap = 'round';
            ctx.stroke();
        }
        last_mousex = mousex;
        last_mousey = mousey;
    
    })

function eraseAll() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
} 