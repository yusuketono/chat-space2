$(document).on('turbolinks:load', function(){

  $('#user-search-field').on('input', function(e){
    e.preventDefault();
    let input = $('#user-search-field').val();
    if (input.length == 0) {
      user_list.empty();
      return
    };
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: {keyword:input},
    })
  });
});