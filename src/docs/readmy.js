// ====================== Flow config ========================

/*
 Ссылки на ресурсы
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
https://github.com/codemix/flow-runtime
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
https://hackernoon.com/redux-flow-type-getting-the-maximum-benefit-from-the-fewest-key-strokes-5c006c54ec87
https://blog.callstack.io/type-checking-react-and-redux-thunk-with-flow-part-2-206ce5f6e705
https://medium.freecodecamp.org/using-flow-with-babel-c04fdca8d14d
https://codeburst.io/getting-started-with-flow-and-nodejs-b8442d3d2e57
https://github.com/redux-saga/redux-saga/issues/864
flow-annotation-check
https://devhints.io/flow
https://blog.remix.com/working-with-enums-in-flow-529455138fd6
https://gist.github.com/lambdahands/d19e0da96285b749f0ef
https://medium.com/@fastphrase/integrating-flow-into-a-react-project-fbbc2f130eed

*/
[options]
// настройки flow если пути абсолютные в проекте
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


// @flow

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
