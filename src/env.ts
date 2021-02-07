export default function env(key) {
  return PropertiesService.getScriptProperties().getProperty(key)
}