modules.define('bem-model', ['i-bem-dom', 'model'], function(provide, bemDom, Model) {

    var BemModel = bemDom.declBlock('model', {

        onSetMod: {
            js: {
                inited: function() {
                    var data = Model.modelsData,
                        modelsParams = this.params.data,
                        storeData = function storeData(modelParams) {
                            var modelData = data[modelParams.name] || (data[modelParams.name] = {});

                            modelData[Model.buildPath(modelParams)] = modelParams.data;
                        };

                    if (Array.isArray(modelsParams)) {
                        modelsParams.forEach(storeData);
                    } else {
                        storeData(modelsParams);
                    }
                }
            }
        }

    });

    provide(BemModel);
});
