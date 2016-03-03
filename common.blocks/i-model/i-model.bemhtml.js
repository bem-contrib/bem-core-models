/**
 * {
 *     block: 'i-model',
 *
 *     modelName: 'name',
 *     modelId: 'id',
 *     modelPath: '',
 *     modelData: { ... },
 *     modelParentName
 *     modelParentPath
 *     parentId
 *
 *     modelParams: {
 *         name: '',
 *         id: '',
 *         data: '',
 *         path: '',
 *
 *         parentId,
 *         parentName,
 *         parentPath
 *     }
 *
 *     modelsParams: [
 *         {
 *             name: 'name',
 *             id: 'id',
 *             path: 'id',
 *             data: { ... },
 *
 *             parentId,
 *             parentName,
 *             parentPath
 *         }
 *     ]
 * }
 */

block('i-model')(
    def().match(function() { return this._modelAggregation; })(function() {
        this._modelAggregatorData.push(apply('get-params'));
    }),

    def()(function() {
        this.ctx.js = { data: apply('get-params') };

        return applyNext();
    }),

    mode('get-params')(function() {
        var ctx = this.ctx;

        if (ctx.modelsParams) return ctx.modelsParams;
        if (ctx.modelParams) return ctx.modelParams;

        var params = {
            data: ctx.modelData,
            name: ctx.modelName,
            id: ctx.modelId
        };

        if (ctx.modelParentPath)
            params.parentPath = ctx.modelParentPath;

        if (ctx.modelParentName) {
            params.parentName = ctx.modelParentName;
            params.parentId = ctx.modelParentId;
        }

        return params;
    }),

    attrs()({
        style: 'display: none'
    })
);
