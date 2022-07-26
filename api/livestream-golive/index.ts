import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DefaultAzureCredential } from '@azure/identity';
import { AzureMediaServices, LiveEvent } from '@azure/arm-mediaservices';
import { AbortController } from '@azure/abort-controller';

// This is the main Media Services client object
let mediaServicesClient: AzureMediaServices;
// Long running operation polling interval in milliseconds
const longRunningOperationUpdateIntervalMs = 1000;

// Copy the samples.env file and rename it to .env first, then populate it's values with the values obtained 
// from your Media Services account's API Access page in the Azure portal.
const clientId: string = process.env.AZURE_CLIENT_ID as string;
const secret: string = process.env.AZURE_CLIENT_SECRET as string;
const subscriptionId: string = process.env.AZURE_SUBSCRIPTION_ID as string;
const resourceGroup: string = process.env.AZURE_RESOURCE_GROUP as string;
const accountName: string = process.env.AZURE_MEDIA_SERVICES_ACCOUNT_NAME as string;

// const credential = new ManagedIdentityCredential("<USER_ASSIGNED_MANAGED_IDENTITY_CLIENT_ID>");
const credential = new DefaultAzureCredential({
    managedIdentityClientId: process.env.USER_MANAGED_IDENTITY_CLIENT_ID as string
});

interface liveStream {
    name: string,
    location: string
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    console.log('HTTP trigger - Livestream Go Live!');
    console.log("Getting the client for Media Services");
   
    try {
        mediaServicesClient = new AzureMediaServices(credential, subscriptionId)
    } catch (err) {
        console.log(`Error retrieving Media Services Client.`);
        console.error(err);
    }

    if (req.method == "PUT") {

        console.log(`Request body ${JSON.stringify(req.body)}`);
        const liveStream:liveStream = JSON.parse(req.rawBody) as liveStream;
        console.log(`liveStream ${liveStream}`);

        const name = liveStream.name;
        console.log(`Starting live event:  ${name}`);

        // Attempt to start the long running operation and wait
        await mediaServicesClient.liveEvents.beginStartAndWait(
            resourceGroup,
            accountName,
            name,
            {
                updateIntervalInMs: longRunningOperationUpdateIntervalMs,
                abortSignal: AbortController.timeout(12000),
            }).then(() => {
                context.res = {
                    status: 200, // accepted
                }
            }).catch(err => {
                console.error(`Error starting live event : ${name}`)
                console.error(err);

                context.res = {
                    status: 500
                }
            });
    };
};

export default httpTrigger;