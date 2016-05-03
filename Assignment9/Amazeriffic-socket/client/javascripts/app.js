/*globals ko*/
/*globals $*/
//creating todo object for newest and oldest tab
//creating a todo object for tags tab
var Tab = function(name, selected) {
    this.name = name;
    this.current = ko.computed(function() {
        return this === selected();
    }, this);
};

function ToDo(data) {
    this.description = ko.observable(data.description);
    this.tags = ko.observableArray(data.tags);
}

function AppViewModel() {
    var self = this;

    self.currentTab = ko.observable(); //will store current tab

    //all possible tabs array
    self.tabs = ko.observableArray([
        new Tab('newest', self.currentTab),
        new Tab('oldest', self.currentTab),
        new Tab('tags', self.currentTab),
        new Tab('add', self.currentTab)
    ]);

    //inialize to the first tab
    self.currentTab(self.tabs()[0]);

    //adding new tabs data fields 
    self.todos = ko.observableArray([]);
    self.newTodo_description = ko.observable("");
    self.newTodo_tags = ko.observable("");
    self.TagsTodo = ko.observable([]);

    //creates tag objects
    function TagData() {
        var tags = [];

        self.todos().forEach(function(toDo) {
            toDo.tags().forEach(function(tag) {
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });

        var tagObjects = tags.map(function(tag) {
            var toDosWithTag = [];

            self.todos().forEach(function(toDo) {
                if (toDo.tags.indexOf(tag) !== -1) {
                    toDosWithTag.push(toDo.description);
                }
            });

            return {
                "name": tag,
                "toDos": toDosWithTag
            };
        });
        self.TagsTodo(tagObjects);
    }

    //interacts with server and returns todo objects
    $.getJSON("/todos.json", function(result) {
        var Todos = $.map(result, function(item) {
            return new ToDo(item);
        });
        self.todos(Todos);
        TagData();
    });

    //adds new todo
    self.addToDo = function() {
        var description = self.newTodo_description,
            tags = self.newTodo_tags,
            split_tags = tags().split(','),
            newToDo = {
                "description": description,
                "tags": split_tags
            };

        if (description() !== "" && tags() !== "") {
            $.post("/todos", newToDo, function(result) {
                var Todos = $.map(result, function(item) {
                    return new ToDo(item);
                });
                self.todos(Todos);
                TagData();
            });
        }
        //clears the text fields
        self.newTodo_description("");
        self.newTodo_tags("");
    };
}

ko.applyBindings(new AppViewModel());
