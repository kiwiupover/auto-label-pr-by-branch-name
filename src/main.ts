import * as core from '@actions/core';
import * as github from '@actions/github';
import { Octokit } from '@octokit/rest';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token');
    const octokit = new Octokit({ auth: `token ${token}` });

    const context = github.context;
    const username = context.actor;

    // This is a test
    await octokit.users.getByUsername({
      username,
    });

    core.info(`[Action Query] Query ${username} success!`);
    core.info(`WOOT WOOT`);
  } catch (error: any) {
    core.info(`[Action Query] Bugger`);
    core.setFailed(error.message);
  }
}

run();
