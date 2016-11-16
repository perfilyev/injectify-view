var Backbone = require('backbone');

// fix bug in backbone
Backbone.$ = require('jquery');
window._ = require('underscore');

require('regions-extras')

//register 'view' helper
require('../index');

describe('Injectify view helper', function () {

    it('include view', function () {
        var Layout = require('./fixture/Layout'),
            layout = new Layout();

        layout.render();
        expect(layout.getRegion('test')).toBeDefined();
        expect(layout.getRegion('test').currentView).toBeDefined();
        expect(layout.getRegion('test').currentView.$el.text()).toBe('internal rendered\n');

        expect(layout.$el.html()).toBe('Layout with internal view: <div>internal rendered\n</div>\n');
    });

    it('include view with params', function () {
        var model = new Backbone.Model({
            value: 123,
            inner: new Backbone.Model({
                value: 321
            })
        });
        var Layout = require('./fixture/ParamLayout'),
            layout = new Layout({model: model});

        layout.render();
        expect(layout.$el.html()).toBe('Layout param 123: <div>Internal 321\n</div>\n');
    });

    it('can re-render view', function () {
        var Layout = require('./fixture/Layout'),
            layout = new Layout();

        layout.render();
        layout.render();
        expect(layout.getRegion('test')).toBeDefined();
        expect(layout.getRegion('test').currentView).toBeDefined();
        expect(layout.getRegion('test').currentView.$el.text()).toBe('internal rendered\n');

        expect(layout.$el.html()).toBe('Layout with internal view: <div>internal rendered\n</div>\n');
    });

    it('work inside loop', function () {
        var Layout = require('./fixture/LoopLayout'),
            layout = new Layout();

        layout.render();
        expect(layout.$el.html().indexOf('internal rendered')).not.toBe(-1, layout.$el.html());
    });

    it('work as block helper', function () {
        var Layout = require('./fixture/BlockLayout'),
            layout = new Layout();

        layout.render();
        expect(layout.$el.html().indexOf('internal rendered')).not.toBe(-1, layout.$el.html());
    });

    it('work with #each helper', function () {
        var Layout = require('./fixture/EachLayout'),
            layout = new Layout({values: [1, 2, 3]});

        layout.render();
        expect(layout.$el.html().indexOf('Internal 1')).not.toBe(-1, layout.$el.html());
        expect(layout.$el.html().indexOf('Internal 2')).not.toBe(-1, layout.$el.html());
        expect(layout.$el.html().indexOf('Internal 3')).not.toBe(-1, layout.$el.html());
    });

    it('allow zero as content', function () {
        var Layout = require('./fixture/OutputContentLayout'),
            layout = new Layout({content: 0});

        layout.render();
        expect(layout.$el.html()).toBe('<div>0</div>\n', layout.$el.html());
    });

    it('render pure view without logic', function () {
        var template = require('./fixture/tpl/pureRender.hbs');

        expect(template()).toBe('<div class="test"><span id="pureTest" class="test">!123!\n</span></div>\n');
    });

    it('render pure view as template', function () {
        var template = require('./fixture/tpl/pureSkipRender.hbs');

        expect(template()).toBe('<div class="test"><span id="pureTest" class="test">!123!\n</span></div>\n');
    });

});
