({
    block: 'i-model-aggregator',
    content: [
        {
            block: 'i-model',
            modelName: 'bla',
            modelData: {
                a: 1,
                b: 2
            }
        },
        {
            block: 'b-inner-block',
            content: [
                {
                    block: 'i-model',
                    modelParams: {
                        name: 'inner-aggregate-model',
                        data: {
                            a: 1,
                            b: 2
                        }
                    }
                },
                'bla',
                {
                    block: 'i-model',
                    modelName: 'next-bla'
                }
            ]
        }
    ]
})
