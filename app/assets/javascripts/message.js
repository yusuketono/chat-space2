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

  // function scrollBottom(){
  //   var target = $('.message').last();
  //   var position = target.offset().top + $('.messages').scrollTop();
  //   $('.messages').animate({
  //     scrollTop: position
  //   }, 300, 'swing');
  // }

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
      // scrollBottom();
      // console.log(html);
    })
    .fail(function(){
      alert('error');
    });
    return false;
  })

  // 自動更新

    //省略
  const reloadMessages = function() {
    if($('.messages')[0]){
      var last_message_id = $('.message:last').data('id');
    } 
    else {
      var last_message_id = 0
    }
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
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
      // console.log(messages);
      //追加するHTMLの入れ物を作る
      let insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
      //メッセージが入ったHTMLを取得
      insertHTML = buildHTML(message);
      // console.log(insertHTML);
      //メッセージを追加
      $('.messages').append(insertHTML);
      // scrollBottom();
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
    }
  }
  setInterval(reloadMessages, 5000);
});