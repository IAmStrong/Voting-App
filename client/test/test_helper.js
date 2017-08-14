import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const { JSDOM } = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>');
const win = dom.defaultView;

const { window } = dom.window;

global.document = dom;
global.window = win;

Object.keys(window).forEach((key) => {
    if (!(key in global)) global[key] = window[key];
});

chai.use(chaiImmutable);