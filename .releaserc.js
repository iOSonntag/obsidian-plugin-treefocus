module.exports = {
  "branches": [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    "master",
    "next",
    "next-major",
    {
      "name": "beta",
      "prerelease": true
    },
    {
      "name": "alpha",
      "prerelease": true
    }
  ],
  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          {
            "type": "breaking",
            "release": "major"
          }
        ]
      }
    ],
    [
      "@semantic-release/exec",
      {
        "verifyReleaseCmd": "echo \"NEXT_RELEASE_VERSION=${nextRelease.version}\" >> $GITHUB_OUTPUT"
      }
    ],
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/npm",
      {
        "npmPublish": false 
      }
    ],
    [
      "@semantic-release/exec",
      {
        "populateVersion": "pnpm run version"
      }
    ],
    // [
    //   "@semantic-release/exec",
    //   {
    //     "populateVersion": "VERSION=$(node -p \"require('./package.json').version\")\n" +
    //       "gh release create \"$VERSION\" \
    //       --title=\"Release v$VERSION\" \
    //       main.js manifest.json styles.css"
    //   }
    // ],
    // "@semantic-release/github",
    // {
    //   "assets": [
    //     { "path": "dist/asset.min.css", "label": "CSS distribution" },
    //     { "path": "dist/asset.min.js", "label": "JS distribution" }
    //   ]
    // },
    [
      "@semantic-release/git",
      {
        "assets": [
          "package.json",
          "package-lock.json",
          "pnpm-lock.yaml",
          "manifest.json",
          "versions.json",
          "CHANGELOG.md"
        ],
        "message": "chore(release): v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ],
  "dryRun": false,
  "preset": "angular"
};
