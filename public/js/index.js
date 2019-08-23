$(document).ready(function(){
    $("#grupo").change(function(){
      $.ajax({url: "temas", success: function(result){
        $("#div1").html(result);
      }});
    });
});
