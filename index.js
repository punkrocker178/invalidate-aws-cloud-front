const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront");

exports.handler = async () => {
    try {
        const client = new CloudFrontClient();
        const command = new CreateInvalidationCommand('E29MUCSSNM6902');
        const response = await client.send(command);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};
