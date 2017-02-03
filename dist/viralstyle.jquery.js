(function initViralstyleJQueryPlugin ($) {
  var ENV_BASE = 'https://viralstyle.com';

  function callVSModal (query) {
    $('#vs-flow').attr('src', ENV_BASE + '/assets/embedded-sales/flow.html' + query);
    $('#vs-flow-background, #vs-flow-container').css('display', 'flex');
  }

  $(window).on('message', function (e) {
    var data = e.originalEvent.data.split(':');
    switch (data[0]) {
      case 'open-vs-modal':
        callVSModal(data[1]);
        window.scrollTo(0, 30);
        break;
      case 'close-vs-modal':
        $('#vs-flow-background, #vs-flow-container').css('display', 'none');
        $('#vsw-' + data[1]).trigger('vs:widgetClosed');
        break;
      case 'resize-vs-widget':
        $('#vsw-' + data[2]).css('height', data[1] + 'px');
        break;
      case 'resize-vs-flow':
        $('#vs-flow-container').css('min-height', data[1] + 'px')
          .find('#vs-flow').css('height', data[1] + 'px');
        break;
      case 'vs-modal-open-complete':
        $('#vsw-' + data[1]).trigger('vs:widgetOpened');
        break;
      case 'vs-start-checkout':
        $('#vsw-' + data[1]).trigger('vs:startCheckout', [parseInt(data[2], 10), data[3], parseFloat(data[4]), data[5]]); // qty, product, price, currency
        break;
      case 'vs-purchase':
        $('#vsw-' + data[1]).trigger('vs:purchase', [parseInt(data[2], 10), parseFloat(data[3]), data[4], data[5]]); // qty, price, currency, orderNumber
        break;
    }
  });

  $(document).ready(function () {
    var $body = $('body');

    $body.append('<div id="vs-flow-background" />');
    $('#vs-flow-background').css({
      'display': 'none',
      'align-items': 'center',
      'justify-content': 'center',
      'background-color': 'rgba(202, 202, 202, 0.6)',
      'position': 'fixed',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%',
      'z-index': 999
    });

    $body.append('<div id="vs-flow-container"><iframe id="vs-flow" /></div>');
    $('#vs-flow-container').css({
      'display': 'none',
      'position': 'absolute',
      'top': '30px',
      'left': 0,
      'justify-content': 'center',
      'height': '100%',
      'width': '100%',
      'z-index': 1000
    });

    $('#vs-flow').css({
      'border': 'none',
      'max-width': '600px',
      'width': '100%',
      'background-color': 'white',
      'transition': 'width 0.25s ease-in-out, height 0.25s ease-in-out'
    });
  });

  $.fn.viralstyle = function (options, environment) {
    if (typeof options.user == 'undefined') return this;
    if (typeof options.campaign == 'undefined') return this;
    if (typeof options.product == 'undefined') return this;

    if (environment) ENV_BASE = environment;

    var settings = $.extend({
      background: '#2E3641',
      buttons: '#007087',
      accent: '#1FBBA6',
      logo: 'images/logo-light.svg'
    }, options);

    var id = '' + (Math.random() * 100000000);
    id = id.substr(0, id.indexOf('.'));
    var query = '?pn=' + settings.user + '&sl=' + settings.campaign + '&pid=' + settings.product + '&id=' + id;
        query += '&bkg=' + encodeURIComponent(settings.background) + '&btn=' + encodeURIComponent(settings.buttons) + '&acc=' + encodeURIComponent(settings.accent);
        query += '&logo=' + encodeURIComponent(settings.logo);

    var html = '<iframe class="vs-widget" id="vsw-' + id + '" src="' + ENV_BASE + '/assets/embedded-sales/widget.html' + query + '" />';
    this.append(html);
    $('#vsw-' + id).css({
      'border': '1px solid #cacaca',
      'border-radius': '4px',
      'max-width': '250px',
      'width': '100%'
    });

    return this;
  };
})(jQuery);
