var renderBios = function() {
  Bio.allBios.forEach(function(bio) {
    $('#bios').append(bio.toHtml());
  });
};
renderBios();
