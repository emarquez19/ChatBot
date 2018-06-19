$(function() {
  var INDEX = 0; 
  $("#chat-submit").click(function(e) {
    e.preventDefault();
    var msg = $("#chat-input").val(); 
    if(msg.trim() == ''){
      return false;
    }
    generate_message(msg, 'self');
    var buttons = [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ];
    setTimeout(function() {      
      generate_message(msg, 'user');  
    }, 1000)
    
  })
  
  function generate_message(msg, type) {
    INDEX++;
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    // $("#cm-msg-"+INDEX).hide().addClass('bounce');
    if(type == 'self'){
     $("#chat-input").val(''); 
    }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }  
  
  function generate_button_message(msg, buttons){    

    INDEX++;
    var btn_obj = buttons.map(function(button) {
       return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
    }).join('');
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
    str += "          <span class=\"msg-avatar\">";
    str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
    str += "          <\/span>";
    str += "          <div class=\"cm-msg-text\">";
    str += msg;
    str += "          <\/div>";
    str += "          <div class=\"cm-msg-button\">";
    str += "            <ul>";   
    str += btn_obj;
    str += "            <\/ul>";
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);   
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
    $("#chat-input").attr("disabled", true);
  }

  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  });
  
  // Abrir y cerrar el chat
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  });
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  });

  // Tooltips
  $('[data-toggle="tooltip"]').tooltip();


  var chatbox = $("#chat-box");
  
  // Alinear a la Izquierda
  $("#pin-left").click(function() {
    clearPositionLog(1);
    if ( $(this).hasClass('active')) {
      clearActive();
      chatbox.removeClass('left-pinned').addClass('back-to-origin');
    } else {
      clearActive();
      $(this).addClass('active');
      chatbox.addClass('left-pinned');
    }
  });

  // Alinear a la Derecha
  $("#pin-right").click(function() {
    clearPositionLog(2);
    if ( $(this).hasClass('active')) {
      clearActive();
      chatbox.removeClass('right-pinned').addClass('back-to-origin');
    } else {
      clearActive();
      $(this).addClass('active');
      chatbox.addClass('right-pinned');
    }
  });

  // Posicion Libre
  // $("#position-free").click(function() {
  //   clearPositionLog(3);
  //   $("#chat-box").toggleClass('draggable-box');
  //   setTimeout (function (){
  //     Draggable.create('.draggable-box');
  //   },100);
  // });

  // Pantalla Completa
  $("#expand-box").click(function() {
    clearPositionLog(4);
    if ( $(this).hasClass('active')) {
      clearActive();
      chatbox.removeClass('full-screen').addClass('back-to-origin');
    } else {
      clearActive();
      $(this).addClass('active');
      chatbox.addClass('full-screen');
    }
  });

  function clearPositionLog(i) {
    if (i == 1){
      // Draggable.get('.draggable-box').disable();
      $("#chat-box").removeClass('right-pinned draggable-box full-screen back-to-origin');
    } else if (i == 2){
      $("#chat-box").removeClass('left-pinned draggable-box full-screen back-to-origin');
    } else if (i == 3) {
      $("#chat-box").removeClass('left-pinned right-pinned full-screen back-to-origin');
    } else if (i == 4) {
      $("#chat-box").removeClass('left-pinned right-pinned draggable-box back-to-origin');
    } else {
      // alert("Ninguno");
    }
  }

  function clearActive() {
    $('.chat-options span').removeClass('active');
  }

});