/**
 * Thanks for:
 * https://github.com/fouber/fis-preprocessor-image-set
 * https://github.com/fis-dev/fis-prepackager-css-scale
 */

'use strict';

var SCALE = 0.5;

var NodeImage = require('images');
var ret;
var opt;

function _compile(file) {
	var content = parseCssset(file);
	file.setContent(content);
}

function parseCssset(file) {
	var content = file.getContent();
    var reg = /\/\*[\s\S]+?(?=\*\/|$)|(?:\{|;|\*\/)(\s*)background(?:-image)?\s*:\s*[^;\}]*?url\s*\(([^\)]+)\)(?:[^;\}/]|\/[^*]|\/\*[\s\S]+?(?:\*\/|$))*/ig;
    return content.replace(reg, function (m, blank_space, value) {
        if (value) {
            var md5;
            var normal;
            var retina = value;
            var info = fis.uri(value, file.dirname);
            var imgFile = findFileInArray(info.rest, ret.src, opt);
            if (!imgFile) {
                return m;
            }
            try {
                md5 = generateResizedImg(imgFile, SCALE);
            } catch (e) {
            }
            if (md5) {
                normal = value.replace(/_[^_]+\./, '.').replace(/\.[^.\/\\]+$/, '_' + SCALE + 'x_' + md5 + '$&');
                m = m.replace(value, normal);
                m += ';' + blank_space + 'background-image:-webkit-image-set(url(' + normal + ') 1x, url(' + retina + ') 2x)';
            }
        }
        return m;
    });
}

function generateResizedImg(originImg, scale) {
    var img, imgResized, ext, content;

    img = new NodeImage(originImg.getContent());
    img.resize(Math.ceil(img.width() * scale));

    content = img.encode(originImg.rExt);
    ext = '_' + scale + 'x' + originImg.rExt;
    
    imgResized = fis.file.wrap(originImg.realpathNoExt + ext);
    imgResized.setContent(content);

    ret.pkg[imgResized.subpath] = imgResized;
    ret.src[imgResized.subpath] = imgResized;
    
    return fis.util.md5(content);
}

function findFileInArray(path, lookup) {
    var target;
    fis.util.map(lookup, function (subpath, file) {
        if (file.getUrl(opt.hash, opt.domain) === path) {
            target = file;
            return true;
        }
    });
    return target;
}

module.exports = function (_ret, conf, settings, _opt) {
	ret = _ret;
	opt = _opt;
	fis.util.map(ret.src, function (subpath, file) {
		if (file.isCssLike) {
			_compile(file, ret);
		}
    });
};
