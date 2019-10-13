$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    let content = message.content ? '${ message.content }': "";
    let img = message.image ? '<img src = ${message.image}>' :"";
    let html = `<div class="message" data-id="${message.id}">
                  <div class="message__info">
                    <div class="message__info__member">
                      ${message.user_name}
                    </div>
                    <p class="message__info__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let message = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  })
});