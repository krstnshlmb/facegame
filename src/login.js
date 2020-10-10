$(document).ready(function(){
    $(".join-form").hide();
    $(".host").css("border-bottom", "3px #1BABD2 solid");
    $(".join").css("border-bottom", "3px #26135B solid");

    $(".join").click(function(){
      $(".host-form").hide();
      $(".join-form").show();
      $(".join").css("border-bottom", "3px #1BABD2 solid");
      $(".host").css("border-bottom", "3px #26135B solid");
    }); 

    $(".host").click(function(){
      $(".join-form").hide();
      $(".host-form").show();
      $(".host").css("border-bottom", "3px #1BABD2 solid");
      $(".join").css("border-bottom", "3px #26135B solid");
    });
    
    $("sub-btn").click(function(){
      $(".input").val("");
    })

});