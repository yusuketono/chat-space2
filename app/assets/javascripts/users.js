$(document).on('turbolinks:load', function(){
  $('#user-search-field').on('input', function(e){
    console.log('発火しているか確認する')
  });
});