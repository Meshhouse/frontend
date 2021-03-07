export function getDccName (program: string): string {
  const names: any = {
    autodesk_3ds_max: '3ds Max',
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
    v_ray: 'V-Ray',
    arnold: 'Arnold',
    mental_ray: 'Mental Ray',
    corona: 'Corona',
    cycles: 'Cycles',
    unity_hdrp: 'Unity HDRP',
    unity_sdrp: 'Unity Standard',
    unreal_standard: 'Unreal Engine Standard'
  }
  return names[renderer]
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
