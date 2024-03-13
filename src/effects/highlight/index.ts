import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import go from 'highlight.js/lib/languages/go'
// MARK: vite.config.js
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import less from 'highlight.js/lib/languages/less'
import nginx from 'highlight.js/lib/languages/nginx'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import rust from 'highlight.js/lib/languages/rust'
import scss from 'highlight.js/lib/languages/scss'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import stylus from 'highlight.js/lib/languages/stylus'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

const languages = {
  go,
  css,
  sql,
  php,
  xml,
  yaml,
  json,
  bash,
  less,
  scss,
  rust,
  shell,
  nginx,
  stylus,
  python,
  javascript,
  typescript
}

Object.keys(languages).forEach((name) => hljs.registerLanguage(name, languages[name]))

export default hljs
