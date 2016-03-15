var main = function() {
    "use strict";
    var addHtml;

    function populateHtml() {
        $.getJSON("http://localhost:3000/actors", function(getData) {

            getData.forEach(function(getObject) {
                if (getObject.starred === true) {
                    addHtml = "<li class ='mdl-list__item'>" + "<span class ='mdl-list__item-primary-content'>" + "<i class='material-icons mdl-list__item-avatar'>person</i>" +
                        "<span>" + getObject.name + "</span>" + "</span>" + "<a class='mdl-list__item-secondary-action'><i id =" + getObject.id + " class='material-icons' >star</i></a>" + "</li>";
                    $(addHtml).appendTo('ul.mdl-list');
                } else {
                    addHtml = "<li class ='mdl-list__item'>" + "<span class ='mdl-list__item-primary-content'>" + "<i class='material-icons mdl-list__item-avatar'>person</i>" +
                        "<span>" + getObject.name + "</span>" + "</span>" + "<a class='mdl-list__item-secondary-action'><i id =" + getObject.id + " class='material-icons'>star_border</i></a>" + "</li>";
                    $(addHtml).appendTo('ul.mdl-list');
                }

            });
        });
    }
   
    $("button").on("click", function() {
        $.post("http://localhost:3000/actors", {
            name: $("#sample1").val(),
            starred: false
        });
        $("ul").empty();
        populateHtml();
    });
 populateHtml();
    $(document).bind("click", ".mdl-list__item-secondary-action .material-icons", function (eventCall) {
            var icon = $(event.target);
            var id = icon.attr("id");
            $.getJSON("http://localhost:3000/actors", function(data) {
                data.forEach(function(actor) {
                    if (id === JSON.stringify(actor.id)) {
                      if (JSON.stringify(actor.starred) === "true") {
                          $(icon).replaceWith("<i id=" +JSON.stringify(actor.id) + " class='material-icons'>star_border</i>");
                            $.ajax({
                                type: 'PUT',
                                contentType: 'application/json',
                                url: 'http://localhost:3000/actors/' + id,
                                data: JSON.stringify({
                                      name: actor.name,
                                      starred: false
                                })
                            });
                        }
                        else {
                            $(icon).replaceWith("<i id=" + JSON.stringify(actor.id) + " class='material-icons'>star</i>");
                            $.ajax({
                                type: 'PUT',
                                contentType: 'application/json',
                                url: 'http://localhost:3000/actors/' + id,
                                data: JSON.stringify({
                                      name: actor.name,
                                      starred: true
                                })
                            });
                        }
                    }
                });
            });
        }

    );
};
$(document).ready(main);
