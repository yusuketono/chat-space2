$(document).on('turbolinks:load', function(){
  $('#new_message').on('submit', function(){
    console.log('これはコンソールログです');
  })
});