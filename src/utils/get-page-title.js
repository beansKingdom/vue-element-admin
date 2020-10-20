import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Tepot Platform'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
