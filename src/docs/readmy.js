// ====================== Flow config ========================

/*
 Ссылки на ресурсы
https://www.saltycrane.com/flow-type-cheat-sheet/latest/
https://medium.freecodecamp.org/incrementally-add-flow-type-checking-react-261fee015f80
https://medium.freecodecamp.org/why-use-static-types-in-javascript-part-1-8382da1e0adb
https://github.com/the-road-to-learn-react/react-flow-example/blob/greenkeeper/flow-bin-0.96.0/src/App.js
https://habr.com/ru/post/326538/
https://habr.com/ru/company/jugru/blog/439612/
https://habr.com/ru/post/243713/
https://habr.com/ru/post/326304/
https://habr.com/ru/post/326394/
https://github.com/AlexanderShushunov/flow-in-the-big-project/blob/master/README.md
https://www.youtube.com/watch?v=3Z4hWgG8y4o&feature=youtu.be
Климов
https://www.youtube.com/watch?v=9_GwX9O6DFE&list=PLvTBThJr861zvILAjREUakZ6E5l7h7lsZ&index=1
https://github.com/codemix/flow-runtime
https://github.com/facebook/flow/blob/master/website/en/docs/react/types.md
https://medium.com/@tselishev.semen/fairy-tale-flow-world-8adfdda857ab
https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-flow
https://medium.com/@_asci/getting-started-with-nodejs-and-flow-part-2-6b40beb12c1b
https://medium.com/@AugustinLF/making-flow-agree-with-your-types-be43594447c
https://engineering.wework.com/adventures-in-static-typing-react-redux-flow-oh-my-284c5f74adac
https://medium.com/netscape/react-proptypes-to-flow-codemod-9757f5ec5381
https://hackernoon.com/building-a-modern-react-js-app-with-flow-876ff829a5cd
https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
https://www.npmjs.com/package/css-module-flow
https://github.com/skovhus/css-modules-flow-types
https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
https://medium.freecodecamp.org/using-flow-with-babel-c04fdca8d14d
https://codeburst.io/getting-started-with-flow-and-nodejs-b8442d3d2e57
flow-annotation-check
https://devhints.io/flow
https://blog.remix.com/working-with-enums-in-flow-529455138fd6
https://gist.github.com/lambdahands/d19e0da96285b749f0ef
https://medium.com/@fastphrase/integrating-flow-into-a-react-project-fbbc2f130eed
https://medium.com/flow-type/supporting-react-forwardref-and-beyond-f8dd88f35544
https://github.com/reduxjs/redux/tree/master/examples/todos-flow
https://medium.com/flow-type/even-better-support-for-react-in-flow-25b0a3485627
https://github.com/facebook/flow/issues/218
https://github.com/redux-saga/redux-saga/issues/864
https://gist.github.com/retyui/533cc4e13949a70a64aa7959d95da22d
https://www.grzegorowski.com/jest-tests-flow-type/
https://stephenmann.io/post/how-to-setup-flow-with-create-react-app-and-visual-studio-code/
https://medium.com/flow-type/upgrading-flow-codebases-40ef8dd3ccd8


types and interfaces
https://stackoverflow.com/questions/36782896/in-typescript-what-is-the-difference-between-type-and-interface/36783051#36783051



// Про connect и Redux
https://gist.github.com/villesau/38ec8c821e9ba4062e1ee35d841890d4
https://blog.blueberry.io/sagas-reducer-actions-and-selectors-in-react-flow-1bb471035fb2
https://github.com/flow-typed/flow-typed/issues/3137
https://github.com/flow-typed/flow-typed/pull/3012
https://github.com/facebook/flow/issues/4002


// Про HOCs
http://redsunsoft.com/2018/07/proper-flow-typing-for-a-higher-order-component-hoc-injecting-and-using-child-props/

// with Immutable PropTypes
https://medium.com/@williambeard/typing-react-components-with-flow-ad555673d229

// Examples
https://github.com/asci/flow-node-boilerplate Async Await

*/
[options]
// настройки flow если пути абсолютные в проекте
module.name_mapper='common' -> '<PROJECT_ROOT>/src/common'

module.system.node.resolve_dirname=node_modules
module.system.node.resolve_dirname=src


//---> Поддержка типизации стилей через CSS модули в flow
/* <div className={styles.title}>Some text<div>*/

[options]
module.name_mapper='^\(.*\)\.scss$' -> 'CSSModule' // синтаксис стилей сасс
module.system=haste

[libs]
./src/types/global.js  // this can be any path and filename you wish
/*
Добавляем файл с модулем для CSSModule, чтобы flow не ругался
// ./src/types/global.js
declare module CSSModule {
  declare var exports: { [key: string]: string };
  declare export default typeof exports;
}

declare module CSSModule {
  declare module.exports: any;
}
*/
//---<

// ==============================================================

// Мокаем файлы с .css
module.name_mapper='^\(.*\)\.css$' -> 'CSSModule'

// Мокаем файлы с .scss
module.name_mapper='.*\.s?css$' -> '<PROJECT_ROOT>/flow/CSSModule.js.flow'

{
  "presets": ["@babel/preset-flow"],
  "plugins": ["syntax-flow", "tcomb", "transform-flow-strip-types"]
}

{
  "presets": ["@babel/preset-flow"]
}

// Типы для экшенов
import { handleActions, type Reducer } from 'redux-actions';

export type BaseAction =
  $ReadOnly<{ type: string, error?: string }>;

export type ActionWithPayload<P> =
  $ReadOnly<{ ...BaseAction, payload: P }>;

module.name_mapper='&.*\.js' -> 'redux-actions'


// Правильный конфиг для absolute path
module.name_mapper='common' -> '<PROJECT_ROOT>/src/common'

// Рабочий вариант CSSModule
module.name_mapper='.*\(.scss\)' -> 'CSSModule'
module.system=haste

declare module CSSModule {
  declare var exports: { [key: string]: string };
  declare export default typeof exports;
}


// Типы для экшенов
import { handleActions, type Reducer } from 'redux-actions';

export type BaseAction =
  $ReadOnly<{ type: string, error?: string }>;

export type ActionWithPayload<P> =
  $ReadOnly<{ ...BaseAction, payload: P }>;

module.name_mapper='&.*\.js' -> 'redux-actions'
