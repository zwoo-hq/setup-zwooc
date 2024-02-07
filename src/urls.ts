import { exec } from 'child_process'
import os from 'os'
import { promisify } from 'util'

const doExec = promisify(exec)

// return value in [amd64, arm64, arm]
const mapArch = (arch: string): string => {
  const mappings: Record<string, string> = {
    x64: 'amd64'
  }
  return mappings[arch] || arch
}

// return value in [darwin, linux, windows]
const mapOS = (platform: string): string => {
  const mappings: Record<string, string> = {
    win32: 'windows'
  }
  return mappings[platform] || platform
}

export const getDownloadUrl = async (version: string): Promise<string> => {
  const platform = mapOS(os.platform())
  const arch = mapArch(os.arch())
  const filename = `zwooc_${platform}_${arch}.tar.gz`

  if (version.toLowerCase() === 'latest') {
    return `https://github.com/zwoohq/zwooc/releases/latest/download/${filename}`
  }
  return `https://github.com/zwoohq/zwooc/releases/download/v${version}/${filename}`
}

export const determineInstalledVersion = async (): Promise<string> => {
  const { stdout } = await doExec('zwooc --version')

  const version = stdout.trim()
  if (!version) {
    throw new Error('Could not determine installed zwooc version')
  }

  return version
}
