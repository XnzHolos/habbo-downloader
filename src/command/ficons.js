const { fetchMany, fetchJson, config } = require('../functions')

async function parse (json) {
  const all = [
    ...json.roomitemtypes.furnitype,
    ...json.wallitemtypes.furnitype,
  ]

  return new Set(
    all.map((item) => {
      return { revision: item.revision, name: `${item.classname.replace('*', '_')}_icon.png` }
    })
  )
}

async function handle () {
  const json = await fetchJson(`http://habbstar.eu/nitro-assets/gamedata/FurnitureData.json`)
  const all = await parse(json)

  await fetchMany([...all].map((item) => {
    return {
      src: `http://habbstar.eu/swf/dcr/hof_furni/icons/${item.revision}/${item.name}`,
      dst: (config.revision)
        ? `dcr/hof_furni/${item.revision}/${item.name}`
        : `dcr/hof_furni/${item.name}`
    }
  }))
}

module.exports = handle
