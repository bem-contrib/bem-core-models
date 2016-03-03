modules.define('model', ['inherit'], function(provide, inherit, Model) {

    /**
     * @namespace Model.Field.Type.Model
     */
    Model.Field.Type.Model = inherit(Model.Field, {

        /**
         * Инициализация поля
         * @param data
         * @returns {Model.Field.Type.Model}
         */
        initData: function(data) {
            this._value = Model.create({ name: this.params.modelName, parentModel: this.model }, data);

            this._initEvents();

            return this;
        },

        /**
         * Инициализирует события на модели
         * @private
         */
        _initEvents: function() {
            this._value.on('change', this._onInnerModelChange, this);
        },

        /**
         * Отписывается от событий на модели
         * @private
         */
        _unBindEvents: function() {
            this._value.un('change', this._onInnerModelChange, this);
        },

        /**
         * Обрабатывает изменения модели, генерирует событие на родительской модели
         * @private
         */
        _onInnerModelChange: function() {
            this._emit('change', { fields: this._value.changed });
        },

        /**
         * Закешировать состояние модели
         * @returns {Field}
         */
        fixData: function() {
            this._value.fix();

            return this;
        },

        /**
         * Откатить значение на закешированное
         * @returns {Field}
         */
        rollback: function() {
            this._value.rollback();

            return this;
        },

        /**
         * Задать значение
         * @param {Object} value
         * @param {Object} opts
         * @returns {Field}
         */
        set: function(value, opts) {
            return this._set(value, opts);
        },

        /**
         * Проапдейтить модель данными
         * @param {Object|BEM.Model} data
         * @param {Object} opts
         * @returns {Field}
         * @private
         */
        _set: function(data, opts) {
            if (data instanceof Model) {
                if (data.name === this.params.modelName) {
                    this._unBindEvents();
                    this.params.destruct && opts.destruct !== false && this._value.destruct();

                    this._value = data;
                    this._initEvents();
                } else {
                    throw new Error('incorrect model "' + data.name + '", expected model "' +
                        this.params.modelName + '"');
                }
            } else {
                this._value.update(data);
            }

            this._emit(opts && opts.isInit ? 'init' : 'change', opts);

            return this;
        },

        /**
         * Очистить поля модели
         * @param {Object} opts
         * @returns {Field}
         */
        clear: function(opts) {
            this._value.clear(opts);

            return this;
        },

        /**
         * Получить модель
         * @returns {Model}
         */
        get: function() {
            return this._value;
        },

        /**
         * Получить данные модели
         * @returns {Object}
         */
        toJSON: function() {
            return this._value.toJSON();
        },

        /**
         * Правила валидиции для поля типа model
         * @returns {Object}
         * @private
         */
        _getValidationRules: function() {
            var field = this;

            return $.extend(this._commonRules(), {
                /**
                 * валидация вложенной модели
                 */
                deep: {
                    value: true,
                    validate: function(curValue, ruleValue, name) {
                        return field._value.isValid() == ruleValue
                    }
                }
            });
        },

        /**
         * Уничтожает поле и модель этого поля
         */
        destruct: function() {
            this._unBindEvents();

            this.params.destruct && this._value.destruct();
        }

    });

    provide(Model);

});
