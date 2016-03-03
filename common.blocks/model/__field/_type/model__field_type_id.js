modules.define('model', ['inherit'], function(provide, inherit, Model) {

    /**
     * @namespace Model.Field.Type.Id
     */
    Model.Field.Type.Id = inherit(Model.Field, {

        isEmpty: function() {
            return true;
        }

    });

    provide(Model);
});
