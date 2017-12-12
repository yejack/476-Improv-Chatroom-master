window.onload = function() {
   
    var hichat = new HiChat();
    hichat.init();
};


var HiChat = function() {
    this.socket = null;
};


HiChat.prototype = {
    init: function() {
        var that = this;
        
        this.socket = io.connect();
        
        this.socket.on('connect', function() {
            
            document.getElementById('info').textContent = 'get yourself a nickname :)';
            document.getElementById('nickWrapper').style.display = 'block';
            document.getElementById('nicknameInput').focus();
        });
	this.socket.on('loginSuccess', function() {
     document.title = 'hichat | ' + document.getElementById('nicknameInput').value;
     document.getElementById('loginWrapper').style.display = 'none';
     document.getElementById('messageInput').focus();
 });
this.socket.on('system', function(nickName, userCount, type) {
     
     var msg = nickName + (type == 'login' ? ' joined' : ' left');
     var p = document.createElement('p');
     p.textContent = msg;
     document.getElementById('historyMsg').appendChild(p);
     
     document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';

this.socket.on('system', function(nickName, userCount, type) {
    var msg = nickName + (type == 'login' ? ' joined' : ' left');
     that._displayNewMsg('system ', msg, 'red');
    document.getElementById('status').textContent = userCount + (userCount > 1 ? ' users' : ' user') + ' online';
document.getElementById('sendBtn').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput'),
        msg = messageInput.value;
    messageInput.value = '';
    messageInput.focus();
    if (msg.trim().length != 0) {
        that.socket.emit('postMsg', msg); 
        that._displayNewMsg('me', msg); 
    };
}, false);
document.getElementById('sendImage').addEventListener('change', function() {
    
     if (this.files.length != 0) {
       
         var file = this.files[0],
             reader = new FileReader();
         if (!reader) {
             that._displayNewMsg('system', '!your browser doesn\'t support fileReader', 'red');
             this.value = '';
             return;
         };
         reader.onload = function(e) {
            
             this.value = '';
             that.socket.emit('img', e.target.result);
             that._displayImage('me', e.target.result);
         };
         reader.readAsDataURL(file);
     };
 }, false);
 });
    }
};

