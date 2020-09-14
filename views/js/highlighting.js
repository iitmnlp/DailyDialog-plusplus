(function ($, TextHighlighter, Hilitor) {
  var highlight

  function highlight_question_words (e) {
    var question_text = $(e).find('.question').text().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, '').removeStopWords()
    highlight.apply(question_text, false)
  }

  function longest_common_substring(string1, string2) {
    var comparsions = []; //2D array for the char comparsions ...
    var maxSubStrLength = 0;
    var lastMaxSubStrIndex = -1, i, j, char1, char2, startIndex;
  
    for (i = 0; i < string1.length; ++i) {
      comparsions[i] = new Array();
  
      for (j = 0; j < string2.length; ++j) {
        char1 = string1.charAt(i);
        char2 = string2.charAt(j);
  
        if (char1 === char2) {
          if (i > 0 && j > 0) {
            comparsions[i][j] = comparsions[i - 1][j - 1] + 1;
          } else {
            comparsions[i][j] = 1;
          }
        } else {
          comparsions[i][j] = 0;
        }
  
        if (comparsions[i][j] > maxSubStrLength) {
          maxSubStrLength = comparsions[i][j];
          lastMaxSubStrIndex = i;
        }
      }
    }
  
    if (maxSubStrLength > 0) {
      startIndex = lastMaxSubStrIndex - maxSubStrLength + 1;
  
      return string1.substr(startIndex, maxSubStrLength);
    }
  
    return null;
  }

  var answer_color = 'rgba(10, 230, 100, 0.7)'

  function highlight_answer (e,para) {
    var common = longest_common_substring($(e).text().toLowerCase(), $(para).text().toLowerCase())
    highlight.apply(common.trim(), true, answer_color)
  }

  function add_answer_style (e) {
    $(e).css('background-color', answer_color)
  }

  function remove_answer_style (e) {
    $(e).css('background-color', '')
  }

  $('.qa-wrap')
  .mouseenter(function () {
    var outer = this // reference to this object
    highlight = new Hilitor($(this).closest('.para-wrap').find('pre')[0])
    var para = $(this).closest('.para-wrap').find('pre')[0]

    var apply_highlight = function (answer) {
      // if (answer) {
        // highlight_answer(answer, para)
        // add_answer_style(answer)
      // }
      // highlight_question_words(outer)
    }
    apply_highlight($(this).find('.question').first()) // first answer

    $(this).find('.question')
    .mouseenter(function () {
      if (highlight) highlight.remove()
      $(outer).find('.question').each(function () {
        remove_answer_style(this)
      })
      apply_highlight(this)
    })
  })
  .mouseleave(function () {
    if (highlight) highlight.remove()
    $(this).find('.question').each(function () {
      remove_answer_style(this)
    })
  })
})(window.$, window.TextHighlighter, window.Hilitor)
