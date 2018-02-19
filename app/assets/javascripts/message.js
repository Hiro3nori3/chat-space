 $(function() {
  function buildHTML(message){
      var image = "";
      image = `<img src="${message.image.url}" class="large-img">`;
    if(message.body && message.image.url) {
      var html = `<ul class="chat-messages">
                    <div class="rightcontent--content-speaker">
                    ${message.user_name}
                    </div>
                    <div class="rightcontent--content-timestamps">
                    ${message.day}
                    </div>
                    <div class="rightcontent--content-talk">
                      ${message.body}
                    </div>
                    <div class="image">
                      ${image}
                    </div>
                      </ul>`
      return html;
    }
    else if(message.body) {
      var html = `<ul class="chat-messages">
                    <div class="rightcontent--content-speaker">
                    ${message.user_name}
                    </div>
                    <div class="rightcontent--content-timestamps">
                    ${message.day}
                    </div>
                    <div class="rightcontent--content-talk">
                      ${message.body}
                      </div>
                      </ul>`
      return html;
    }
    else if(message.image.url) {
      var html = `<ul class="chat-messages">
                    <div class="rightcontent--content-speaker">
                    ${message.user_name}
                    </div>
                    <div class="rightcontent--content-timestamps">
                    ${message.day}
                    </div>
                    <div class="image">
                      ${image}
                    </div>
                      </ul>`
      return html;
    }

    else {
      alert('メッセージを入力してください');
       }
     }

  $('#new_form').on('submit', function(e){
    e.preventDefault();
    console.log(this);
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })



    .done(function(data){
      var html = buildHTML(data);
      $('.rightcontent--content').append(html);
      $('.rightcontent--footer__body-form').val('');
      $('.image_form_button').val('');
      $('.rightcontent--content').animate({scrollTop: $('.rightcontent--content')[0].scrollHeight}, 'fast');
        $('.rightcontent--footer__button-send').prop("disabled", false);
 })

    .fail(function(){
      alert('メッセージを入力してください');
      $('.rightcontent--footer__button-send').prop("disabled", false);
    })
  })
});
