import { Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec, LinuxBuildImage, Project, Source } from 'aws-cdk-lib/aws-codebuild';
import { Repository, IRepository } from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkCodebuildStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const repo: IRepository = Repository.fromRepositoryName(this, "sample-repo", "sample");
    new Project(this, "SampleCodeBuild", {
      source: Source.codeCommit({ repository: repo }),
      projectName: 'my-sample-project',
      environment: {
        buildImage: LinuxBuildImage.STANDARD_5_0
      },
      buildSpec: BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands: [
              'NUMBER=1',
              'while [ $NUMBER -lt 5 ]; do',
              'echo "Number is: $((NUMBER++))"',
              'done'
            ]
          }
        }
      })
    })
  }
}
