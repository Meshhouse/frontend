/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import type {
  PreparedFilter
} from '@/types'

import type {
  CategoryFilter
} from '@/types/api/categories'

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

export function recursiveFindObject<T> (array: any[], prop: string, nestedProp: string, search: string): T | undefined {
  return array.length
    ? array.find(obj => obj[prop] === search) || recursiveFindObject(array.flatMap(obj => obj[nestedProp] || []), prop, nestedProp, search)
    : undefined
}

/**
 * Prepares filters for backend payload and querystring
 * @param values selected filter values
 * @param filters category filters
 * @returns filters object
 */
export function prepareFilters (values: any, filters: CategoryFilter[]): PreparedFilter {
  const original: any = {}
  const simplified: any = {}

  filters.filter(val => !val.id).map((filter) => {
    const value = values[filter.key]

    if (filter.type !== 'range') {
      if (Array.isArray(value) && value.length > 0 && !filter.value_delimeter) {
        original[filter.key] = value
        simplified[filter.querystring_alias] = value
      } else if (Array.isArray(value) && value.length > 0 && filter.value_delimeter !== null) {
        value.map((val: string) => {
          const arr = val.split(filter.value_delimeter || ':')
          const program = arr[0]
          const program_version = arr[1]

          if (!original[filter.key]) {
            original[filter.key] = []
          }
          if (!simplified[filter.querystring_alias]) {
            simplified[filter.querystring_alias] = []
          }

          original[filter.key].push({
            program,
            program_version
          })
          simplified[filter.querystring_alias].push(val)
        })
      }
    } else {
      const originalMin = filter.values[0].min
      const originalMax = filter.values[0].max

      if (value[0] !== originalMin || value[1] !== originalMax) {
        original[filter.key] = value
        simplified[filter.querystring_alias] = value
      }
    }
  })

  return {
    original,
    simplified
  }
}

/**
 * Prepares custom filters for backend payload and querystring
 * @param values selected filter values
 * @param filters category filters
 * @returns filters object
 */
export function prepareCustomFilters (values: any, filters: CategoryFilter[]): PreparedFilter {
  const original: any = {}
  const simplified: any = {}

  filters.map((filter) => {
    const value = values[filter.key]

    if (filter.type !== 'range') {
      if (Array.isArray(value) && value.length > 0 && !filter.value_delimeter) {
        original[filter.id] = value
        simplified[filter.querystring_alias] = value
      }
    } else {
      const originalMin = filter.values[0].min
      const originalMax = filter.values[0].max

      if (value[0] !== originalMin || value[1] !== originalMax) {
        original[filter.id] = value
        simplified[filter.querystring_alias] = value
      }
    }
  })

  return {
    original,
    simplified
  }
}
