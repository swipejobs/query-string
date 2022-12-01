const branch = process.env.GO_MATERIAL_BRANCH_GIT;

const config = {
  branches: [
    { name: '1.x', range: '1.x', channel: 'swipejobs' }, // Only after the `1.x` is created in the repo
    { name: '2.x', range: '2.x', channel: 'swipejobs' }, // Only after the `2.x` is created in the repo
    { name: '3.x', range: '3.x', channel: 'swipejobs' }, // Only after the `3.x` is created in the repo
    { name: '4.x', range: '4.x', channel: 'swipejobs' }, // Only after the `4.x` is created in the repo
    { name: 'main' },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        parserOpts: {
          headerPattern: /^(?:\w+-\d+\s)?(\w*)(?:\((.*)\))?: (.*)$/,
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'angular',
        parserOpts: {
          headerPattern: /^(?:\w+-\d+\s)?(\w*)(?:\((.*)\))?: (.*)$/,
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        writerOpts: {
          commitsSort: ['subject', 'scope'],
        },
      },
    ],
  ],
};

const sem_npm = [
  '@semantic-release/npm',
  {
    npmPublish: true,
  },
];

const sem_exec = [
  '@semantic-release/exec',
  {
    successCmd:
      './build-publish-storybook.sh ${nextRelease.version} ${process.env.S3_BUCKET} ${process.env.REPO_NAME}',
  },
];

const sem_slack = [
  'semantic-release-slack-bot',
  {
    notifyOnSuccess: true,
    notifyOnFail: true,
    markdownReleaseNotes: true,
    packageName: "@swipejobs/query-string"
  },
];

if (branch === 'main') {
  changelogFilename = 'CHANGELOG.md';
  git_assets = [changelogFilename, 'package.json', 'package-lock.json'];
} else if (branch === '1.x') {
  changelogFilename = 'CHANGELOG-1.x.md';
  git_assets = [changelogFilename, 'package.json', 'package-lock.json'];
} else if (branch === '2.x') {
  changelogFilename = 'CHANGELOG-2.x.md';
  git_assets = [changelogFilename, 'package.json', 'package-lock.json'];
} else if (branch === '3.x') {
  changelogFilename = 'CHANGELOG-3.x.md';
  git_assets = [changelogFilename, 'package.json', 'package-lock.json'];
} else if (branch === '4.x') {
  changelogFilename = 'CHANGELOG-4.x.md';
  git_assets = [changelogFilename, 'package.json', 'package-lock.json'];
}

config.plugins.push(
  [
    '@semantic-release/changelog',
    {
      changelogFile: changelogFilename,
    },
  ],
  '@semantic-release/npm',
  [
    '@semantic-release/git',
    {
      assets: git_assets,
    },
  ],
  sem_slack,
  // sem_exec,
);

// console.log(JSON.stringify(config, null, ' '))

module.exports = config;
