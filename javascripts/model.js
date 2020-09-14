;(function ($, window) {
  // from http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
  var getUrlParameter = function getUrlParameter (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1))
    var sURLVariables = sPageURL.split('&')
    var sParameterName
    var i

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=')

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1]
      }
    }
  }
  var model_name = getUrlParameter('model')
  var version = getUrlParameter('version')
  if (model_name) {
    $.getJSON('/DailyDialog-plusplus/models/' + version + '/' + model_name + '.json', function (data) {
      $('.model-title-holder > h1').text('Predictions by ' + model_name)
      $('.model-title-holder').show()
      $('.prediction-holder').show()
      var f1_scores = []
      var exact_scores = []
      $('.qa-wrap').each(function () {
        var id = $(this).attr('data-id')
        var prediction = data[id]
        var display_pred = Number( prediction.toFixed(3) )

        $(this).find('.prediction').text(display_pred)

        if (prediction === '') {
          $(this).find('.prediction').addClass('no-answer')
        }

        var ans = 0
        if (id.slice(-2,-1)=="p"){
          ans = 1
        }
        
        var predicted = Number(prediction>0.5)
        if (ans == predicted){
          $(this).addClass('correct-qa')
        }
        else{
          $(this).addClass('wrong-qa') 
        }

      })
      // function getAvg (scores) {
      //   return scores.reduce(function (p, c) {
      //     return p + c
      //   }) / scores.length * 100
      // }
      // $('.model-title-holder > h2').text('Article EM: ' + getAvg(exact_scores).toFixed(1) + ' F1: ' + getAvg(f1_scores).toFixed(1))
    })
  }
})(window.$, window)