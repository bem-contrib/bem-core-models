modules.require(['i-bem__dom', 'model'], function(BEMDOM, Model) {

BEMDOM.decl('model', {

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

});
