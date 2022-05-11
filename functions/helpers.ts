/* eslint-disable camelcase */
import type {
  CheckboxMultiSelect,
  PreparedFilter
} from '@/types'

export function getDccName (program: string): string {
  const names: any = {
    '3ds_max': '3ds Max',
    maya: 'Maya',
    blender: 'Blender',
    cinema4d: 'Cinema 4D',
    houdini: 'Houdini',
    modo: 'Modo',
    unity: 'Unity',
    unreal_engine: 'Unreal Engine'
  }
  return names[program]
}

export function getRendererName (renderer: string): string {
  const names: any = {
    redshift: 'Redshift',
    'v-ray': 'V-Ray',
    arnold: 'Arnold',
    mental_ray: 'Mental Ray',
    corona: 'Corona Renderer',
    cycles: 'Blender Cycles',
    unity: 'Unity',
    unreal_engine: 'Unreal Engine'
  }
  return names[renderer]
}

export function getReadableFileSizeString (fileSizeInBytes: number): string {
  let i = -1
  const byteUnits = [' kB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB']
  do {
    fileSizeInBytes = fileSizeInBytes / 1024
    i++
  } while (fileSizeInBytes > 1024)

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i]
}

export function stringCapitalize (string: string): string {
  return string.substr(0, 1).toUpperCase() + string.substr(1)
}

export function getStringedArray (array: string[]): string {
  let string = ''
  array.forEach((item, index) => {
    string += stringCapitalize(item)
    if (index < (array.length - 1)) {
      string += ', '
    }
  })
  return string
}

/**
 * Prepares filters for backend payload and querystring
 * @param formats file formats
 * @param renderers renderers
 * @param polys polygons filter
 * @param hair hair system
 * @param rig rigging
 * @param textures textures type
 * @param uv unwrapping
 * @returns filters object
 */
export function prepareFilters (
  formats: string[],
  renderers: string[],
  polys: string,
  hair: string,
  rig: string,
  textures: string,
  uv: string
): PreparedFilter {
  const original: any = {}
  const simplified: any = {}

  if (formats.length > 0) {
    original.formats = []
    simplified.f = []

    // eslint-disable-next-line array-callback-return
    formats.map((format) => {
      const arr = format.split(':')
      const program = arr[0]
      const program_version = arr[1]
      // Different formats for querystring and payload
      original.formats.push({
        program,
        program_version
      })
      simplified.f.push(format)
    })
  }

  if (renderers.length > 0) {
    original.renderers = []
    simplified.r = []

    // eslint-disable-next-line array-callback-return
    renderers.map((format) => {
      const arr = format.split(':')
      const renderer = arr[0]
      const renderer_version = arr[1] || ''
      // Different formats for querystring and payload
      original.renderers.push({
        renderer,
        renderer_version
      })
      simplified.r.push(format)
    })
  }

  if (polys !== 'all') {
    original.polys = polys
    simplified.ps = polys
  }

  if (hair !== 'all') {
    original.hair_system = hair
    simplified.hs = hair
  }

  if (rig !== 'all') {
    original.rig = rig
    simplified.rig = rig
  }

  if (textures !== 'all') {
    original.textures = textures
    simplified.tx = textures
  }

  if (uv !== 'all') {
    original.uv = uv
    simplified.uv = uv
  }

  return {
    original,
    simplified
  }
}

export const FORMAT_FILTERS: CheckboxMultiSelect[] = [
  {
    text: '3ds Max 2016',
    value: '3ds_max:2016'
  },
  {
    text: '3ds Max 2017',
    value: '3ds_max:2017'
  },
  {
    text: '3ds Max 2018',
    value: '3ds_max:2018'
  },
  {
    text: '3ds Max 2019',
    value: '3ds_max:2019'
  }
  /* {
    text: '3dsMax 2020',
    value: '3dsmax_2020'
  },
  {
    text: '3dsMax 2021',
    value: '3dsmax_2021'
  },
  {
    text: '3dsMax 2022',
    value: '3dsmax_2022'
  },
  {
    text: '3dsMax 2023',
    value: '3dsmax_2023'
  },
  {
    text: 'Blender 2.8',
    value: 'blender_2.8'
  },
  {
    text: 'Blender 2.9',
    value: 'blender_2.9'
  },
  {
    text: 'Blender 3.0',
    value: 'blender_3.0'
  },
  {
    text: 'Cinema4D S22',
    value: 'cinema4d_s22'
  },
  {
    text: 'Cinema4D S23',
    value: 'cinema4d_s23'
  },
  {
    text: 'Cinema4D S24',
    value: 'cinema4d_s24'
  },
  {
    text: 'Cinema4D S25',
    value: 'cinema4d_s25'
  },
  {
    text: 'Houdini 18.5',
    value: 'houdini_18.5'
  },
  {
    text: 'Maya 2016',
    value: 'maya_2016'
  },
  {
    text: 'Maya 2017',
    value: 'maya_2017'
  },
  {
    text: 'Maya 2018',
    value: 'maya_2018'
  },
  {
    text: 'Unity 2019',
    value: 'unity_2019'
  },
  {
    text: 'Unreal Engine 4.22',
    value: 'unreal-engine_4.22'
  } */
]

export const RENDERER_FILTERS: CheckboxMultiSelect[] = [
  {
    text: 'Arnold',
    value: 'arnold'
  },
  {
    text: 'Blender Cycles',
    value: 'cycles'
  },
  {
    text: 'Corona Renderer',
    value: 'corona'
  },
  {
    text: 'Redshift 2.6',
    value: 'redshift:2.6'
  },
  {
    text: 'V-Ray 4',
    value: 'v-ray:4'
  },
  {
    text: 'V-Ray 5',
    value: 'v-ray:5'
  },
  {
    text: 'Unity',
    value: 'unity'
  },
  {
    text: 'Unreal Engine 4',
    value: 'unreal_engine:4'
  }
]
