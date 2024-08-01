import prod from './webpack.prod.mjs';
import dev from './webpack.dev.mjs';
/**
 * @type {(env, _argv) => import('webpack').Configuration}
 */
export default (env, _argv) => {
  return env.production ? prod : dev;
};
