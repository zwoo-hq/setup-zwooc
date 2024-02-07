# :gear: zwooc Action

![](https://github.com/zwoo-hq/setup-zwooc/workflows/build-test/badge.svg)
![](https://github.com/zwoo-hq/setup-zwooc/workflows/CodeQL/badge.svg)

## About

This action sets up the zwoo build system cli, [`zwooc`](https://github.com/zwoo-hq/zwooc), on GitHub's hosted Actions runners.

This action can be run on `ubuntu-latest`, `windows-latest`, and `macos-latest` GitHub Actions runners, and will install and expose a specified version of the `zwooc` CLI on the runner environment.

## Usage

Setup `zwooc`:

```yaml
steps:
  - uses: zwoo-hq/setup-zwooc@v1
```

A specific version of `zwooc` can be installed:

```yaml
steps:
  - uses: zwoo-hq/setup-zwooc@v1
    with:
      version: <version>
```


## Inputs

The actions supports the following inputs:

| Name      | Type   | Description                 | Default  | Required |
| --------- | ------ | --------------------------- | -------- | -------- |
| `version` | String | zwooc version (or `latest`) | `latest` | false    |


## Develop

> Requires `node >= 20`

Install the dependencies

```bash
$ npm install
```

Build the typescript and package it for distribution

```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  __tests__/main.test.ts
  ✓ gets download url to binary (3 ms)
  ✓ test runs (891 ms)

...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

1. Create a new GitHub release
2. Rebase `v1` branch on `main`

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  version: latest
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:
