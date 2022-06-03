import * as core from '@actions/core';
import * as github from '@actions/github';
import { Octokit } from '@octokit/rest';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token');
    const octokit = new Octokit({ auth: `token ${token}` });

    const { owner, repo } = github.context.repo;
    const ref = github.context.ref;

    core.info(`the REF is ${ref}`);
    core.info(`the repo is ${owner}/${repo}`);

    const labels = ['test-label'];
    core.info(`Labels ${labels}`);

    const issue = github.context.issue;
    console.table(`issue ${issue}`);

    const payload = github.context.payload;
    console.table(`payload ${payload}`);

    core.info(`payload number ${payload.number}`);

    await octokit.issues.addLabels({
      labels,
      owner,
      repo,
      issue_number: github.context.issue.number,
    });

  } catch (error: any) {
    core.info(`[Action Query] Bugger`);
    core.setFailed(error.message);
  }
}

run();
