import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faPenToSquare,
  faTrash,
  faCircleCheck as solidCheck
} from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck as regularCheck } from '@fortawesome/free-regular-svg-icons'
import type { App } from 'vue'

const listIcons = [faPenToSquare, faTrash, solidCheck, regularCheck]

export function enableUseIcons(app: App<Element>): App<Element> {
  library.add(...listIcons)

  return app.component('font-awesome-icon', FontAwesomeIcon)
}
