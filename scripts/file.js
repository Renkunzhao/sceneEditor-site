$(document).ready(function() {
    $('#file').dropdown({
        action: 'select',
        onChange: function(value, text, $selectedItem) {
          console.log($('#file').dropdown('is hidden'));
        }
    });
    $('.ui.menu .ui.dropdown').dropdown({
      on: 'hover'
    });
});

