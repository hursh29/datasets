var ctx = canvas.getContext('2d'); 
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var tooltype = 'draw'; 
document.getElementById('erase').addEventListener('click',function(){
    tooltype = 'erase';
    document.getElementById('mode').innerHTML = 'erase';

}); 
document.getElementById('draw').addEventListener('click',function(){
    document.getElementById('mode').innerHTML = ' draw ✏';
    tooltype = 'draw'
}); 

//Mousedown
document.querySelector('canvas').addEventListener('mousedown',function(e){
    last_mousex = mousex = parseInt(e.clientX-this.offsetLeft);
	last_mousey = mousey = parseInt(e.clientY-this.offsetTop);
    mousedown = true;
});

//Mouseup
document.querySelector('canvas').addEventListener('mouseup',function(e){
    mousedown = false;
});

//Mousemove
document.querySelector('canvas').addEventListener('mousemove',function(e){

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

}); 