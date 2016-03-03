modules.define(
    'model',
    ['inherit', 'objects'],
    function(provide, inherit, objects, Model) {


        Model.Field.Type.String = inherit(Model.Field, {

            /**
             * Значение по умолчанию пустая строка
             */
            _default: '',

            /**
             * Правила валидации для поля типа string
             * @private
             */
            _getValidationRules: function() {
                var maxLength = {
                    value: Infinity,
                    validate: function(curValue, ruleValue, name) {
                        return curValue.length <= ruleValue;
                    }
                };

                return objects.extend(this._commonRules(), {
                    maxlength: maxLength,
                    maxLength: maxLength
                })
            }

        });

        provide(Model);

    });
