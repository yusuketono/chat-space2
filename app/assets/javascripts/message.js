$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    let content = message.content ? `${ message.content }` : "";
    let img = message.image ? `<img src= ${ message.image }>` : "";
    let html = `<div class="message" data-id="${message.id}">
                  <div class="message__info">
                    <div class="message__info__member">
                      ${message.user_name}
                    </div>
                    <div class="message__info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="message__text">
                    <div>
                    ${content}
                    </div>
                    ${img}
                  </div>
                </div>`
    return html;
  }
  // メッセージ送信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    let message = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messeges').append(html);
      $('form')[0].reset();  
    })
    .fail(function(){
      alert('error');
    });
    return false;
  })

  // 自動更新
  $(function() {
    //省略
    const reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('id');
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log('success');
      })
      .fail(function() {
        console.log('error');
      });
    };
  });

});