import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const { JSDOM } = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>');
const win = dom.window;

global.document = win.document;
global.window = win;

const { window } = dom;

Object.keys(window).forEach((key) => {
    if (!(key in global)) global[key] = window[key];
});

chai.use(chaiImmutable);