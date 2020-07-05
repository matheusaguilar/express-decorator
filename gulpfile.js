var del = require('del');

/**
 * delete the old folder with compiled files.
 * @param {*} cb
 */
function defaultTask(cb) {
  del(['lib/']);
  cb();
}

exports.default = defaultTask;
