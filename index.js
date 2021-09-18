const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront");
const { CodePipelineClient, PutJobSuccessResultCommand, PutJobFailureResultCommand } = require ("@aws-sdk/client-codepipeline");

exports.handler = async (event) => {
    const codePipelineClient = new CodePipelineClient();
    const client = new CloudFrontClient();
    const codePipelineJobId = event['CodePipeline.job']['id'];
    
    try {
        const command = new CreateInvalidationCommand({
            DistributionId: 'E29MUCSSNM6902',
            InvalidationBatch: {
                CallerReference: Date.now(),
                Paths: {
                    Items: ['/*'],
                    Quantity: 1
                }
            }
        });

        const response = await client.send(command);
        const codePipelineCommand = new PutJobSuccessResultCommand({
            jobId: codePipelineJobId
        });
    
        const codePipelineResponse = await codePipelineClient.send(codePipelineCommand);
        console.log({
            Id: response.Invalidation.Id,
            CreateTime: response.Invalidation.CreateTime,
            Status: response.Invalidation.Status,
            Location: response.Location
        });

        return codePipelineResponse;

    } catch (err) {
        const jobFailed = new PutJobFailureResultCommand({
            failureDetails: {
                message: 'Invalidation failed',
                type: 'JobFailed'
            },
            jobId: codePipelineJobId
        });

        const failedResponse = await codePipelineClient.send(jobFailed);
        return failedResponse;
    }
};
