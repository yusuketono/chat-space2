$(document).on('turbolinks:load', function(){
  $('#new_message').on('submit', function(e){
    let message = new FormData(this);
    let url = $(this).attr('action')
    // console.log(url);
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      processData: false,
      contentType: false
    })
  })
});