modules.define(
    'spec',
    ['model'],
    function(provide, Model) {

describe('model', function() {

    describe('create model', function() {
        Model.decl('model-to-create', {
            f1: 'string',
            f2: 'string'
        });

        it('should create model without params', function() {
            Model
                .create('model-to-create')
                .toJSON().should.be.deep.equal({
                f1: '',
                f2: ''
            });
        });

        it('should create model with params', function() {
            Model
                .create('model-to-create', {
                    f1: 'F1',
                    f2: 'F2'
                })
                .toJSON().should.be.deep.equal({
                f1: 'F1',
                f2: 'F2'
            });
        });
    });

    // describe('model methods', function() {
    //     Model.decl('model-with-methods', {
    //         f1: 'number',
    //         f2: 'number'
    //     }, {
    //         modelMethod: function() {},
    //         getSum: function() { return this.get('f1') + this.get('f2'); },
    //     });
    //
    //     it('should create model with methods', function() {
    //         expect(typeof Model.create('model-with-methods', {}).modelMethod).toEqual('function');
    //     });
    //
    //     it('should return sum of fields', function() {
    //         expect(Model.create('model-with-methods', { f1: 1, f2: 2 }).getSum()).toEqual(3);
    //     });
    //
    //     it('should not override protected methods', function() {
    //         expect(function() {
    //             Model.decl('model-with-protected-method', {
    //             }, {
    //                 set: function() {}
    //             });
    //         }).toThrow(new Error('method "set" is protected'));
    //     });
    // });
    //
    // // BASE Model
    // describe('base model', function() {
    //     Model.decl('base-model', {
    //         baseField1: 'string',
    //         baseField2: 'string'
    //     });
    //
    //     Model.decl({ model: 'model-with-base', baseModel: 'base-model' }, {
    //         myField: 'string'
    //     });
    //
    //     it('should have base fields', function() {
    //         expect(
    //             Model
    //                 .create('model-with-base', {
    //                     baseField1: 'str',
    //                     myField: 'mystr'
    //                 })
    //                 .set('baseField2', 'str2')
    //                 .toJSON())
    //             .toEqual({
    //                 baseField1: 'str',
    //                 baseField2: 'str2',
    //                 myField: 'mystr'
    //             });
    //     });
    // });
    //
    // // BASE Model WITH METHODS
    // describe('base model with methods', function() {
    //     Model.decl('base-model-with-methods', {
    //         f1: 'number'
    //     }, {
    //         getF1: function() { return this.get('f1') }
    //     });
    //
    //     Model.decl({ model: 'model-with-base-and-methods', baseModel: 'base-model-with-methods'}, {
    //         f1: 'number',
    //         f2: 'number'
    //     }, {
    //         getSum: function() { return this.get('f2') + this.getF1() }
    //     });
    //
    //     it('should not have "getSum" method', function() {
    //         expect(Model.create('base-model-with-methods', { f1: 1 }).getSum).not.toBeDefined();
    //     });
    //
    //     it('should have "getF1" method', function() {
    //         expect(Model.create('model-with-base-and-methods', { f1: 1, f2: 2 }).getF1).toBeDefined();
    //     });
    //
    //     it('should return sum of f1 and f2', function() {
    //         expect(Model.create('model-with-base-and-methods', { f1: 1, f2: 2 }).getSum()).toEqual(3);
    //     });
    // });
    //
    // describe('internal fields', function() {
    //     Model.decl('model-with-internal-fields', {
    //         publicField: {
    //             type: 'string'
    //         },
    //         internalField: {
    //             type: 'string',
    //             internal: true
    //         },
    //         notInternalField: {
    //             type: 'string',
    //             internal: false
    //         }
    //     });
    //
    //     var model = Model.create('model-with-internal-fields',{
    //         publicField: 'public',
    //         internalField: 'i\'m internal',
    //         notInternalField: 'i\'m not internal'
    //     });
    //
    //     it('should show internal fields in toJSON', function() {
    //         expect(
    //             Model
    //                 .create('model-with-internal-fields', {
    //                     publicField: 'public',
    //                     internalField: 'i\'m internal',
    //                     notInternalField: 'i\'m not internal'
    //                 })
    //                 .toJSON())
    //             .toEqual({
    //                 publicField: 'public',
    //                 notInternalField: 'i\'m not internal'
    //             });
    //     });
    //
    // });
    //
    // describe('get', function() {
    //     Model.decl('model-for-get', {
    //         f1: { type: 'string' }
    //     });
    //
    //     Model.decl('sub-model-for-get', {
    //         s1: { type: 'string' }
    //     });
    //
    //     var model = Model.create({ name: 'model-for-get', id: 1 }, { f1: 1 }),
    //         model0 = Model.create({ name: 'model-for-get', id: 0 }, { f1: 1 }),
    //         model10 = Model.create({ name: 'model-for-get', id: 10 }, { f1: 1 }),
    //         subModel = Model.create({ name: 'sub-model-for-get', id: 1, parentName: 'model-for-get', parentId: 1 }, { f1: 1 }),
    //         subModel2 = Model.create({ name: 'sub-model-for-get', id: 2, parentModel: model }, { f1: 1 });
    //
    //     it('should find model', function() {
    //         expect(Model.get('model-for-get').length).toEqual(3);
    //         expect(Model.get({ name: 'model-for-get', id: '*' }).length).toEqual(3);
    //         expect(Model.get({ name: 'model-for-get', id: 1 }).length).toEqual(1);
    //         expect(Model.get({ name: 'model-for-get', id: 1 })[0]).toEqual(model);
    //         expect(Model.get({ name: 'model-for-get', id: 0 })[0]).toEqual(model0);
    //         expect(Model.get({ name: 'model-for-get', id: 10 })[0]).toEqual(model10);
    //     });
    //
    //     it('should find sub model', function() {
    //         expect(Model.get('sub-model-for-get').length).toEqual(2);
    //         expect(Model.get({ name: 'sub-model-for-get', id: '*' }).length).toEqual(2);
    //
    //         expect(Model.get({ name: 'sub-model-for-get', id: '1' })[0]).toBe(subModel);
    //         expect(Model.get({ name: 'sub-model-for-get', id: '1', parentModel: model }, true)[0]).toBe(subModel);
    //         expect(Model.get({ name: 'sub-model-for-get', id: '1', parentName: 'model-for-get', parentId: 1 }, true)[0]).toEqual(subModel);
    //         expect(Model.get({ name: 'sub-model-for-get', id: '1', parentPath: model.path() }, true)[0]).toEqual(subModel);
    //
    //         expect(Model.get({ name: 'sub-model-for-get', id: '2', parentPath: model.path() }, true)[0]).toEqual(subModel2);
    //     });
    // });
    //
    // describe('global events', function() {
    //     Model.decl('event-model', {
    //         field: { type: 'string' }
    //     });
    //
    //     Model.decl('event-sub-model', {
    //         field: { type: 'string' }
    //     });
    //
    //     Model.decl('to-destruct', {
    //         f1: { type: 'string' }
    //     });
    //
    //
    //     var createCallback = jasmine.createSpy('spyCallback');
    //     Model.on('to-destruct', 'create', createCallback);
    //
    //     it('createCallback should be called', function() {
    //         expect(createCallback).toHaveBeenCalled();
    //     });
    //
    //     var changeCallback = jasmine.createSpy('changeCallback'),
    //         fieldChangeCallback = jasmine.createSpy('fieldChangeCallback'),
    //         unCallback = jasmine.createSpy('unCallback'),
    //         subModelCallback = jasmine.createSpy('subModelCallback'),
    //         customCallback = jasmine.createSpy('customCallback'),
    //         destructCallback = jasmine.createSpy('destructCallback'),
    //
    //         ctx = { ctx: 1 },
    //
    //         model1 = Model.create('event-model', { field: 1 }),
    //         model2 = Model.create('event-model', { field: 2 }),
    //
    //         subModel = Model.create({ name: 'event-sub-model', parentModel: model1 }, { field: 2 }),
    //
    //         toDestruct = Model.create('to-destruct', { f1: 'val1' });
    //
    //
    //     Model.on({ name: 'event-model' }, 'change', changeCallback);
    //     Model.on({ name: 'event-model' }, 'change', unCallback, ctx);
    //     Model.on({ name: 'event-model' }, 'field', 'change', fieldChangeCallback);
    //
    //     Model.on({ name: 'event-sub-model', parentName: 'event-model', parentId: model1.id }, 'change', subModelCallback);
    //
    //     Model.on('event-model', 'custom-event', customCallback);
    //
    //     var model3 = Model.create('event-model', { field: 3 });
    //
    //
    //     it('changeCallback should be called', function() {
    //         expect(changeCallback).toHaveBeenCalled();
    //     });
    //
    //     it('changeCallback should be called 3 times', function() {
    //         expect(changeCallback.calls.length).toEqual(3);
    //     });
    //
    //     it('fieldChangeCallback should be called', function() {
    //         expect(fieldChangeCallback).toHaveBeenCalled();
    //     });
    //
    //     it('fieldChangeCallback should be called 3 times', function() {
    //         expect(fieldChangeCallback.calls.length).toEqual(3);
    //     });
    //
    //     it('unCallback should not be called', function() {
    //         expect(unCallback.calls.length).toEqual(0);
    //     });
    //
    //     it('subModelCallback should be called 1 time', function() {
    //         expect(subModelCallback.calls.length).toEqual(1);
    //     });
    //
    //     it('customCallback should be called 1 time', function() {
    //         expect(customCallback.calls.length).toEqual(1);
    //     });
    //
    //     Model.un({ name: 'event-model' }, 'change', unCallback, ctx);
    //
    //     toDestruct.on('destruct', destructCallback);
    //     Model.on('to-destruct', 'destruct', destructCallback, {});
    //     //Model.destruct('to-destruct');
    //     toDestruct.destruct();
    //
    //     it('toDestruct should be destroyed', function() {
    //         expect(Model.get('to-destruct', true).length).toEqual(0);
    //     });
    //     it('destructCallback should be called 2 times', function() {
    //         expect(destructCallback.calls.length).toEqual(2);
    //     });
    //
    //     model1.set('field', 111);
    //     model2.set('field', 222);
    //     model3.set('field', 333);
    //
    //     subModel.set('field', 123);
    //
    //     model1.emit('custom-event');
    // });
    //
    // //todo: написать тест на валидацию по максимально развернутой схеме
    // describe('validate', function() {
    //     Model.decl('valid-model', {
    //         f1: {
    //             type: 'string',
    //             validation: {
    //                 rules: {
    //                     required: true,
    //                     maxlength: 10
    //                 }
    //             }
    //         },
    //         f2: {
    //             type: 'string',
    //             validation: {
    //                 rules: {
    //                     required: true
    //                 }
    //             }
    //         },
    //         f3: {
    //             type: 'number',
    //             validation: {
    //                 rules: {
    //                     required: true,
    //                     max: 10,
    //                     ruleF3: {
    //                         needToValidate: function() {
    //                             return false;
    //                         },
    //                         validate: function() {
    //                             return false;
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //         f4: {
    //             validation: {
    //                 needToValidate: function() {
    //                     return false;
    //                 },
    //                 validate: function() {
    //                     return true;
    //                 }
    //             }
    //         }
    //     });
    //
    //     var model = Model.create('valid-model', {
    //         f1: '11234',
    //         f2: '222'
    //     });
    //
    //     it('model should be valid', function() {
    //         model.set('f3', 1);
    //         expect(model.isValid()).toEqual(true);
    //     });
    //
    //     it('model should be invalid', function() {
    //         model.clear('f1');
    //         expect(model.isValid()).toEqual(false);
    //     });
    // });
    //
    //
    // describe('trigger', function() {
    //     Model.decl('model-for-trigger', { f1: 'number', f2: 'string' });
    //
    //     it('should trigger event (model name)', function() {
    //         var onModelChange = jasmine.createSpy('onModelChange'),
    //             onFieldChange = jasmine.createSpy('onFieldChange'),
    //             disabledHandler = jasmine.createSpy('disabledHandler');
    //
    //         Model
    //             .create('model-for-trigger', { f1: 1, f2: 'bla' })
    //             .on('change', onModelChange)
    //             .on('f1', 'change', onFieldChange)
    //             .on('change', disabledHandler)
    //             .un('change', disabledHandler);
    //
    //
    //         Model.emit('model-for-trigger', 'f1', 'change');
    //
    //         expect(onModelChange).not.toHaveBeenCalled(); // событие на поле не всплывёт после .trigger только после set
    //
    //         expect(onFieldChange).toHaveBeenCalled();
    //         expect(disabledHandler).not.toHaveBeenCalled();
    //
    //         Model.getOne('model-for-trigger').set('f1', 2);
    //         expect(onModelChange).toHaveBeenCalled(); // событие на поле всплывёт после set
    //     });
    //
    //
    //     it('should trigger event (model path object)', function() {
    //         var onModelChange = jasmine.createSpy('onModelChange'),
    //             onFieldChange = jasmine.createSpy('onFieldChange'),
    //             disabledHandler = jasmine.createSpy('disabledHandler'),
    //             modelParams = { name: 'model-for-trigger', id: 1 };
    //
    //         Model
    //             .create(modelParams, { f1: 1, f2: 'bla' })
    //             .on('change', onModelChange)
    //             .on('f1', 'change', onFieldChange)
    //             .on('change', disabledHandler)
    //             .un('change', disabledHandler);
    //
    //
    //         Model.emit(modelParams, 'f1', 'change');
    //
    //         expect(onModelChange).not.toHaveBeenCalled(); // событие на поле не всплывёт после .trigger только после set
    //
    //         expect(onFieldChange).toHaveBeenCalled();
    //         expect(disabledHandler).not.toHaveBeenCalled();
    //
    //         Model.getOne(modelParams).set('f1', 2);
    //         expect(onModelChange).toHaveBeenCalled(); // событие на поле всплывёт после set
    //     });
    //
    //
    // });
    //
    // describe('destruct', function() {
    //     Model.decl('model-for-destruct1', { f1: 'number', f2: 'string' });
    //     Model.decl('model-for-destruct2-parent', { f1: 'number', f2: 'string' });
    //     Model.decl('model-for-destruct2', { f1: 'number', f2: 'string' });
    //     Model.decl('model-for-destruct3', { f1: 'number', f2: 'string' });
    //
    //     var modelForDestruct1 = Model.create('model-for-destruct1', { f1: 1, f2: 'bla' }),
    //         modelForDestruct2Params = {
    //             name: 'model-for-destruct2',
    //             parentName: 'model-for-destruct2-parent'
    //         },
    //         modelForDestruct2 = Model.create(modelForDestruct2Params, { f1: 1, f2: 'bla' }),
    //         modelForDestruct3 = Model.create('model-for-destruct3', { f1: 1, f2: 'bla' });
    //
    //     it('destruct(Model)', function() {
    //         Model.destruct(modelForDestruct1);
    //         expect(Model.get(modelForDestruct1.name, 1).length).toEqual(0);
    //     });
    //
    //     it('destruct(name)', function() {
    //         Model.destruct(modelForDestruct3.name);
    //         expect(Model.get(modelForDestruct3.name, 1).length).toEqual(0);
    //     });
    //
    //     it('destruct(modelPath)', function() {
    //         Model.destruct(modelForDestruct2Params);
    //         expect(Model.get(modelForDestruct2.name, 1).length).toEqual(0);
    //     });
    //
    // });
    //
    // describe('buildPath', function() {
    //
    //     describe('buildPath pathParts.name', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({ name: 'model' })).toEqual('model:*');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([{ name: 'model1' }, { name: 'model2' }])).toEqual('model1:*,model2:*');
    //         });
    //     });
    //
    //     describe('buildPath pathParts.name [pathParts.id]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({ name: 'model', id: 1 })).toEqual('model:1');
    //
    //             expect(Model.buildPath({ name: 'model', id: '2' })).toEqual('model:2');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([{ name: 'model', id: 1 }, { name: 'model', id: '2' }]))
    //                 .toEqual('model:1,model:2');
    //         });
    //     });
    //
    //     // parent
    //     describe('buildPath pathParts.name [pathParts.parentName]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 parentName: 'parent-model'
    //             })).toEqual('parent-model.model:1');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([
    //                 {
    //                     name: 'model',
    //                     id: 1,
    //                     parentName: 'parent-model'
    //                 },
    //                 {
    //                     name: 'model',
    //                     id: '2',
    //                     parentName: 'parent-model'
    //                 }
    //             ])).toEqual('parent-model.model:1,parent-model.model:2');
    //         });
    //     });
    //
    //     describe('buildPath pathParts.name [pathParts.parentId]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 parentName: 'parent-model',
    //                 parentId: 42
    //             })).toEqual('parent-model:42.model:1');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([
    //                 {
    //                     name: 'model',
    //                     id: 1,
    //                     parentName: 'parent-model',
    //                     parentId: 42
    //                 },
    //                 {
    //                     name: 'model',
    //                     id: '2',
    //                     parentName: 'parent-model',
    //                     parentId: '2'
    //                 }
    //             ])).toEqual('parent-model:42.model:1,parent-model:2.model:2');
    //         });
    //     });
    //
    //     describe('buildPath pathParts.name [pathParts.parentPath]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 parentPath: {
    //                     name: 'parent-model',
    //                     id: 1
    //                 }
    //             })).toEqual('parent-model:1.model:1');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([
    //                 {
    //                     name: 'model',
    //                     id: 1,
    //                     parentPath: {
    //                         name: 'parent-model',
    //                         id: 1
    //                     }
    //                 },
    //                 {
    //                     name: 'model',
    //                     id: '2',
    //                     parentPath: {
    //                         name: 'parent-model',
    //                         id: 1
    //                     }
    //                 }
    //             ])).toEqual('parent-model:1.model:1,parent-model:1.model:2');
    //         });
    //     });
    //
    //     Model.decl('parent-model', {
    //         f1: 'string',
    //         f2: 'string',
    //         f3: 'string'
    //     });
    //
    //     var parentModel1 = Model.create({ name: 'parent-model', id: 1 }, {
    //         f1: '11234',
    //         f2: '222'
    //     });
    //
    //     describe('buildPath pathParts.name [pathParts.parentModel]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 parentModel: parentModel1
    //             })).toEqual('parent-model:1.model:1');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([
    //                 {
    //                     name: 'model',
    //                     id: 1,
    //                     parentModel: parentModel1
    //                 },
    //                 {
    //                     name: 'model',
    //                     id: '2',
    //                     parentModel: parentModel1
    //                 }
    //             ])).toEqual('parent-model:1.model:1,parent-model:1.model:2');
    //         });
    //     });
    //
    //
    //     //child
    //     describe('buildPath pathParts.name [pathParts.childName]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 childName: 'child-model'
    //             })).toEqual('model:1.child-model');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([
    //                 {
    //                     name: 'model',
    //                     id: 1,
    //                     childName: 'child-model'
    //                 },
    //                 {
    //                     name: 'model',
    //                     id: '2',
    //                     childName: 'child-model'
    //                 }
    //             ])).toEqual('model:1.child-model,model:2.child-model');
    //         });
    //     });
    //
    //     describe('buildPath pathParts.name [pathParts.childId]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 childName: 'child-model',
    //                 childId: 42
    //             })).toEqual('model:1.child-model:42');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([
    //                 {
    //                     name: 'model',
    //                     id: 1,
    //                     childName: 'child-model',
    //                     childId: 42
    //                 },
    //                 {
    //                     name: 'model',
    //                     id: '2',
    //                     childName: 'child-model',
    //                     childId: '2'
    //                 }
    //             ])).toEqual('model:1.child-model:42,model:2.child-model:2');
    //         });
    //     });
    //
    //     describe('buildPath pathParts.name [pathParts.childPath]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 childPath: {
    //                     name: 'child-model',
    //                     id: 1
    //                 }
    //             })).toEqual('model:1.child-model:1');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([
    //                 {
    //                     name: 'model',
    //                     id: 1,
    //                     childPath: {
    //                         name: 'child-model',
    //                         id: 1
    //                     }
    //                 },
    //                 {
    //                     name: 'model',
    //                     id: '2',
    //                     childPath: {
    //                         name: 'child-model',
    //                         id: 1
    //                     }
    //                 }
    //             ])).toEqual('model:1.child-model:1,model:2.child-model:1');
    //         });
    //     });
    //
    //     Model.decl('child-model', {
    //         f1: 'string',
    //         f2: 'string',
    //         f3: 'string'
    //     });
    //
    //     var childModel1 = Model.create({ name: 'child-model', id: 1 }, {
    //         f1: '11234',
    //         f2: '222'
    //     });
    //
    //     describe('buildPath pathParts.name [pathParts.childModel]', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 childModel: childModel1
    //             })).toEqual('model:1.child-model:1');
    //         });
    //
    //         it('for models', function() {
    //             expect(Model.buildPath([
    //                 {
    //                     name: 'model',
    //                     id: 1,
    //                     childModel: childModel1
    //                 },
    //                 {
    //                     name: 'model',
    //                     id: '2',
    //                     childModel: childModel1
    //                 }
    //             ])).toEqual('model:1.child-model:1,model:2.child-model:1');
    //         });
    //     });
    //
    //
    //     Model.decl('grand-parent-model', {
    //         f1: 'string',
    //         f2: 'string',
    //         f3: 'string'
    //     });
    //
    //     Model.decl('child-child-model', {
    //         f1: 'string',
    //         f2: 'string',
    //         f3: 'string'
    //     });
    //
    //     var grandParentModel = Model.create({ name: 'grand-parent-model', id: 'granny' }, {
    //             f1: '11'
    //         }),
    //         childChildModel = Model.create({ name: 'child-child-model', id: 'some' }, {
    //             f1: '11234',
    //             f2: '222'
    //         });
    //
    //     describe('buildPath for long long pathParts', function() {
    //         it('for model', function() {
    //             expect(Model.buildPath({
    //                 name: 'model',
    //                 id: 1,
    //                 parentPath: {
    //                     name: 'parent',
    //                     id: 1,
    //                     parentModel: grandParentModel
    //                 },
    //                 childPath: {
    //                     name: 'child-model',
    //                     id: 2,
    //                     childModel: childChildModel
    //                 }
    //             })).toEqual('grand-parent-model:granny.parent:1.model:1.child-model:2.child-child-model:some');
    //         });
    //     });
    //
    // });
    //
    // describe('.isEqual', function() {
    //     Model.decl('model-for-compare', {
    //         f1: 'string',
    //         f2: 'string',
    //         f3: 'number',
    //         f4: 'array',
    //         f5: 'boolean',
    //         f6: { type: 'model', modelName: 'inner-model-for-compare' }
    //     });
    //
    //     Model.decl('inner-model-for-compare', {
    //         innerF: { type: 'string' },
    //         innerModelLev2: { type: 'model', modelName: 'inner-model-second-lev' }
    //     });
    //
    //     Model.decl('inner-model-second-lev', {
    //         innerFLev2: { type: 'string' }
    //     });
    //
    //     it('model should be equal to self', function() {
    //         var model = Model.create('model-for-compare', {
    //             f1: 'f1',
    //             f2: 'f2',
    //             f3: 3,
    //             f4: [1, 2, 3],
    //             f5: false,
    //             f6: {
    //                 innerF: 'str',
    //                 innerModelLev2: { innerFLev2: 'innerFLev2' }
    //             }
    //         });
    //
    //         expect(model.isEqual(model)).toBe(true);
    //
    //         model.destruct();
    //     });
    //
    //     it('model should be equal to another model with same values ', function() {
    //         var model1 = Model.create('model-for-compare', { f1: 'f1' }),
    //             model2 = Model.create('model-for-compare', { f1: 'f1' });
    //
    //         expect(model1.isEqual(model2)).toBe(true);
    //
    //         model1.destruct();
    //         model2.destruct();
    //     });
    //
    //     it('model should be equal to plain object with same values', function() {
    //         var model = Model.create('model-for-compare', {
    //             f1: 'f1',
    //             f2: 'f2',
    //             f3: 3,
    //             f4: [1, 2, 3],
    //             f5: false,
    //             f6: {
    //                 innerF: 'str',
    //                 innerModelLev2: { innerFLev2: 'innerFLev2' }
    //             }
    //         });
    //
    //         expect(model.isEqual({
    //             f1: 'f1',
    //             f2: 'f2',
    //             f3: 3,
    //             f4: [1, 2, 3],
    //             f5: false,
    //             f6: {
    //                 innerF: 'str',
    //                 innerModelLev2: {
    //                     innerFLev2: 'innerFLev2'
    //                 }
    //             }
    //         })).toBe(true);
    //
    //         model.destruct();
    //
    //         model = Model.create('model-for-compare', { f1: 'f1'});
    //         expect(model.isEqual({
    //             f1: 'f1',
    //             f2: undefined,
    //             f3: undefined,
    //             f4: [],
    //             f5: undefined,
    //             f6: {
    //                 innerF: undefined,
    //                 innerModelLev2: { innerFLev2: undefined }
    //             }
    //         })).toBe(true);
    //
    //         model.destruct();
    //     });
    //
    //     it('model should not be equal to plain object without keys that has been declared in model,' +
    //         ' even its values are "undefined"', function() {
    //         var model = Model.create('model-for-compare', { f1: 'f1' });
    //
    //         expect(model.isEqual({ f1: 'f1' })).toBe(false);
    //
    //         model.destruct();
    //     });
    //
    //     it('model should not be equal to another model with different values ', function() {
    //         var model1 = Model.create('model-for-compare', { f1: 'f1' }),
    //             model2 = Model.create('model-for-compare');
    //
    //         expect(model1.isEqual(model2)).toBe(false);
    //
    //         model1.destruct();
    //         model2.destruct();
    //     });
    // });
    //
    // describe('.getFixedValue', function() {
    //     it('after create should return hash which is equal to hash that have been passed to create method', function() {
    //         var initValues = {
    //                 f1: 'f1',
    //                 f2: 'f2',
    //                 f3: 3,
    //                 f4: [1, 2, 3],
    //                 f5: false,
    //                 f6: {
    //                     innerF: 'str',
    //                     innerModelLev2: { innerFLev2: 'innerFLev2' }
    //                 }
    //             },
    //             model = Model.create('model-for-compare', initValues);
    //
    //         expect(model.getFixedValue()).toEqual(initValues);
    //
    //         model.destruct();
    //     });
    //
    //     it('values of fields of returned hash should be equal to fixed values of model fields', function() {
    //         var initValues = {
    //                 f6: {
    //                     innerF: 'str',
    //                     innerModelLev2: { innerFLev2: 'innerFLev2' }
    //                 }
    //             },
    //             model = Model.create('model-for-compare', initValues),
    //             innerFChangedValue = 'str2',
    //             innerFLev2ChangedValue = 'innerFLev2ChangedValue';
    //
    //         model.get('f6').set('innerF', innerFChangedValue);
    //         model.get('f6').get('innerModelLev2').set('innerFLev2', innerFLev2ChangedValue);
    //         model.fix();
    //
    //         expect(model.getFixedValue().f6).toEqual(model.get('f6').getFixedValue());
    //
    //         model.destruct();
    //     });
    // });

});

provide();

});
