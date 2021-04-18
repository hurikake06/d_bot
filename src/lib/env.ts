// TOKEN/LINE
// URL/LINE

// URL/BAKERY
// URL/MATCH_MESHI
// URL/MODIFIER_GAME
// URL/SUMMON_FREAK

// SS_ID/DB
// SS_NAME/THREADS

export default function env(key) {
  return PropertiesService.getScriptProperties().getProperty(key)
}