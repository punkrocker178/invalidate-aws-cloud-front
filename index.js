const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront");

exports.handler = async () => {
    try {
        const client = new CloudFrontClient();
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
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};
