import { getDownloadUrl } from '../src/urls'
import * as os from 'os'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import * as yaml from 'js-yaml'
import { expect, test } from '@jest/globals'

test('gets download url to binary', async () => {
  const url = await getDownloadUrl('1.0.0')
  expect(
    url.startsWith(
      'https://github.com/zwoo-hq/zwooc/releases/download/v1.0.0/zwooc_'
    )
  ).toBeTruthy()
  expect(url.endsWith('.tar.gz')).toBeTruthy()
})

test('gets download url to latest version', async () => {
  const url = await getDownloadUrl('latest')
  expect(url).toMatch(
    'https://github.com/zwoo-hq/zwooc/releases/latest/download/'
  )
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['RUNNER_TEMP'] = os.tmpdir()
  const config = path.join(__dirname, '..', 'action.yml')
  const action: any = yaml.load(fs.readFileSync(config, 'utf8'))
  process.env['INPUT_VERSION'] = action.inputs.version.default
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'dist', 'index.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  const stdout = cp.execFileSync(np, [ip], options).toString()
  console.log(stdout)
})
