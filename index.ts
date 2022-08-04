import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import {getSecurityGroup, getVpcOutput} from "@pulumi/aws/ec2";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

// Export the name of the bucket
export const bucketName = bucket.id;

const bucketObject = new aws.s3.BucketObject("index.html", {
    bucket: bucket,
    source: new pulumi.asset.FileAsset("index.html")
});


export const defaultVpc = getVpcOutput({default: true})

export const defaultInstance = new aws.rds.Instance("default", {
    instanceClass: "db.t3.micro",
    allocatedStorage: 10,
    engine: "postgres",
    engineVersion: "14.3",
    password: "foobarbaz",
    skipFinalSnapshot: true,
    username: "foo",
    publiclyAccessible: true,
})

// export const securityGroupId = defaultInstance.vpcSecurityGroupIds[0].apply(
//     (t:string) => { return getSecurityGroup({id: t})}
// )
//
//
//
// export const securityGroupRule = securityGroupId.apply((id) => {
//     new aws.ec2.SecurityGroupRule("example", {
//         type: "ingress",
//         fromPort: 5432,
//         toPort: 5432,
//         protocol: "tcp",
//         cidrBlocks: ["0.0.0.0/0"],
//         securityGroupId: id.id,
//     })
// })
