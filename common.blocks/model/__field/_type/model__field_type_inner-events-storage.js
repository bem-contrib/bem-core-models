modules.define('model', ['inherit', 'objects'], function(provide, inherit, objects, Model) {

    /**
     * TODO: Figure out what is this for. And replace with pretty @class
     * @namespace Model.Field.Type['inner-events-storage']
     */
    Model.Field.Type['inner-events-storage'] = inherit(Model.Field, {
        /**
         * @class Конструктор поля модели
         * @constructs
         * @private
         */
        __constructor: function() {
            /**
             * Хранилище обработчиков событий на вложенных моделях
             */
            this._eventHandlers = {};

            this.__base.apply(this, arguments);
        },

        /**
         * Сохранить обработчик события в хранилище
         * @param {String} e
         * @param {Function} fn
         * @param {Object} ctx
         * @private
         */
        _pushEventHandler: function(e, fn, ctx) {
            if (!this._eventHandlers[e])
                this._eventHandlers[e] = [];

            this._eventHandlers[e].push({
                name: e,
                fn: fn,
                ctx: ctx
            });
        },

        /**
         * Удалить обработчик события из хранилища
         * @param {String} e
         * @param {Function} fn
         * @param {Object} ctx
         * @private
         */
        _popEventHandler: function(e, fn, ctx) {
            if (!this._eventHandlers[e]) return;

            if (typeof fn !== 'undefined') {
                this._eventHandlers[e] = this._eventHandlers[e].filter(function(event) {
                    return !(fn === event.fn && ctx === event.ctx);
                });
            } else {
                delete this._eventHandlers[e];
            }
        },

        /**
         * Повесить обработчики событий из хранилища на модель
         * @param {Model} model
         * @private
         */
        _bindFieldEventHandlers: function(model) {
            objects.each(this._eventHandlers, function(events, e) {
                events && events.forEach(function(event) {
                    model.on(e, event.fn, event.ctx);
                });
            });
        },

        /**
         * Снять обработчики событий из хранилища с модели
         * @param {Model} model
         * @private
         */
        _unBindFieldEventHandlers: function(model) {
            objects.each(this._eventHandlers, function(events, e) {
                events && events.forEach(function(event) {
                    model.un(e, event.fn, event.ctx);
                });
            });
        }
    });

    provide(Model);
});
